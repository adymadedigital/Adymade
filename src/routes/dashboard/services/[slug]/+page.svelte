<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { Save, Trash2, Loader2, Image as ImageIcon } from 'lucide-svelte';

	// The current slug from the URL
	let slug = $derived($page.params.slug);
	
	// Data
	let serviceId = $state<string | null>(null);
	let title = $state('');
	let category = $state('');
	let content = $state('');
	let imageUrl = $state('');
	
	let loading = $state(true);
	let saving = $state(false);
	let deleting = $state(false);
	let uploadingImage = $state(false);
	let saveMessage = $state('');
	let errorMessage = $state('');

	// A helper to figure out the default title/category based on the slug
	const serviceMeta: Record<string, { category: string, title: string }> = {
		'ai-automation-agents': { category: 'AI & Automation', title: 'AI Automation & Agents' },
		'ai-videos': { category: 'AI & Automation', title: 'AI Videos & Creatives' },
		'compliance-videos': { category: 'AI & Automation', title: 'Compliance Videos' },
		'geo': { category: 'AI & Automation', title: 'GEO — AI Search Ranking' },
		'web-app-development': { category: 'Development', title: 'Web & App Development' },
		'custom-software': { category: 'Development', title: 'Custom Software' },
		'digital-marketing': { category: 'Marketing', title: 'Digital Marketing' },
		'seo': { category: 'Marketing', title: 'SEO Services' }
	};

	// We need to re-fetch when the slug changes, since this is a dynamic route
	$effect(() => {
		if (slug) {
			loadService();
		}
	});

	async function loadService() {
		loading = true;
		errorMessage = '';
		saveMessage = '';

		const { data, error } = await supabase
			.from('services')
			.select('*')
			.eq('slug', slug)
			.maybeSingle();

		if (error && error.code !== 'PGRST116') {
			errorMessage = error.message;
		} else if (data) {
			serviceId = data.id;
			title = data.title;
			category = data.category;
			content = data.content;
			imageUrl = data.image_url ?? '';
		} else {
			// Doesn't exist yet, setup defaults
			serviceId = null;
			const meta = serviceMeta[slug] || { category: 'Other', title: 'Unknown Service' };
			title = meta.title;
			category = meta.category;
			content = '';
			imageUrl = '';
		}
		
		loading = false;
	}

	async function saveService() {
		saving = true;
		saveMessage = '';
		errorMessage = '';

		const payload = {
			slug,
			category,
			title,
			content,
			image_url: imageUrl
		};

		let result;
		if (serviceId) {
			result = await supabase.from('services').update(payload).eq('id', serviceId);
		} else {
			result = await supabase.from('services').insert(payload).select().single();
		}

		saving = false;

		if (result.error) {
			errorMessage = result.error.message;
		} else {
			saveMessage = 'Service content saved successfully!';
			if (!serviceId && result.data) {
				serviceId = result.data.id;
			}
			setTimeout(() => { saveMessage = ''; }, 3000);
		}
	}

	async function deleteService() {
		if (!serviceId) return;
		if (!confirm('Are you sure you want to delete the content for this service? It will revert to being empty.')) return;

		deleting = true;
		const { error } = await supabase.from('services').delete().eq('id', serviceId);
		deleting = false;

		if (error) {
			errorMessage = error.message;
		} else {
			serviceId = null;
			content = '';
			imageUrl = '';
			saveMessage = 'Service content deleted.';
			setTimeout(() => { saveMessage = ''; }, 3000);
		}
	}

	async function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;
		
		const file = target.files[0];
		uploadingImage = true;
		errorMessage = '';
		
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
		const filePath = `services/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('images')
			.upload(filePath, file);

		if (uploadError) {
			errorMessage = uploadError.message;
			uploadingImage = false;
			return;
		}

		const { data } = supabase.storage.from('images').getPublicUrl(filePath);
		imageUrl = data.publicUrl;
		uploadingImage = false;
	}
</script>

<svelte:head>
	<title>{title || 'Service'} | Adymade CMS</title>
</svelte:head>

<div class="admin-header">
	<div>
		<h2>Manage Service</h2>
		<p>Update the content and image for this specific service.</p>
	</div>
</div>

{#if loading}
	<div style="display: flex; justify-content: center; padding: 40px;">
		<Loader2 class="w-8 h-8 animate-spin" style="color: var(--color-cyan)" />
	</div>
{:else}
	<div class="admin-card" style="max-width: 800px;">
		{#if errorMessage}
			<div class="admin-alert error" style="margin-bottom: 24px;">
				<p>{errorMessage}</p>
			</div>
		{/if}
		
		{#if saveMessage}
			<div class="admin-alert success" style="margin-bottom: 24px;">
				<p>{saveMessage}</p>
			</div>
		{/if}

		<div class="admin-form-group">
			<label class="admin-label">Service Title</label>
			<input type="text" class="admin-input" bind:value={title} placeholder="e.g. AI Automation & Agents" />
		</div>

		<div class="admin-form-group">
			<label class="admin-label">Category</label>
			<input type="text" class="admin-input" bind:value={category} placeholder="e.g. AI & Automation" />
		</div>

		<div class="admin-form-group">
			<label class="admin-label">Featured Image</label>
			
			<div style="display: flex; gap: 16px; align-items: flex-start;">
				{#if imageUrl}
					<div class="admin-image-container" style="width: 200px; height: 120px; flex-shrink: 0;">
						<img src={imageUrl} alt="Featured" />
						<button 
							class="admin-overlay-btn" 
							onclick={() => imageUrl = ''}
							title="Remove image"
						>
							<Trash2 style="width: 16px; height: 16px;" />
						</button>
					</div>
				{/if}
				
				<div style="flex: 1;">
					<label class="admin-btn secondary" style="display: inline-flex; cursor: pointer; {uploadingImage ? 'opacity: 0.5; pointer-events: none;' : ''}">
						{#if uploadingImage}
							<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" />
							Uploading...
						{:else}
							<ImageIcon style="width: 16px; height: 16px;" />
							Upload Image
						{/if}
						<input type="file" accept="image/*" style="display: none;" onchange={handleImageUpload} disabled={uploadingImage} />
					</label>
					<p style="font-size: 12px; color: var(--color-muted); margin-top: 8px;">Upload a cover image for this service page. Must be JPG, PNG, or WEBP.</p>
				</div>
			</div>
		</div>

		<div class="admin-form-group">
			<label class="admin-label">Content</label>
			<textarea 
				class="admin-input" 
				bind:value={content} 
				placeholder="Write the full content and details about this service here..."
				style="min-height: 300px; resize: vertical;"
			></textarea>
		</div>

		<div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(54, 40, 112, 0.4);">
			{#if serviceId}
				<button 
					class="admin-btn danger" 
					onclick={deleteService}
					disabled={deleting || saving}
					style="margin-right: auto;"
				>
					{#if deleting}
						<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" />
						Deleting...
					{:else}
						<Trash2 style="width: 16px; height: 16px;" />
						Delete Content
					{/if}
				</button>
			{/if}
			
			<button 
				class="admin-btn primary" 
				onclick={saveService}
				disabled={saving || deleting || !title || !content}
			>
				{#if saving}
					<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" />
					Saving...
				{:else}
					<Save style="width: 16px; height: 16px;" />
					{serviceId ? 'Update Service' : 'Push New Service'}
				{/if}
			</button>
		</div>
	</div>
{/if}

<style>
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
