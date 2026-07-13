<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type Blog } from '$lib/supabase';
	import { Plus, Trash2, Edit2, Loader2, Save, X, FileText, Upload, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-svelte';

	let blogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');

	let isEditing = $state(false);
	let editingId = $state<string | null>(null);

	// Form fields
	let title = $state('');
	let slug = $state('');
	let category = $state('');
	let excerpt = $state('');
	let imageUrl = $state('');
	let altText = $state('');
	let readTime = $state('');
	let featured = $state(false);
	let authorName = $state('');
	let contentBlocks = $state<any[]>([]);

	let seoTitle = $state('');
	let seoDescription = $state('');
	let seoKeywords = $state('');

	let saveLoading = $state(false);
	let uploadingImage = $state(false);

	onMount(async () => {
		await fetchBlogs();
	});

	async function fetchBlogs() {
		loading = true;
		error = '';
		const { data, error: fetchError } = await supabase
			.from('blogs')
			.select('*')
			.order('created_at', { ascending: false });

		if (fetchError) {
			error = fetchError.message;
		} else {
			blogs = data || [];
		}
		loading = false;
	}

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

	function addBlock(type: string) {
		if (type === 'heading') {
			contentBlocks = [...contentBlocks, { type: 'heading', level: 2, text: '' }];
		} else if (type === 'paragraph') {
			contentBlocks = [...contentBlocks, { type: 'paragraph', text: '' }];
		} else if (type === 'image') {
			contentBlocks = [...contentBlocks, { type: 'image', url: '', caption: '' }];
		} else if (type === 'newline') {
			contentBlocks = [...contentBlocks, { type: 'newline' }];
		}
	}

	function removeBlock(idx: number) {
		contentBlocks = contentBlocks.filter((_, i) => i !== idx);
	}

	function moveBlockUp(idx: number) {
		if (idx === 0) return;
		const temp = contentBlocks[idx];
		contentBlocks[idx] = contentBlocks[idx - 1];
		contentBlocks[idx - 1] = temp;
		contentBlocks = [...contentBlocks];
	}

	function moveBlockDown(idx: number) {
		if (idx === contentBlocks.length - 1) return;
		const temp = contentBlocks[idx];
		contentBlocks[idx] = contentBlocks[idx + 1];
		contentBlocks[idx + 1] = temp;
		contentBlocks = [...contentBlocks];
	}

	async function handleBlockImageUpload(idx: number, e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const file = target.files[0];
		error = '';

		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
		const filePath = `blogs/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('images')
			.upload(filePath, file);

		if (uploadError) {
			error = uploadError.message;
			return;
		}

		const { data } = supabase.storage.from('images').getPublicUrl(filePath);
		contentBlocks[idx].url = data.publicUrl;
		contentBlocks = [...contentBlocks];
	}

	function startEdit(blog?: Blog) {
		error = '';
		if (blog) {
			isEditing = true;
			editingId = blog.id!;
			title = blog.title;
			slug = blog.slug;
			category = blog.category;
			excerpt = blog.excerpt;
			imageUrl = blog.image_url || '';
			altText = blog.alt_text || '';
			seoTitle = blog.seo_title || '';
			seoDescription = blog.seo_description || '';
			seoKeywords = blog.seo_keywords || '';
			readTime = blog.read_time || '';
			featured = blog.featured ?? false;
			authorName = blog.author_name || 'Adymade Team';
			
			// Safe dynamic parsing of content blocks
			if (blog.content && Array.isArray(blog.content)) {
				contentBlocks = blog.content.map(b => {
					if (typeof b === 'string') {
						return { type: 'paragraph', text: b };
					}
					return { ...b };
				});
			} else {
				contentBlocks = [{ type: 'paragraph', text: '' }];
			}
		} else {
			isEditing = true;
			editingId = null;
			title = '';
			slug = '';
			category = 'AI Automation';
			excerpt = '';
			imageUrl = '';
			altText = '';
			seoTitle = '';
			seoDescription = '';
			seoKeywords = '';
			readTime = '5 min read';
			featured = false;
			authorName = 'Adymade Team';
			contentBlocks = [{ type: 'paragraph', text: '' }];
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	async function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const file = target.files[0];
		uploadingImage = true;
		error = '';

		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
		const filePath = `blogs/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('images')
			.upload(filePath, file);

		if (uploadError) {
			error = uploadError.message;
			uploadingImage = false;
			return;
		}

		const { data } = supabase.storage.from('images').getPublicUrl(filePath);
		imageUrl = data.publicUrl;
		uploadingImage = false;
	}

	async function saveBlog() {
		saveLoading = true;
		error = '';

		// Filter out invalid blocks
		const validBlocks = contentBlocks.filter(b => 
			b.type === 'newline' || 
			(b.type === 'paragraph' && b.text) || 
			(b.type === 'heading' && b.text) || 
			(b.type === 'image' && b.url)
		);

		const blogData = {
			title,
			slug: slug.toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
			category,
			excerpt,
			image_url: imageUrl || null,
			alt_text: altText || null,
			seo_title: seoTitle || null,
			seo_description: seoDescription || null,
			seo_keywords: seoKeywords || null,
			read_time: readTime || null,
			featured,
			author_name: authorName || 'Adymade Team',
			content: validBlocks,
			updated_at: new Date().toISOString()
		};

		if (editingId) {
			const { error: updateError } = await supabase
				.from('blogs')
				.update(blogData)
				.eq('id', editingId);
			if (updateError) error = updateError.message;
		} else {
			const { error: insertError } = await supabase
				.from('blogs')
				.insert([blogData]);
			if (insertError) error = insertError.message;
		}

		saveLoading = false;
		if (!error) {
			cancelEdit();
			await fetchBlogs();
		}
	}

	async function deleteBlog(id: string) {
		if (!confirm('Are you sure you want to delete this blog post?')) return;
		
		const { error: deleteError } = await supabase
			.from('blogs')
			.delete()
			.eq('id', id);

		if (deleteError) {
			alert('Failed to delete: ' + deleteError.message);
		} else {
			await fetchBlogs();
		}
	}
</script>

<div>
	<div class="admin-header">
		<div>
			<h2>Blogs</h2>
			<p>Manage your blog posts and articles.</p>
		</div>
		{#if !isEditing}
			<button
				onclick={() => startEdit()}
				class="admin-btn"
			>
				<Plus style="width: 16px; height: 16px;" />
				New Post
			</button>
		{/if}
	</div>

	{#if error}
		<div class="admin-alert error" style="margin-bottom: 24px;">
			{error}
		</div>
	{/if}

	{#if isEditing}
		<div class="admin-card" style="margin-bottom: 32px; max-width: 800px;">
			<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
				<h3 style="font-size: 20px; font-weight: 600; color: white;">{editingId ? 'Edit Post' : 'Create New Post'}</h3>
				<button onclick={cancelEdit} style="background: none; border: none; padding: 8px; color: var(--color-muted); cursor: pointer; border-radius: 8px; transition: all 0.2s;">
					<X style="width: 20px; height: 20px;" />
				</button>
			</div>

			<form style="display: flex; flex-direction: column; gap: 24px;" onsubmit={(e) => { e.preventDefault(); saveBlog(); }}>
				<div>
					<label for="title" class="admin-label">Title</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						oninput={generateSlug}
						required
						class="admin-input"
						placeholder="Post Title"
					/>
				</div>

				<div>
					<label for="slug" class="admin-label">Slug</label>
					<input
						type="text"
						id="slug"
						bind:value={slug}
						required
						class="admin-input"
						placeholder="e.g. post-title-slug"
					/>
				</div>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
					<div>
						<label for="category" class="admin-label">Category</label>
						<select id="category" bind:value={category} class="admin-input" style="background: var(--color-abyss); color: white;">
							<option value="AI Automation">AI Automation</option>
							<option value="AI Video Production">AI Video Production</option>
							<option value="Web Development">Web Development</option>
							<option value="SEO & GEO">SEO & GEO</option>
							<option value="Software Development">Software Development</option>
							<option value="Digital Marketing">Digital Marketing</option>
						</select>
					</div>

					<div>
						<label for="readTime" class="admin-label">Read Time</label>
						<input
							type="text"
							id="readTime"
							bind:value={readTime}
							required
							class="admin-input"
							placeholder="e.g. 5 min read"
						/>
					</div>
				</div>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center;">
					<div>
						<label for="authorName" class="admin-label">Author Name</label>
						<input
							type="text"
							id="authorName"
							bind:value={authorName}
							required
							class="admin-input"
							placeholder="e.g. Adymade Team"
						/>
					</div>

					<div style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding-top: 24px;">
						<input
							id="featured"
							type="checkbox"
							bind:checked={featured}
							style="width: 18px; height: 18px; accent-color: var(--color-cyan);"
						/>
						<label for="featured" class="admin-label" style="margin: 0; cursor: pointer;">
							Featured Post (Highlighted on top)
						</label>
					</div>
				</div>

				<div>
					<label for="imageUrl" class="admin-label">Featured Image</label>
					<div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
						<input
							type="text"
							id="imageUrl"
							bind:value={imageUrl}
							class="admin-input"
							placeholder="Image URL or upload a file..."
							style="margin: 0;"
						/>
						<input
							type="file"
							id="blog-file-upload"
							accept="image/*"
							style="display: none;"
							onchange={handleImageUpload}
							disabled={uploadingImage}
						/>
						<label
							for="blog-file-upload"
							class="admin-btn"
							style="margin: 0; white-space: nowrap; cursor: pointer;"
						>
							{#if uploadingImage}
								<Loader2 style="width: 14px; height: 14px; animation: spin 1s linear infinite;" /> uploading
							{:else}
								<Upload style="width: 14px; height: 14px;" /> Upload File
							{/if}
						</label>
					</div>
					{#if imageUrl}
						<div style="margin-top: 10px; width: 140px; aspect-ratio: 16/10; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
							<img src={imageUrl} alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" />
						</div>
					{/if}
				</div>

				<div>
					<label for="altText" class="admin-label">Image Alt Text</label>
					<input
						type="text"
						id="altText"
						bind:value={altText}
						class="admin-input"
						placeholder="Describe the cover image for SEO & accessibility (e.g. Lead response graph)..."
					/>
				</div>

				<div>
					<label for="excerpt" class="admin-label">Excerpt (Short Description)</label>
					<textarea
						id="excerpt"
						bind:value={excerpt}
						rows="3"
						required
						class="admin-input"
						placeholder="Brief summary of the article..."
					></textarea>
				</div>

				<!-- SEO Settings Group -->
				<div style="border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 20px; background: rgba(255, 255, 255, 0.01);">
					<h4 style="font-size: 15px; font-weight: 600; color: white; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
						SEO Configuration (Search Optimization)
					</h4>
					
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<div>
							<label for="seoTitle" class="admin-label" style="font-size: 12px; color: var(--color-muted);">SEO Meta Title</label>
							<input
								type="text"
								id="seoTitle"
								bind:value={seoTitle}
								class="admin-input"
								placeholder="Defaults to standard title if left empty..."
								style="margin: 0;"
							/>
						</div>
						
						<div>
							<label for="seoDescription" class="admin-label" style="font-size: 12px; color: var(--color-muted);">SEO Meta Description</label>
							<textarea
								id="seoDescription"
								bind:value={seoDescription}
								rows="2"
								class="admin-input"
								placeholder="Defaults to excerpt if left empty..."
								style="margin: 0;"
							></textarea>
						</div>
						
						<div>
							<label for="seoKeywords" class="admin-label" style="font-size: 12px; color: var(--color-muted);">SEO Keywords</label>
							<input
								type="text"
								id="seoKeywords"
								bind:value={seoKeywords}
								class="admin-input"
								placeholder="e.g. AI automation, B2B sales automation, WhatsApp CRM integration (comma separated)"
								style="margin: 0;"
							/>
						</div>
					</div>
				</div>

				<!-- Structured Content Blocks Editor -->
				<div>
					<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
						<label class="admin-label" style="margin: 0;">Blog Body Content Blocks</label>
						<div style="display: flex; gap: 8px; flex-wrap: wrap;">
							<button type="button" class="admin-btn" style="padding: 4px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;" onclick={() => addBlock('heading')}>
								<Plus size={12} /> Heading
							</button>
							<button type="button" class="admin-btn" style="padding: 4px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;" onclick={() => addBlock('paragraph')}>
								<Plus size={12} /> Paragraph
							</button>
							<button type="button" class="admin-btn" style="padding: 4px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;" onclick={() => addBlock('image')}>
								<Plus size={12} /> Image
							</button>
							<button type="button" class="admin-btn" style="padding: 4px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;" onclick={() => addBlock('newline')}>
								<Plus size={12} /> Spacing
							</button>
						</div>
					</div>

					<div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
						{#each contentBlocks as block, idx}
							<div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 16px;">
								<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">
									<span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-cyan); background: rgba(6, 182, 212, 0.1); padding: 2px 8px; border-radius: 4px;">
										{block.type} Block
									</span>
									<div style="display: flex; gap: 4px;">
										<button type="button" class="admin-icon-btn" onclick={() => moveBlockUp(idx)} disabled={idx === 0}>
											<ArrowUp size={12} />
										</button>
										<button type="button" class="admin-icon-btn" onclick={() => moveBlockDown(idx)} disabled={idx === contentBlocks.length - 1}>
											<ArrowDown size={12} />
										</button>
										<button type="button" class="admin-icon-btn danger" onclick={() => removeBlock(idx)} disabled={contentBlocks.length === 1}>
											<Trash2 size={12} />
										</button>
									</div>
								</div>

								{#if block.type === 'paragraph'}
									<textarea
										bind:value={block.text}
										rows="4"
										class="admin-input"
										style="margin: 0;"
										placeholder="Type paragraph text..."
									></textarea>

								{:else if block.type === 'heading'}
									<div style="display: flex; gap: 12px; align-items: center;">
										<select bind:value={block.level} class="admin-input" style="margin: 0; width: 140px; background: var(--color-abyss); color: white;">
											<option value={1}>Heading 1</option>
											<option value={2}>Heading 2</option>
											<option value={3}>Heading 3</option>
											<option value={4}>Heading 4</option>
										</select>
										<input
											type="text"
											bind:value={block.text}
											class="admin-input"
											style="margin: 0; flex: 1;"
											placeholder="Heading text..."
										/>
									</div>

								{:else if block.type === 'image'}
									<div style="display: flex; flex-direction: column; gap: 10px;">
										<div style="display: flex; gap: 10px; align-items: center;">
											<input
												type="text"
												bind:value={block.url}
												class="admin-input"
												style="margin: 0; flex: 1;"
												placeholder="Image URL or upload..."
											/>
											<input
												type="file"
												id={`block-file-${idx}`}
												accept="image/*"
												style="display: none;"
												onchange={(e) => handleBlockImageUpload(idx, e)}
											/>
											<label
												for={`block-file-${idx}`}
												class="admin-btn"
												style="margin: 0; cursor: pointer; white-space: nowrap;"
											>
												<Upload size={14} /> Upload
											</label>
										</div>
										<input
											type="text"
											bind:value={block.caption}
											class="admin-input"
											style="margin: 0;"
											placeholder="Image caption (optional)..."
										/>
										{#if block.url}
											<div style="width: 100px; aspect-ratio: 16/10; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); margin-top: 4px;">
												<img src={block.url} alt="Block preview" style="width: 100%; height: 100%; object-fit: cover;" />
											</div>
										{/if}
									</div>

								{:else if block.type === 'newline'}
									<div style="color: var(--color-muted); font-size: 13px; padding: 4px 0;">
										Adds a clean vertical separation margin (24px space) inside the article.
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 16px; border-top: 1px solid rgba(54, 40, 112, 0.4);">
					<button
						type="button"
						onclick={cancelEdit}
						style="background: none; border: none; padding: 8px 16px; color: var(--color-muted); font-size: 14px; font-weight: 500; cursor: pointer;"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={saveLoading}
						class="admin-btn"
					>
						{#if saveLoading}
							<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" />
							Saving...
						{:else}
							<Save style="width: 16px; height: 16px;" />
							Save Post
						{/if}
					</button>
				</div>
			</form>
		</div>
	{/if}

	{#if loading}
		<div style="display: flex; justify-content: center; padding: 48px 0;">
			<Loader2 style="width: 32px; height: 32px; color: var(--color-cyan); animation: spin 1s linear infinite;" />
		</div>
	{:else if blogs.length === 0 && !isEditing}
		<div class="admin-card" style="text-align: center; padding: 48px 24px;">
			<div style="margin: 0 auto 16px; width: 48px; height: 48px; background: var(--color-midnight); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
				<FileText style="width: 24px; height: 24px; color: var(--color-muted);" />
			</div>
			<h3 style="font-size: 18px; font-weight: 500; color: white;">No posts yet</h3>
			<p style="margin-top: 8px; font-size: 14px; color: var(--color-muted);">Get started by creating your first blog post.</p>
			<button
				onclick={() => startEdit()}
				class="admin-btn"
				style="margin-top: 24px;"
			>
				<Plus style="width: 16px; height: 16px;" />
				Create Post
			</button>
		</div>
	{:else if !isEditing}
		<div class="admin-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
			{#each blogs as blog (blog.id)}
				<div class="admin-card" style="padding: 0; display: flex; flex-direction: column; overflow: hidden; height: 100%;">
					{#if blog.image_url}
						<div class="admin-image-container" style="height: 192px; width: 100%; position: relative; overflow: hidden;">
							<img src={blog.image_url} alt={blog.title} style="width: 100%; height: 100%; object-fit: cover;" />
						</div>
					{:else}
						<div style="height: 192px; width: 100%; background: var(--color-abyss); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(54, 40, 112, 0.4);">
							<FileText style="width: 48px; height: 48px; color: rgba(54, 40, 112, 0.6);" />
						</div>
					{/if}
					<div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
						<div>
							<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
								<span style="border-radius: 6px; background: rgba(54, 40, 112, 0.4); padding: 2px 6px; font-size: 11px; font-weight: 500; color: white;">
									{blog.category}
								</span>
								{#if blog.featured}
									<span style="border-radius: 6px; background: rgba(6, 182, 212, 0.2); padding: 2px 6px; font-size: 11px; font-weight: 600; color: var(--color-cyan);">
										Featured
									</span>
								{/if}
							</div>
							<h3 style="font-size: 18px; font-weight: 600; color: white; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 8px;">{blog.title}</h3>
							<p style="font-size: 14px; color: var(--color-body-text); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0;">{blog.excerpt}</p>
						</div>
						<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(54, 40, 112, 0.4); display: flex; align-items: center; justify-content: space-between;">
							<span style="font-size: 12px; color: var(--color-muted);">
								{blog.read_time || '5 min read'}
							</span>
							<div style="display: flex; gap: 8px;">
								<button
									onclick={() => startEdit(blog)}
									class="admin-icon-btn"
									title="Edit"
								>
									<Edit2 style="width: 16px; height: 16px; color: var(--color-cyan);" />
								</button>
								<button
									onclick={() => deleteBlog(blog.id!)}
									class="admin-icon-btn danger"
									title="Delete"
								>
									<Trash2 style="width: 16px; height: 16px;" />
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
