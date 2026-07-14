<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type CaseStudyDB } from '$lib/supabase';
	import {
		Plus,
		Trash2,
		Edit2,
		Loader2,
		Save,
		X,
		BookOpen,
		ExternalLink,
		ChevronDown,
		ChevronUp,
		ArrowUp,
		ArrowDown,
		Image as ImageIcon,
		Upload
	} from 'lucide-svelte';
	import { uiState } from '$lib/state/ui.svelte';

	// ── State ────────────────────────────────────────────────────────────────
	let studies = $state<CaseStudyDB[]>([]);
	let loading = $state(true);
	let error = $state('');
	let saveLoading = $state(false);
	let uploadingImage = $state(false);
	let reordering = $state(false);

	// Form panel state
	let isEditing = $state(false);
	let editingId = $state<string | null>(null);

	// Form fields
	let title = $state('');
	let slug = $state('');
	let badge = $state('');
	let industry = $state('');
	let filterCategory = $state<'AI & Automation' | 'Development' | 'Marketing'>('AI & Automation');
	let duration = $state('');
	let services = $state<string[]>([]);
	let shortDescription = $state('');
	let metrics = $state<{ value: string; description: string }[]>([{ value: '', description: '' }]);
	let heroImage = $state('');
	let featured = $state(false);
	let published = $state(true);
	let sortOrder = $state(0);
	let content = $state<any[]>([]);

	// Predefined Services matching the categories
	const serviceCategoryOptions = {
		'AI & Automation': [
			'AI Automation & Agents',
			'AI Videos & Creatives',
			'Compliance Videos',
			'GEO — AI Search Ranking'
		],
		'Development': [
			'Web & App Development',
			'Custom Software'
		],
		'Marketing': [
			'Digital Marketing',
			'SEO Services'
		]
	};

	// ── Fetch ────────────────────────────────────────────────────────────────
	onMount(() => fetchStudies());

	async function fetchStudies(quiet = false) {
		if (!quiet) loading = true;
		const { data, error: e } = await supabase
			.from('case_studies')
			.select('*')
			.order('sort_order', { ascending: true });
		if (e) error = e.message;
		else studies = (data as CaseStudyDB[]) || [];
		if (!quiet) loading = false;
	}

	async function moveStudy(index: number, direction: 'up' | 'down') {
		if (reordering) return;
		const targetIndex = direction === 'up' ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= studies.length) return;

		reordering = true;
		error = '';

		// Create a copy and swap the elements
		const updatedStudies = [...studies];
		const temp = updatedStudies[index];
		updatedStudies[index] = updatedStudies[targetIndex];
		updatedStudies[targetIndex] = temp;

		// Optimistically update local UI state
		studies = updatedStudies;

		// Assign sequential sort_order (e.g. 10, 20, 30...)
		const updates = studies.map((study, idx) => ({
			id: study.id,
			sort_order: (idx + 1) * 10
		}));

		// Perform parallel updates to Supabase
		const promises = updates.map((update) =>
			supabase
				.from('case_studies')
				.update({ sort_order: update.sort_order })
				.eq('id', update.id)
		);

		const results = await Promise.all(promises);
		const failedResult = results.find((r) => r.error);

		if (failedResult) {
			error = 'Failed to save new order: ' + failedResult.error.message;
			await fetchStudies(); // Revert local state to DB state
		} else {
			await fetchStudies(true); // Quietly sync state with database
		}
		reordering = false;
	}

	// ── Slug Generator ───────────────────────────────────────────────────────
	function generateSlug() {
		if (!editingId) {
			slug = title
				.toLowerCase()
				.replace(/<\/?[^>]+(>|$)/g, '') // Strip HTML tags
				.replace(/[^a-z0-9\s-]/g, '') // Remove special chars
				.trim()
				.replace(/\s+/g, '-');
		}
	}

	// ── Form helpers ─────────────────────────────────────────────────────────
	function startEdit(cs?: CaseStudyDB) {
		error = '';
		if (cs) {
			isEditing = true;
			editingId = cs.id!;
			title = cs.title;
			slug = cs.slug;
			badge = cs.badge || '';
			industry = cs.industry || '';
			filterCategory = cs.filter_category;
			duration = cs.duration || '';
			services = cs.services || [];
			shortDescription = cs.short_description || '';
			metrics = cs.metrics.length ? cs.metrics.map((m) => ({ ...m })) : [{ value: '', description: '' }];
			heroImage = cs.hero_image || '';
			featured = cs.featured ?? false;
			published = cs.published ?? true;
			sortOrder = cs.sort_order ?? 0;
			content = cs.content ? JSON.parse(JSON.stringify(cs.content)) : [];
		} else {
			isEditing = true;
			editingId = null;
			title = '';
			slug = '';
			badge = '';
			industry = '';
			filterCategory = 'AI & Automation';
			duration = '';
			services = [];
			shortDescription = '';
			metrics = [{ value: '', description: '' }];
			heroImage = '';
			featured = false;
			published = true;
			sortOrder = studies.length ? Math.max(...studies.map(s => s.sort_order || 0)) + 10 : 10;
			content = [{ type: 'under-construction', eta: 'Coming soon' }];
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	// Metrics editors
	function addMetric() {
		metrics = [...metrics, { value: '', description: '' }];
	}
	function removeMetric(i: number) {
		metrics = metrics.filter((_, idx) => idx !== i);
	}

	// Services helpers
	function handleServiceToggle(srvName: string) {
		if (services.includes(srvName)) {
			services = services.filter((s) => s !== srvName);
		} else {
			services = [...services, srvName];
		}
	}

	// Image upload
	async function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const file = target.files[0];
		uploadingImage = true;
		error = '';

		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
		const filePath = `case-studies/${fileName}`;

		const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

		if (uploadError) {
			error = uploadError.message;
			uploadingImage = false;
			return;
		}

		const { data } = supabase.storage.from('images').getPublicUrl(filePath);
		heroImage = data.publicUrl;
		uploadingImage = false;
	}

	// ── Content Blocks Management ────────────────────────────────────────────
	function addBlock(type: string) {
		if (type === 'under-construction') {
			content = [...content, { type: 'under-construction', eta: 'Coming soon' }];
		} else if (type === 'text') {
			content = [...content, { type: 'text', title: '', paragraphs: [''], altBg: false }];
		} else if (type === 'features-grid') {
			content = [
				...content,
				{
					type: 'features-grid',
					title: '',
					intro: '',
					items: [{ title: '', description: '' }],
					footnote: '',
					altBg: false
				}
			];
		} else if (type === 'tags-list') {
			content = [...content, { type: 'tags-list', title: '', intro: '', tags: [''], notice: '', altBg: false }];
		} else if (type === 'key-improvements') {
			content = [...content, { type: 'key-improvements', title: '', items: [''], altBg: false }];
		} else if (type === 'showcase') {
			content = [
				...content,
				{
					type: 'showcase',
					title: '',
					sections: [{ heading: 'Website Screenshots', type: 'web', images: [''] }],
					notice: '',
					altBg: false
				}
			];
		} else if (type === 'testimonial') {
			content = [
				...content,
				{ type: 'testimonial', quote: '', author: '', role: '', pending: false, altBg: false }
			];
		}
	}

	function removeBlock(idx: number) {
		content = content.filter((_, i) => i !== idx);
	}

	function moveBlockUp(idx: number) {
		if (idx === 0) return;
		const temp = content[idx];
		content[idx] = content[idx - 1];
		content[idx - 1] = temp;
		content = [...content];
	}

	function moveBlockDown(idx: number) {
		if (idx === content.length - 1) return;
		const temp = content[idx];
		content[idx] = content[idx + 1];
		content[idx + 1] = temp;
		content = [...content];
	}

	// Block-specific add/remove
	function addParagraph(blockIdx: number) {
		content[blockIdx].paragraphs = [...content[blockIdx].paragraphs, ''];
	}
	function removeParagraph(blockIdx: number, pIdx: number) {
		content[blockIdx].paragraphs = content[blockIdx].paragraphs.filter((_: any, i: number) => i !== pIdx);
	}

	function addGridItem(blockIdx: number) {
		content[blockIdx].items = [...content[blockIdx].items, { title: '', description: '' }];
	}
	function removeGridItem(blockIdx: number, itemIdx: number) {
		content[blockIdx].items = content[blockIdx].items.filter((_: any, i: number) => i !== itemIdx);
	}

	function addTag(blockIdx: number) {
		content[blockIdx].tags = [...content[blockIdx].tags, ''];
	}
	function removeTag(blockIdx: number, tIdx: number) {
		content[blockIdx].tags = content[blockIdx].tags.filter((_: any, i: number) => i !== tIdx);
	}

	function addImprovement(blockIdx: number) {
		content[blockIdx].items = [...content[blockIdx].items, ''];
	}
	function removeImprovement(blockIdx: number, itemIdx: number) {
		content[blockIdx].items = content[blockIdx].items.filter((_: any, i: number) => i !== itemIdx);
	}

	function addShowcaseSection(blockIdx: number) {
		content[blockIdx].sections = [...content[blockIdx].sections, { heading: '', type: 'web', images: [''] }];
	}
	function removeShowcaseSection(blockIdx: number, sIdx: number) {
		content[blockIdx].sections = content[blockIdx].sections.filter((_: any, i: number) => i !== sIdx);
	}

	function addShowcaseImage(blockIdx: number, sIdx: number) {
		content[blockIdx].sections[sIdx].images = [...content[blockIdx].sections[sIdx].images, ''];
	}
	function removeShowcaseImage(blockIdx: number, sIdx: number, imgIdx: number) {
		content[blockIdx].sections[sIdx].images = content[blockIdx].sections[sIdx].images.filter(
			(_: any, i: number) => i !== imgIdx
		);
	}

	async function handleShowcaseImageUpload(blockIdx: number, sIdx: number, imgIdx: number, e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const file = target.files[0];
		error = '';

		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
		const filePath = `case-studies/${fileName}`;

		const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

		if (uploadError) {
			error = uploadError.message;
			return;
		}

		const { data } = supabase.storage.from('images').getPublicUrl(filePath);
		content[blockIdx].sections[sIdx].images[imgIdx] = data.publicUrl;
		content = [...content];
	}

	// ── Save ─────────────────────────────────────────────────────────────────
	async function saveStudy() {
		saveLoading = true;
		error = '';

		const payload = {
			slug,
			title,
			badge: badge || null,
			industry: industry || null,
			filter_category: filterCategory,
			duration: duration || null,
			services,
			short_description: shortDescription || null,
			metrics: metrics.filter((m) => m.value || m.description),
			hero_image: heroImage || null,
			featured,
			published,
			sort_order: sortOrder,
			content
		};

		if (editingId) {
			const { error: e } = await supabase.from('case_studies').update(payload).eq('id', editingId);
			if (e) {
				error = e.message;
				uiState.error('Failed to update case study: ' + error);
			} else {
				uiState.success('Case study updated successfully!');
			}
		} else {
			const { error: e } = await supabase.from('case_studies').insert([payload]);
			if (e) {
				error = e.message;
				uiState.error('Failed to create case study: ' + error);
			} else {
				uiState.success('Case study created successfully!');
			}
		}

		saveLoading = false;
		if (!error) {
			cancelEdit();
			await fetchStudies();
		}
	}

	// ── Delete ───────────────────────────────────────────────────────────────
	async function deleteStudy(id: string) {
		const confirmed = await uiState.confirm({
			title: 'Delete Case Study',
			message: 'Are you sure you want to delete this case study?',
			confirmText: 'Delete',
			cancelText: 'Cancel',
			type: 'danger'
		});
		if (!confirmed) return;

		const { error: e } = await supabase.from('case_studies').delete().eq('id', id);
		if (e) {
			uiState.error('Failed to delete: ' + e.message);
		} else {
			uiState.success('Case study deleted successfully');
			await fetchStudies();
		}
	}
</script>

<div>
	<!-- Header -->
	 
	<div class="admin-header">
		<div>
			<h2>Case Studies</h2>
			<p>Add, edit, and remove case studies stored in the database.</p>
		</div>
		{#if !isEditing}
			<button class="admin-btn" onclick={() => startEdit()}>
				<Plus style="width:16px;height:16px;" /> New Case Study
			</button>
		{/if}
	</div>

	<!-- Error banner -->
	{#if error}
		<div class="admin-alert error" style="margin-bottom: 24px;">{error}</div>
	{/if}

	<!-- ── Edit / Create Form ── -->
	{#if isEditing}
		<div class="admin-card" style="margin-bottom:32px;">
			<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
				<h3 style="font-size:20px;font-weight:600;color:white;">
					{editingId ? 'Edit Case Study' : 'New Case Study'}
				</h3>
				<button
					onclick={cancelEdit}
					style="background:none;border:none;padding:8px;color:var(--color-muted);cursor:pointer;border-radius:8px;transition:all .2s;"
				>
					<X style="width:20px;height:20px;" />
				</button>
			</div>

			<form
				style="display:flex;flex-direction:column;gap:24px;"
				onsubmit={(e) => {
					e.preventDefault();
					saveStudy();
				}}
			>
			
				<!-- Title -->
				<div>
					<label for="cs-title" class="admin-label">Title</label>
					<input
						id="cs-title"
						type="text"
						bind:value={title}
						oninput={generateSlug}
						required
						class="admin-input"
						placeholder="e.g. Dental Clinic <span class='grad'>Management System</span>"
					/>
					<p style="font-size:12px;color:var(--color-muted);margin-top:6px;">
						Supports HTML. Wrap words in <code>&lt;span class="grad"&gt;...&lt;/span&gt;</code> or <code>&lt;span class="grad-cyan"&gt;...&lt;/span&gt;</code> for premium gradient text.
					</p>
				</div>

				<!-- Slug -->
				<div>
					<label for="cs-slug" class="admin-label">Slug</label>
					<input
						id="cs-slug"
						type="text"
						bind:value={slug}
						required
						class="admin-input"
						placeholder="e.g. dental-clinic"
					/>
				</div>

				<!-- Badge & Industry -->
				<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
					<div>
						<label for="cs-badge" class="admin-label">Badge</label>
						<input
							id="cs-badge"
							type="text"
							bind:value={badge}
							class="admin-input"
							placeholder="e.g. Healthcare · AI Automation · Indore"
						/>
					</div>
					<div>
						<label for="cs-industry" class="admin-label">Industry</label>
						<input
							id="cs-industry"
							type="text"
							bind:value={industry}
							class="admin-input"
							placeholder="e.g. Healthcare"
						/>
					</div>
				</div>

				<!-- Filter Category & Duration -->
				<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
					<div>
						<label for="cs-category" class="admin-label">Listing Filter Category</label>
						<select id="cs-category" bind:value={filterCategory} class="admin-input">
							<option value="AI & Automation">AI & Automation</option>
							<option value="Development">Development</option>
							<option value="Marketing">Marketing</option>
						</select>
					</div>
					<div>
						<label for="cs-duration" class="admin-label">Duration</label>
						<input
							id="cs-duration"
							type="text"
							bind:value={duration}
							class="admin-input"
							placeholder="e.g. 3 weeks"
						/>
					</div>
				</div>

				<!-- Subcategory Services Checklist -->
				<div>
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="admin-label">Services / Subcategories</label>
					<div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; display:flex; flex-direction:column; gap:16px;">
						{#each Object.entries(serviceCategoryOptions) as [catName, subServices] (catName)}
							<div>
								<h4 style="font-size: 13px; font-weight:600; text-transform:uppercase; color: var(--color-cyan); margin-bottom: 8px;">
									{catName}
								</h4>
								<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
									{#each subServices as srv (srv)}
										<label style="display:flex; align-items:center; gap:8px; font-size:14px; color:rgba(255,255,255,0.8); cursor:pointer;">
											<input
												type="checkbox"
												checked={services.includes(srv)}
												onchange={() => handleServiceToggle(srv)}
												style="accent-color: #06b6d4;"
											/>
											{srv}
										</label>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Short Description -->
				<div>
					<label for="cs-desc" class="admin-label">Short Description (for Listing Card)</label>
					<textarea
						id="cs-desc"
						bind:value={shortDescription}
						required
						class="admin-input"
						style="height:80px;resize:vertical;"
						placeholder="Brief summary used on the card..."
					></textarea>
				</div>

				<!-- Hero Image URL + Upload -->
				<div>
					<label for="cs-hero" class="admin-label">Hero / Mockup Image</label>
					<div style="display:flex; gap:10px; align-items: center; margin-bottom: 8px;">
						<input
							id="cs-hero"
							type="text"
							bind:value={heroImage}
							class="admin-input"
							placeholder="Image URL or upload a file..."
							style="margin:0;"
						/>
						<input
							type="file"
							id="hero-file-upload"
							accept="image/*"
							style="display:none;"
							onchange={handleImageUpload}
							disabled={uploadingImage}
						/>
						<label
							for="hero-file-upload"
							class="admin-btn"
							style="margin:0; white-space:nowrap; cursor:pointer;"
						>
							{#if uploadingImage}
								<Loader2 style="width:14px;height:14px;animation:spin 1s linear infinite;" /> uploading
							{:else}
								<Upload style="width:14px;height:14px;" /> Upload File
							{/if}
						</label>
					</div>
					{#if heroImage}
						<div style="margin-top: 10px; width: 140px; aspect-ratio: 16/10; border-radius: 8px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
							<img src={heroImage} alt="Hero preview" style="width:100%;height:100%;object-fit:cover;" />
						</div>
					{/if}
				</div>

				<!-- Metrics -->
				 <!-- svelte-ignore a11y_label_has_associated_control -->
				<div>
				
					<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
						<label class="admin-label" style="margin:0;">Key Metrics</label>
						<button
							type="button"
							onclick={addMetric}
							style="background:none;border:1px solid rgba(255,255,255,0.15);padding:4px 12px;border-radius:6px;color:white;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;"
						>
							<Plus style="width:12px;height:12px;" /> Add metric
						</button>
					</div>
					<div style="display:flex;flex-direction:column;gap:10px;">
						{#each metrics as metric, i (metric)}
							<div style="display:grid;grid-template-columns:1fr 2fr auto;gap:10px;align-items:center;">
								<input
									type="text"
									bind:value={metric.value}
									class="admin-input"
									style="margin:0;"
									placeholder="Value (e.g. 25%)"
								/>
								<input
									type="text"
									bind:value={metric.description}
									class="admin-input"
									style="margin:0;"
									placeholder="Description (e.g. Better chair utilisation)"
								/>
								<button
									type="button"
									onclick={() => removeMetric(i)}
									class="admin-icon-btn danger"
									title="Remove metric"
									disabled={metrics.length <= 1}
								>
									<X style="width:14px;height:14px;" />
								</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Visibility and Settings -->
				<div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; align-items: center;">
					<div style="display:flex;align-items:center;gap:10px;">
						<input
							id="cs-featured"
							type="checkbox"
							bind:checked={featured}
							style="width:16px;height:16px;accent-color:#06b6d4;cursor:pointer;"
						/>
						<label for="cs-featured" class="admin-label" style="margin:0;cursor:pointer;">
							Featured Card (Cyan styling)
						</label>
					</div>

					<div style="display:flex;align-items:center;gap:10px;">
						<input
							id="cs-published"
							type="checkbox"
							bind:checked={published}
							style="width:16px;height:16px;accent-color:#06b6d4;cursor:pointer;"
						/>
						<label for="cs-published" class="admin-label" style="margin:0;cursor:pointer;">
							Published / Visible
						</label>
					</div>

					<div>
						<label for="cs-sort" class="admin-label" style="margin-bottom:6px;">Sort Order</label>
						<input
							id="cs-sort"
							type="number"
							bind:value={sortOrder}
							class="admin-input"
							style="margin:0;"
						/>
					</div>
				</div>

				<!-- ── DYNAMIC CONTENT BLOCKS BUILDER ──────────────────────────────── -->
				<div>
					<h3 style="font-size:18px; font-weight:600; color:white; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
						Page Content Sections
					</h3>
					<div style="display:flex; flex-direction:column; gap:20px;">
						{#each content as block, bIdx (block)}
							<div style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:18px; position:relative;">
								
								<!-- Block header toolbar -->
								<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:10px;">
									<div style="display:flex; align-items:center; gap:8px;">
										<span style="font-size:11px; text-transform:uppercase; letter-spacing:0.05em; background:rgba(6,182,212,0.15); color:#06b6d4; padding:2px 8px; border-radius:4px; font-weight:700;">
											{block.type}
										</span>
									</div>
									<div style="display:flex; align-items:center; gap:6px;">
										<button type="button" class="admin-icon-btn" onclick={() => moveBlockUp(bIdx)} disabled={bIdx === 0} title="Move Up">
											<ArrowUp style="width:14px;height:14px;" />
										</button>
										<button type="button" class="admin-icon-btn" onclick={() => moveBlockDown(bIdx)} disabled={bIdx === content.length - 1} title="Move Down">
											<ArrowDown style="width:14px;height:14px;" />
										</button>
										<button type="button" class="admin-icon-btn danger" onclick={() => removeBlock(bIdx)} title="Delete Block">
											<Trash2 style="width:14px;height:14px;" />
										</button>
									</div>
								</div>
<!-- svelte-ignore a11y_label_has_associated_control -->
								<!-- Block content inputs based on type -->
								{#if block.type === 'under-construction'}
									<div>
										<label class="admin-label">ETA / Timeline Info</label>
										<input type="text" bind:value={block.eta} class="admin-input" placeholder="e.g. Coming soon" />
									</div>

								{:else if block.type === 'text'}
									<div style="display:flex; flex-direction:column; gap:12px;">
										<div style="display:grid; grid-template-columns:3fr 1fr; gap:16px; align-items:center;">
											<div>
												<label class="admin-label">Section Title</label>
												<input type="text" bind:value={block.title} class="admin-input" placeholder="e.g. About the Client" style="margin:0;" />
											</div>
											<label style="display:flex; align-items:center; gap:6px; margin-top:24px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.altBg} style="accent-color:#06b6d4;" />
												Alt Background
											</label>
										</div>
										<div>
											<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
												<label class="admin-label" style="margin:0;">Paragraphs</label>
												<button type="button" class="admin-btn" style="padding:2px 8px; font-size:11px;" onclick={() => addParagraph(bIdx)}>
													+ Add Paragraph
												</button>
											</div>
											{#each block.paragraphs || [] as para, pIdx (pIdx)}
												<div style="display:flex; gap:10px; margin-bottom:10px;">
													<textarea bind:value={block.paragraphs[pIdx]} class="admin-input" style="height:60px; resize:vertical; margin:0;" placeholder="Enter paragraph text..."></textarea>
													<button type="button" class="admin-icon-btn danger" disabled={block.paragraphs.length <= 1} onclick={() => removeParagraph(bIdx, pIdx)}>
														<X style="width:14px;height:14px;" />
													</button>
												</div>
											{/each}
										</div>
									</div>

								{:else if block.type === 'features-grid'}
									<div style="display:flex; flex-direction:column; gap:12px;">
										<div style="display:grid; grid-template-columns:3fr 1fr; gap:16px; align-items:center;">
											<div>
												<label class="admin-label">Grid Title</label>
												<input type="text" bind:value={block.title} class="admin-input" placeholder="e.g. What Adymade Built" style="margin:0;" />
											</div>
											<label style="display:flex; align-items:center; gap:6px; margin-top:24px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.altBg} style="accent-color:#06b6d4;" />
												Alt Background
											</label>
										</div>
										<div>
											<label class="admin-label">Intro Text</label>
											<textarea bind:value={block.intro} class="admin-input" style="height:60px; resize:vertical;" placeholder="Intro paragraph before grid..."></textarea>
										</div>
										<div>
											<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
												<label class="admin-label" style="margin:0;">Grid Items (Cards)</label>
												<button type="button" class="admin-btn" style="padding:2px 8px; font-size:11px;" onclick={() => addGridItem(bIdx)}>
													+ Add Card
												</button>
											</div>
											{#each block.items || [] as item, itemIdx (item)}
												<div style="display:flex; gap:10px; background:rgba(0,0,0,0.15); padding:10px; border-radius:8px; margin-bottom:10px; align-items: flex-start;">
													<div style="flex:1; display:flex; flex-direction:column; gap:8px;">
														<input type="text" bind:value={item.title} class="admin-input" style="margin:0;" placeholder="Card Title (e.g. Projects)" />
														<input type="text" bind:value={item.description} class="admin-input" style="margin:0;" placeholder="Card Description..." />
													</div>
													<button type="button" class="admin-icon-btn danger" disabled={block.items.length <= 1} onclick={() => removeGridItem(bIdx, itemIdx)}>
														<X style="width:14px;height:14px;" />
													</button>
												</div>
											{/each}
										</div>
										<div>
											<label class="admin-label">Footnote</label>
											<input type="text" bind:value={block.footnote} class="admin-input" placeholder="e.g. Built with an SEO structure..." />
										</div>
									</div>

								{:else if block.type === 'tags-list'}
									<div style="display:flex; flex-direction:column; gap:12px;">
										<div style="display:grid; grid-template-columns:3fr 1fr; gap:16px; align-items:center;">
											<div>
												<label class="admin-label">Title</label>
												<input type="text" bind:value={block.title} class="admin-input" placeholder="e.g. Custom Admin CMS" style="margin:0;" />
											</div>
											<label style="display:flex; align-items:center; gap:6px; margin-top:24px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.altBg} style="accent-color:#06b6d4;" />
												Alt Background
											</label>
										</div>
										<div>
											<label class="admin-label">Intro Text</label>
											<textarea bind:value={block.intro} class="admin-input" style="height:60px; resize:vertical;" placeholder="Intro paragraph before tags..."></textarea>
										</div>
										<div>
											<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
												<label class="admin-label" style="margin:0;">Tags</label>
												<button type="button" class="admin-btn" style="padding:2px 8px; font-size:11px;" onclick={() => addTag(bIdx)}>
													+ Add Tag
												</button>
											</div>
											<div style="display:flex; flex-wrap:wrap; gap:8px;">
												{#each block.tags || [] as tag, tIdx (tIdx)}
													<div style="display:flex; align-items:center; gap:4px; background:rgba(255,255,255,0.05); padding:4px 8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1);">
														<input type="text" bind:value={block.tags[tIdx]} style="background:none; border:none; color:white; font-size:13px; width:120px; outline:none;" placeholder="Tag name..." />
														<button type="button" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:0 2px;" onclick={() => removeTag(bIdx, tIdx)}>
															<X style="width:12px;height:12px;" />
														</button>
													</div>
												{/each}
											</div>
										</div>
										<div>
											<label class="admin-label">Warning / Notice Text (Optional)</label>
											<input type="text" bind:value={block.notice} class="admin-input" placeholder="e.g. Admin screenshots should blur emails..." />
										</div>
									</div>

								{:else if block.type === 'key-improvements'}
									<div style="display:flex; flex-direction:column; gap:12px;">
										<div style="display:grid; grid-template-columns:3fr 1fr; gap:16px; align-items:center;">
											<div>
												<label class="admin-label">Title</label>
												<input type="text" bind:value={block.title} class="admin-input" placeholder="e.g. Key Improvements" style="margin:0;" />
											</div>
											<label style="display:flex; align-items:center; gap:6px; margin-top:24px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.altBg} style="accent-color:#06b6d4;" />
												Alt Background
											</label>
										</div>
										<div>
											<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
												<label class="admin-label" style="margin:0;">Checklist Items</label>
												<button type="button" class="admin-btn" style="padding:2px 8px; font-size:11px;" onclick={() => addImprovement(bIdx)}>
													+ Add Item
												</button>
											</div>
											{#each block.items || [] as item, itemIdx (itemIdx)}
												<div style="display:flex; gap:10px; margin-bottom:10px; align-items:center;">
													<input type="text" bind:value={block.items[itemIdx]} class="admin-input" style="margin:0;" placeholder="e.g. Modern and professional website experience" />
													<button type="button" class="admin-icon-btn danger" disabled={block.items.length <= 1} onclick={() => removeImprovement(bIdx, itemIdx)}>
														<X style="width:14px;height:14px;" />
													</button>
												</div>
											{/each}
										</div>
									</div>

								{:else if block.type === 'showcase'}
									<div style="display:flex; flex-direction:column; gap:12px;">
										<div style="display:grid; grid-template-columns:3fr 1fr; gap:16px; align-items:center;">
											<div>
												<label class="admin-label">Showcase Block Title</label>
												<input type="text" bind:value={block.title} class="admin-input" placeholder="e.g. Visual Showcase" style="margin:0;" />
											</div>
											<label style="display:flex; align-items:center; gap:6px; margin-top:24px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.altBg} style="accent-color:#06b6d4;" />
												Alt Background
											</label>
										</div>

										<div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:6px; margin-top:10px;">
											<label class="admin-label" style="margin:0;">Showcase Categories (e.g. Website vs Admin)</label>
											<button type="button" class="admin-btn" style="padding:2px 8px; font-size:11px;" onclick={() => addShowcaseSection(bIdx)}>
												+ Add Category Section
											</button>
										</div>

										{#each block.sections || [] as section, sIdx (section)}
											<div style="background:rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.05); padding:14px; border-radius:8px; display:flex; flex-direction:column; gap:12px; margin-bottom:12px;">
												<div style="display:grid; grid-template-columns: 2fr 1fr auto; gap:10px; align-items:center;">
													<div>
														<label class="admin-label" style="font-size:12px;">Heading Label</label>
														<input type="text" bind:value={section.heading} class="admin-input" style="margin:0;" placeholder="e.g. Website Screenshots" />
													</div>
													<div>
														<label class="admin-label" style="font-size:12px;">Type</label>
														<select bind:value={section.type} class="admin-input" style="margin:0;">
															<option value="web">Website Mockups (Internet Globe Icon)</option>
															<option value="admin">Admin Panels (Document Icon)</option>
														</select>
													</div>
													<button type="button" class="admin-icon-btn danger" style="margin-top:22px;" disabled={block.sections.length <= 1} onclick={() => removeShowcaseSection(bIdx, sIdx)}>
														<Trash2 style="width:14px;height:14px;" />
													</button>
												</div>

												<div>
													<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
														<label class="admin-label" style="font-size:11px; margin:0;">Screenshots (Labels or file paths/URLs)</label>
														<button type="button" class="admin-btn" style="padding:2px 6px; font-size:10px;" onclick={() => addShowcaseImage(bIdx, sIdx)}>
															+ Add Screenshot
														</button>
													</div>
													
													{#each section.images || [] as imagePath, imgIdx (imgIdx)}
														<div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
															<input
																type="text"
																bind:value={section.images[imgIdx]}
																class="admin-input"
																style="margin:0; font-size:12px;"
																placeholder="Enter a descriptive label (e.g. Homepage) or file URL..."
															/>
															<input
																type="file"
																id="file-upload-{bIdx}-{sIdx}-{imgIdx}"
																accept="image/*"
																style="display:none;"
																onchange={(e) => handleShowcaseImageUpload(bIdx, sIdx, imgIdx, e)}
															/>
															<label
																for="file-upload-{bIdx}-{sIdx}-{imgIdx}"
																class="admin-btn"
																style="padding:6px 12px; margin:0; font-size:11px; white-space:nowrap; cursor:pointer;"
															>
																Upload
															</label>
															<button type="button" class="admin-icon-btn danger" disabled={section.images.length <= 1} onclick={() => removeShowcaseImage(bIdx, sIdx, imgIdx)}>
																<X style="width:12px;height:12px;" />
															</button>
														</div>
													{/each}
												</div>
											</div>
										{/each}
										<div>
											<label class="admin-label">Warning / Blur Notice</label>
											<input type="text" bind:value={block.notice} class="admin-input" placeholder="e.g. Blur sensitive data before publishing." />
										</div>
									</div>

								{:else if block.type === 'testimonial'}
									<div style="display:flex; flex-direction:column; gap:12px;">
										<div style="display:grid; grid-template-columns:3fr 1fr; gap:16px; align-items:center;">
											<label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.pending} style="accent-color:#06b6d4;" />
												Show 'Pending client approval' badge
											</label>
											<label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;">
												<input type="checkbox" bind:checked={block.altBg} style="accent-color:#06b6d4;" />
												Alt Background
											</label>
										</div>
										<div>
											<label class="admin-label">Client Quote</label>
											<textarea bind:value={block.quote} required class="admin-input" style="height:70px; resize:vertical;" placeholder="Enter client's words..."></textarea>
										</div>
										<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
											<div>
												<label class="admin-label">Author Name</label>
												<input type="text" bind:value={block.author} required class="admin-input" placeholder="e.g. RGS Team" style="margin:0;" />
											</div>
											<div>
												<label class="admin-label">Author Role / Company details</label>
												<input type="text" bind:value={block.role} class="admin-input" placeholder="e.g. CEO or Tamimi Group subsidiary" style="margin:0;" />
											</div>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>

					<!-- Block inserters panel -->
					<div style="margin-top:20px; display:flex; flex-direction:column; gap:10px; background:rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.15); border-radius:12px; padding:18px; align-items:center;">
						<span style="font-size:13px; color:var(--color-muted); font-weight:500;">Add Page Content Blocks</span>
						<div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('text')}>
								+ Text Section
							</button>
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('features-grid')}>
								+ Features Grid
							</button>
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('tags-list')}>
								+ Tags List
							</button>
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('key-improvements')}>
								+ Improvements
							</button>
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('showcase')}>
								+ Showcase
							</button>
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('testimonial')}>
								+ Testimonial
							</button>
							<button type="button" class="admin-btn" style="padding:6px 12px; font-size:12px;" onclick={() => addBlock('under-construction')}>
								+ Under Construction
							</button>
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div
					style="display:flex;justify-content:flex-end;gap:12px;padding-top:16px;border-top:1px solid rgba(54,40,112,0.4);"
				>
					<button
						type="button"
						onclick={cancelEdit}
						style="background:none;border:none;padding:8px 16px;color:var(--color-muted);font-size:14px;font-weight:500;cursor:pointer;"
					>
						Cancel
					</button>
					<button type="submit" disabled={saveLoading} class="admin-btn">
						{#if saveLoading}
							<Loader2 style="width:16px;height:16px;animation:spin 1s linear infinite;" /> Saving…
						{:else}
							<Save style="width:16px;height:16px;" /> Save Case Study
						{/if}
					</button>
				</div>
			</form>
		</div>
	{/if}

	<!-- ── List ── -->
	{#if loading}
		<div style="display:flex;justify-content:center;padding:48px 0;">
			<Loader2 style="width:32px;height:32px;color:var(--color-muted);animation:spin 1s linear infinite;" />
		</div>
	{:else if studies.length === 0 && !isEditing}
		<div class="admin-card" style="text-align:center;padding:48px 24px;">
			<div
				style="margin:0 auto 16px;width:48px;height:48px;background:var(--color-midnight);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;"
			>
				<BookOpen style="width:24px;height:24px;color:var(--color-muted);" />
			</div>
			<h3 style="font-size:18px;font-weight:500;color:white;">No case studies yet</h3>
			<p style="margin-top:8px;font-size:14px;color:var(--color-muted);">
				Get started by adding your first case study.
			</p>
			<button class="admin-btn" style="margin-top:24px;" onclick={() => startEdit()}>
				<Plus style="width:16px;height:16px;" /> Add Case Study
			</button>
		</div>
	{:else if !isEditing}
		<div style="display:flex;flex-direction:column;gap:16px;">
			{#each studies as cs, idx (cs.id)}
				<div class="admin-card cs-row">
					<!-- Left info -->
					<div style="flex:1;min-width:0;">
						<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
							<span class="cs-badge-pill">{cs.badge || cs.filter_category}</span>
							{#if cs.featured}
								<span class="cs-featured-pill">Featured</span>
							{/if}
							{#if !cs.published}
								<span style="font-size: 11px; padding: 3px 10px; border-radius:999px; background: rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); color:#ef4444; font-weight:600; text-transform:uppercase; letter-spacing:0.04em;">Draft</span>
							{/if}
						</div>
						<h3 style="font-size:17px;font-weight:600;color:white;margin-bottom:8px;">{@html cs.title}</h3>
						<p style="font-size:13px; color:var(--color-muted); margin-bottom: 12px; line-height:1.5;">{cs.short_description}</p>
						<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;">
							{#each cs.metrics || [] as m (m)}
								<div style="font-size:13px;">
									<span style="font-weight:700;color:white;">{m.value}</span>
									<span style="color:var(--color-muted);margin-left:4px;">{m.description}</span>
								</div>
							{/each}
						</div>
						<a
							href="/case-studies/{cs.slug}"
							target="_blank"
							rel="noopener"
							style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--color-muted);text-decoration:none;transition:color .2s;"
						>
							/case-studies/{cs.slug} <ExternalLink style="width:11px;height:11px;" />
						</a>
					</div>

					<!-- Actions -->
					<div style="display:flex;gap:8px;align-items:flex-start;flex-shrink:0;">
						<button
							class="admin-icon-btn"
							title="Move Up"
							onclick={() => moveStudy(idx, 'up')}
							disabled={idx === 0 || reordering}
						>
							<ArrowUp style="width:16px;height:16px;" />
						</button>
						<button
							class="admin-icon-btn"
							title="Move Down"
							onclick={() => moveStudy(idx, 'down')}
							disabled={idx === studies.length - 1 || reordering}
						>
							<ArrowDown style="width:16px;height:16px;" />
						</button>
						<button class="admin-icon-btn" title="Edit" onclick={() => startEdit(cs)}>
							<Edit2 style="width:16px;height:16px;" />
						</button>
						<button class="admin-icon-btn danger" title="Delete" onclick={() => deleteStudy(cs.id!)}>
							<Trash2 style="width:16px;height:16px;" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.cs-row {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.cs-row :global(.admin-icon-btn:disabled) {
		opacity: 0.3;
		cursor: not-allowed;
		pointer-events: none;
	}

	.cs-badge-pill {
		display: inline-block;
		padding: 3px 10px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		background: rgba(139, 92, 246, 0.1);
		border: 1px solid rgba(139, 92, 246, 0.2);
		color: #a78bfa;
	}

	.cs-featured-pill {
		display: inline-block;
		padding: 3px 10px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		background: rgba(6, 182, 212, 0.1);
		border: 1px solid rgba(6, 182, 212, 0.2);
		color: #06b6d4;
	}
</style>
