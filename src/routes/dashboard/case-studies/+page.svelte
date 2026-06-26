<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type CaseStudyDB } from '$lib/supabase';
	import { Plus, Trash2, Edit2, Loader2, Save, X, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-svelte';

	// ── State ────────────────────────────────────────────────────────────────
	let studies = $state<CaseStudyDB[]>([]);
	let loading = $state(true);
	let error = $state('');
	let saveLoading = $state(false);

	// Form panel state
	let isEditing = $state(false);
	let editingId = $state<string | null>(null);

	// Form fields
	let badge = $state('');
	let title = $state('');
	let href = $state('');
	let featured = $state(false);
	let badgeStyle = $state('');
	let linkStyle = $state('');
	let cardStyle = $state('');
	let metrics = $state<{ value: string; description: string }[]>([
		{ value: '', description: '' }
	]);

	// Advanced section toggle
	let showAdvanced = $state(false);

	// ── Fetch ────────────────────────────────────────────────────────────────
	onMount(() => fetchStudies());

	async function fetchStudies() {
		loading = true;
		const { data, error: e } = await supabase
			.from('case_studies')
			.select('*')
			.order('created_at', { ascending: false });
		if (e) error = e.message;
		else studies = (data as CaseStudyDB[]) || [];
		loading = false;
	}

	// ── Form helpers ─────────────────────────────────────────────────────────
	function startEdit(cs?: CaseStudyDB) {
		error = '';
		showAdvanced = false;
		if (cs) {
			isEditing = true;
			editingId = cs.id!;
			badge = cs.badge;
			title = cs.title;
			href = cs.href;
			featured = cs.featured ?? false;
			badgeStyle = cs.badge_style ?? '';
			linkStyle = cs.link_style ?? '';
			cardStyle = cs.card_style ?? '';
			metrics = cs.metrics.length ? cs.metrics.map(m => ({ ...m })) : [{ value: '', description: '' }];
		} else {
			isEditing = true;
			editingId = null;
			badge = '';
			title = '';
			href = '';
			featured = false;
			badgeStyle = '';
			linkStyle = '';
			cardStyle = '';
			metrics = [{ value: '', description: '' }];
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	function addMetric() {
		metrics = [...metrics, { value: '', description: '' }];
	}

	function removeMetric(i: number) {
		metrics = metrics.filter((_, idx) => idx !== i);
	}

	// ── Save ─────────────────────────────────────────────────────────────────
	async function saveStudy() {
		saveLoading = true;
		error = '';

		const payload = {
			badge,
			title,
			href,
			featured,
			metrics: metrics.filter(m => m.value || m.description),
			badge_style: badgeStyle || null,
			link_style: linkStyle || null,
			card_style: cardStyle || null
		};

		if (editingId) {
			const { error: e } = await supabase.from('case_studies').update(payload).eq('id', editingId);
			if (e) error = e.message;
		} else {
			const { error: e } = await supabase.from('case_studies').insert([payload]);
			if (e) error = e.message;
		}

		saveLoading = false;
		if (!error) { cancelEdit(); await fetchStudies(); }
	}

	// ── Delete ───────────────────────────────────────────────────────────────
	async function deleteStudy(id: string) {
		if (!confirm('Delete this case study?')) return;
		const { error: e } = await supabase.from('case_studies').delete().eq('id', id);
		if (e) alert('Failed to delete: ' + e.message);
		else await fetchStudies();
	}
</script>

<div>
	<!-- Header -->
	<div class="admin-header">
		<div>
			<h2>Case Studies</h2>
			<p>Add, edit, and remove case studies shown on the homepage.</p>
		</div>
		{#if !isEditing}
			<button class="admin-btn" onclick={() => startEdit()}>
				<Plus style="width:16px;height:16px;" /> New Case Study
			</button>
		{/if}
	</div>

	<!-- Error banner -->
	{#if error}
		<div class="admin-alert error">{error}</div>
	{/if}

	<!-- ── Edit / Create Form ── -->
	{#if isEditing}
		<div class="admin-card" style="margin-bottom:32px;">
			<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
				<h3 style="font-size:20px;font-weight:600;color:white;">
					{editingId ? 'Edit Case Study' : 'New Case Study'}
				</h3>
				<button onclick={cancelEdit} style="background:none;border:none;padding:8px;color:var(--color-muted);cursor:pointer;border-radius:8px;transition:all .2s;">
					<X style="width:20px;height:20px;" />
				</button>
			</div>

			<form style="display:flex;flex-direction:column;gap:24px;" onsubmit={(e) => { e.preventDefault(); saveStudy(); }}>

				<!-- Badge -->
				<div>
					<label for="cs-badge" class="admin-label">Badge / Category Label</label>
					<input id="cs-badge" type="text" bind:value={badge} required class="admin-input" placeholder="e.g. Healthcare · AI Automation · Indore" />
				</div>

				<!-- Title -->
				<div>
					<label for="cs-title" class="admin-label">Title</label>
					<input id="cs-title" type="text" bind:value={title} required class="admin-input" placeholder="e.g. Dental Clinic Management System" />
				</div>

				<!-- Href -->
				<div>
					<label for="cs-href" class="admin-label">Page URL (href)</label>
					<input id="cs-href" type="text" bind:value={href} required class="admin-input" placeholder="/case-studies/dental-clinic" />
					<p style="font-size:12px;color:var(--color-muted);margin-top:6px;">
						This is the path the card links to. Make sure a SvelteKit route exists for it.
					</p>
				</div>

				<!-- Featured toggle -->
				<div style="display:flex;align-items:center;gap:12px;">
					<input id="cs-featured" type="checkbox" bind:checked={featured} style="width:16px;height:16px;accent-color:#06b6d4;cursor:pointer;" />
					<label for="cs-featured" class="admin-label" style="margin:0;cursor:pointer;">
						Featured (applies cyan accent styling)
					</label>
				</div>

				<!-- Metrics -->
				<div>
					<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
						<label class="admin-label" style="margin:0;">Metrics</label>
						<button type="button" onclick={addMetric} style="background:none;border:1px solid rgba(255,255,255,0.15);padding:4px 12px;border-radius:6px;color:white;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;">
							<Plus style="width:12px;height:12px;" /> Add metric
						</button>
					</div>
					<div style="display:flex;flex-direction:column;gap:10px;">
						{#each metrics as metric, i}
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
									placeholder="Description (e.g. Chair utilisation)"
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

				<!-- Advanced styling (collapsible) -->
				<div style="border:1px solid rgba(255,255,255,0.07);border-radius:10px;overflow:hidden;">
					<button
						type="button"
						onclick={() => showAdvanced = !showAdvanced}
						style="width:100%;background:rgba(255,255,255,0.03);border:none;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;color:white;font-size:14px;cursor:pointer;"
					>
						<span>Advanced Styling Overrides</span>
						{#if showAdvanced}
							<ChevronUp style="width:16px;height:16px;color:var(--color-muted);" />
						{:else}
							<ChevronDown style="width:16px;height:16px;color:var(--color-muted);" />
						{/if}
					</button>
					{#if showAdvanced}
						<div style="padding:18px;display:flex;flex-direction:column;gap:18px;border-top:1px solid rgba(255,255,255,0.07);">
							<div>
								<label for="cs-badge-style" class="admin-label">Badge inline style</label>
								<input id="cs-badge-style" type="text" bind:value={badgeStyle} class="admin-input" placeholder="background:rgba(6,182,212,0.1);color:#06b6d4" />
							</div>
							<div>
								<label for="cs-link-style" class="admin-label">Link inline style</label>
								<input id="cs-link-style" type="text" bind:value={linkStyle} class="admin-input" placeholder="color:#06b6d4" />
							</div>
							<div>
								<label for="cs-card-style" class="admin-label">Card inline style</label>
								<input id="cs-card-style" type="text" bind:value={cardStyle} class="admin-input" placeholder="border-color:rgba(90,20,240,0.3)" />
							</div>
						</div>
					{/if}
				</div>

				<!-- Actions -->
				<div style="display:flex;justify-content:flex-end;gap:12px;padding-top:16px;border-top:1px solid rgba(54,40,112,0.4);">
					<button type="button" onclick={cancelEdit} style="background:none;border:none;padding:8px 16px;color:var(--color-muted);font-size:14px;font-weight:500;cursor:pointer;">
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
			<div style="margin:0 auto 16px;width:48px;height:48px;background:var(--color-midnight);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;">
				<BookOpen style="width:24px;height:24px;color:var(--color-muted);" />
			</div>
			<h3 style="font-size:18px;font-weight:500;color:white;">No case studies yet</h3>
			<p style="margin-top:8px;font-size:14px;color:var(--color-muted);">Get started by adding your first case study.</p>
			<button class="admin-btn" style="margin-top:24px;" onclick={() => startEdit()}>
				<Plus style="width:16px;height:16px;" /> Add Case Study
			</button>
		</div>

	{:else if !isEditing}
		<div style="display:flex;flex-direction:column;gap:16px;">
			{#each studies as cs (cs.id)}
				<div class="admin-card cs-row">
					<!-- Left info -->
					<div style="flex:1;min-width:0;">
						<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
							<span class="cs-badge-pill">{cs.badge}</span>
							{#if cs.featured}
								<span class="cs-featured-pill">Featured</span>
							{/if}
						</div>
						<h3 style="font-size:17px;font-weight:600;color:white;margin-bottom:8px;">{cs.title}</h3>
						<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;">
							{#each cs.metrics as m}
								<div style="font-size:13px;">
									<span style="font-weight:700;color:white;">{m.value}</span>
									<span style="color:var(--color-muted);margin-left:4px;">{m.description}</span>
								</div>
							{/each}
						</div>
						<a
							href={cs.href}
							target="_blank"
							rel="noopener"
							style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--color-muted);text-decoration:none;transition:color .2s;"
						>
							{cs.href} <ExternalLink style="width:11px;height:11px;" />
						</a>
					</div>

					<!-- Actions -->
					<div style="display:flex;gap:8px;align-items:flex-start;flex-shrink:0;">
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
