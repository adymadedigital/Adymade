<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type Blog } from '$lib/supabase';
	import { Plus, Trash2, Edit2, Loader2, Save, X, FileText } from 'lucide-svelte';

	let blogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');

	let isEditing = $state(false);
	let editingId = $state<string | null>(null);
	let title = $state('');
	let content = $state('');
	let imageUrl = $state('');
	let saveLoading = $state(false);

	onMount(async () => {
		await fetchBlogs();
	});

	async function fetchBlogs() {
		loading = true;
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

	function startEdit(blog?: Blog) {
		error = '';
		if (blog) {
			isEditing = true;
			editingId = blog.id!;
			title = blog.title;
			content = blog.content;
			imageUrl = blog.image_url || '';
		} else {
			isEditing = true;
			editingId = null;
			title = '';
			content = '';
			imageUrl = '';
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	async function saveBlog() {
		saveLoading = true;
		error = '';

		const blogData = {
			title,
			content,
			image_url: imageUrl || null
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
		<div class="admin-alert error">
			{error}
		</div>
	{/if}

	{#if isEditing}
		<div class="admin-card" style="margin-bottom: 32px;">
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
						required
						class="admin-input"
						placeholder="Post Title"
					/>
				</div>

				<div>
					<label for="imageUrl" class="admin-label">Image URL</label>
					<div style="display: flex; gap: 12px; margin-top: 8px;">
						<input
							type="url"
							id="imageUrl"
							bind:value={imageUrl}
							class="admin-input"
							style="margin-top: 0;"
							placeholder="https://example.com/image.jpg"
						/>
					</div>
					<p style="font-size: 12px; color: var(--color-muted); margin-top: 8px;">You can upload images in the Images section and paste the URL here.</p>
				</div>

				<div>
					<label for="content" class="admin-label">Content</label>
					<textarea
						id="content"
						bind:value={content}
						rows="10"
						required
						class="admin-input"
						style="font-family: monospace; font-size: 14px;"
						placeholder="Write your post content here (HTML or plain text)..."
					></textarea>
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
			<Loader2 style="width: 32px; height: 32px; color: var(--color-muted); animation: spin 1s linear infinite;" />
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
		<div class="admin-grid">
			{#each blogs as blog (blog.id)}
				<div class="admin-card" style="padding: 0; display: flex; flex-direction: column; overflow: hidden;">
					{#if blog.image_url}
						<div class="admin-image-container" style="height: 192px;">
							<img src={blog.image_url} alt={blog.title} />
						</div>
					{:else}
						<div style="height: 192px; width: 100%; background: var(--color-abyss); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(54, 40, 112, 0.4);">
							<FileText style="width: 48px; height: 48px; color: rgba(54, 40, 112, 0.6);" />
						</div>
					{/if}
					<div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
						<h3 style="font-size: 18px; font-weight: 600; color: white; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{blog.title}</h3>
						<p style="margin-top: 8px; font-size: 14px; color: var(--color-body-text); flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">{blog.content.replace(/<[^>]*>?/gm, '')}</p>
						<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(54, 40, 112, 0.4); display: flex; align-items: center; justify-content: space-between;">
							<span style="font-size: 12px; color: var(--color-muted);">
								{new Date(blog.created_at || '').toLocaleDateString()}
							</span>
							<div style="display: flex; gap: 8px;">
								<button
									onclick={() => startEdit(blog)}
									class="admin-icon-btn"
									title="Edit"
								>
									<Edit2 style="width: 16px; height: 16px;" />
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
