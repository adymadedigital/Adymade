<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { Upload, Trash2, Copy, Loader2, Image as ImageIcon, Check } from 'lucide-svelte';

	let images = $state<{ name: string; url: string; size: number }[]>([]);
	let loading = $state(true);
	let error = $state('');
	let uploadLoading = $state(false);
	let copiedUrl = $state<string | null>(null);

	onMount(async () => {
		await fetchImages();
	});

	async function fetchImages() {
		loading = true;
		error = '';

		const { data, error: fetchError } = await supabase.storage.from('images').list();

		if (fetchError) {
			error = fetchError.message;
		} else if (data) {
			// Exclude the hidden placeholder files that Supabase sometimes creates
			const validFiles = data.filter(file => file.name !== '.emptyFolderPlaceholder');
			
			images = validFiles.map((file) => {
				const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(file.name);
				return {
					name: file.name,
					url: publicUrl,
					size: file.metadata?.size || 0
				};
			});
		}
		
		loading = false;
	}

	async function uploadImage(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];
		uploadLoading = true;
		error = '';

		// Generate a unique filename to prevent overwrites
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

		const { error: uploadError } = await supabase.storage
			.from('images')
			.upload(fileName, file);

		uploadLoading = false;

		if (uploadError) {
			error = uploadError.message;
		} else {
			// Reset file input
			input.value = '';
			await fetchImages();
		}
	}

	async function deleteImage(name: string) {
		if (!confirm(`Are you sure you want to delete ${name}?`)) return;
		
		const { error: deleteError } = await supabase.storage
			.from('images')
			.remove([name]);

		if (deleteError) {
			alert('Failed to delete: ' + deleteError.message);
		} else {
			await fetchImages();
		}
	}

	function copyToClipboard(url: string) {
		navigator.clipboard.writeText(url);
		copiedUrl = url;
		setTimeout(() => {
			if (copiedUrl === url) copiedUrl = null;
		}, 2000);
	}

	function formatBytes(bytes: number, decimals = 2) {
		if (!+bytes) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}
</script>

<div>
	<div class="admin-header">
		<div>
			<h2>Images</h2>
			<p>Upload and manage media for your site.</p>
		</div>
		<div>
			<input
				type="file"
				id="file-upload"
				style="display: none;"
				accept="image/*"
				onchange={uploadImage}
				disabled={uploadLoading}
			/>
			<label
				for="file-upload"
				class="admin-btn"
				style="{uploadLoading ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;'}"
			>
				{#if uploadLoading}
					<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" />
					Uploading...
				{:else}
					<Upload style="width: 16px; height: 16px;" />
					Upload Image
				{/if}
			</label>
		</div>
	</div>

	{#if error}
		<div class="admin-alert error">
			{error}
		</div>
	{/if}

	{#if loading}
		<div style="display: flex; justify-content: center; padding: 48px 0;">
			<Loader2 style="width: 32px; height: 32px; color: var(--color-muted); animation: spin 1s linear infinite;" />
		</div>
	{:else if images.length === 0}
		<div class="admin-card" style="text-align: center; padding: 48px 24px;">
			<div style="margin: 0 auto 16px; width: 48px; height: 48px; background: var(--color-midnight); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
				<ImageIcon style="width: 24px; height: 24px; color: var(--color-muted);" />
			</div>
			<h3 style="font-size: 18px; font-weight: 500; color: white;">No images uploaded</h3>
			<p style="margin-top: 8px; font-size: 14px; color: var(--color-muted);">Upload your first image to use in your blogs and content.</p>
			
			<label
				for="file-upload"
				class="admin-btn"
				style="margin-top: 24px; cursor: pointer;"
			>
				<Upload style="width: 16px; height: 16px;" />
				Upload Image
			</label>
		</div>
	{:else}
		<div class="admin-grid" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));">
			{#each images as image (image.name)}
				<div class="admin-card" style="padding: 0; display: flex; flex-direction: column; overflow: hidden; position: relative;">
					<div class="admin-image-container">
						<img src={image.url} alt={image.name} loading="lazy" />
						
						<!-- Overlay actions -->
						<div class="admin-image-overlay">
							<button
								onclick={() => copyToClipboard(image.url)}
								class="admin-overlay-btn"
								title="Copy URL"
							>
								{#if copiedUrl === image.url}
									<Check style="width: 20px; height: 20px; color: #34d399;" />
								{:else}
									<Copy style="width: 20px; height: 20px;" />
								{/if}
							</button>
							<button
								onclick={() => deleteImage(image.name)}
								class="admin-overlay-btn danger"
								title="Delete Image"
							>
								<Trash2 style="width: 20px; height: 20px;" />
							</button>
						</div>
					</div>
					<div style="padding: 16px; flex: 1; display: flex; flex-direction: column; justify-content: center;">
						<p style="font-size: 14px; font-weight: 500; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title={image.name}>{image.name}</p>
						<p style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">{formatBytes(image.size)}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
