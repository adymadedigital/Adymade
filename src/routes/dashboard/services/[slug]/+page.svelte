<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { Save, Trash2, Edit2, Loader2, Image as ImageIcon, X, HelpCircle, ToggleLeft, ToggleRight, Upload } from 'lucide-svelte';

	interface ServiceCategory {
		id: string;
		name: string;
		slug: string;
		display_order?: number;
	}

	interface ServiceDB {
		id: string;
		category_id: string;
		title: string;
		slug: string;
		short_description: string;
		description: string;
		image_url?: string;
		image_path?: string;
		display_order?: number;
		is_active: boolean;
		created_at?: string;
		updated_at?: string;
	}

	let services = $state<ServiceDB[]>([]);
	let categories = $state<ServiceCategory[]>([]);
	let loading = $state(true);
	let error = $state('');

	let isEditing = $state(false);
	let editingId = $state<string | null>(null);

	// URL Slug
	let slug = $derived($page.params.slug);

	// Edit form states
	let title = $state('');
	let categoryId = $state('');
	let serviceSlug = $state('');
	let shortDescription = $state('');
	let description = $state('');
	let imageUrl = $state('');
	let imagePath = $state('');
	let displayOrder = $state(0);
	let isActive = $state(true);

	let saveLoading = $state(false);
	let uploadingImage = $state(false);

	// Derived filtering logic to separate list by current URL slug's category
	let currentService = $derived(services.find(s => s.slug === slug));
	let currentCategoryId = $derived(currentService ? currentService.category_id : null);
	let currentCategoryName = $derived(currentCategoryId ? getCategoryName(currentCategoryId) : '');

	let filteredServices = $derived(
		currentCategoryId 
			? services.filter(s => s.category_id === currentCategoryId)
			: services
	);

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		
		const [categoriesRes, servicesRes] = await Promise.all([
			supabase.from('service_categories').select('*').order('display_order', { ascending: true }),
			supabase.from('services').select('*').order('display_order', { ascending: true })
		]);

		if (categoriesRes.error) {
			error = categoriesRes.error.message;
		} else if (servicesRes.error) {
			error = servicesRes.error.message;
		} else {
			categories = categoriesRes.data || [];
			services = servicesRes.data || [];
		}
		loading = false;
	}

	function startEdit(service: ServiceDB) {
		error = '';
		isEditing = true;
		editingId = service.id;
		title = service.title;
		categoryId = service.category_id;
		serviceSlug = service.slug;
		shortDescription = service.short_description || '';
		description = service.description || '';
		imageUrl = service.image_url || '';
		imagePath = service.image_path || '';
		displayOrder = service.display_order || 0;
		isActive = service.is_active;
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	async function saveService() {
		saveLoading = true;
		error = '';

		const payload = {
			category_id: categoryId,
			title,
			slug: serviceSlug.toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
			short_description: shortDescription,
			description,
			image_url: imageUrl || null,
			image_path: imagePath || null,
			display_order: displayOrder,
			is_active: isActive,
			updated_at: new Date().toISOString()
		};

		const { error: updateError } = await supabase
			.from('services')
			.update(payload)
			.eq('id', editingId);

		saveLoading = false;

		if (updateError) {
			error = updateError.message;
		} else {
			cancelEdit();
			await loadData();
		}
	}

	async function deleteService(service: ServiceDB) {
		if (!confirm(`Are you sure you want to delete "${service.title}"?`)) return;

		loading = true;
		if (service.image_path) {
			await supabase.storage.from('service-images').remove([service.image_path]);
		}

		const { error: deleteError } = await supabase
			.from('services')
			.delete()
			.eq('id', service.id);

		if (deleteError) {
			alert('Failed to delete service: ' + deleteError.message);
		}
		await loadData();
	}

	async function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;
		
		const file = target.files[0];
		uploadingImage = true;
		error = '';
		
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
		const filePath = `services/${fileName}`;

		if (imagePath) {
			await supabase.storage.from('service-images').remove([imagePath]);
		}

		const { error: uploadError } = await supabase.storage
			.from('service-images')
			.upload(filePath, file);

		if (uploadError) {
			error = uploadError.message;
			uploadingImage = false;
			return;
		}

		const { data } = supabase.storage.from('service-images').getPublicUrl(filePath);
		imageUrl = data.publicUrl;
		imagePath = filePath;
		uploadingImage = false;
	}

	async function removeImage() {
		if (imagePath) {
			await supabase.storage.from('service-images').remove([imagePath]);
		}
		imageUrl = '';
		imagePath = '';
	}

	function getCategoryName(catId: string) {
		const cat = categories.find(c => c.id === catId);
		return cat ? cat.name : 'Unknown';
	}
</script>

<svelte:head>
	<title>{currentCategoryName || 'Services'} Management | Adymade CMS</title>
</svelte:head>

<div class="admin-header">
	<div>
		<h2>{currentCategoryName || 'Services'}</h2>
		<p>Manage services, categories, and details stored in the database.</p>
	</div>
</div>

{#if error}
	<div class="admin-alert error" style="margin-bottom: 24px;">
		<p>{error}</p>
	</div>
{/if}

{#if isEditing}
	<div class="admin-card" style="margin-bottom: 32px; max-width: 800px;">
		<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
			<h3 style="font-size: 20px; font-weight: 600; color: white;">Edit Service</h3>
			<button onclick={cancelEdit} style="background: none; border: none; padding: 8px; color: var(--color-muted); cursor: pointer; border-radius: 8px; transition: all 0.2s;">
				<X style="width: 20px; height: 20px;" />
			</button>
		</div>

		<!-- svelte-ignore a11y_label_has_associated_control -->
		<form style="display: flex; flex-direction: column; gap: 24px;" onsubmit={(e) => { e.preventDefault(); saveService(); }}>
			<div class="admin-form-group">
				<label class="admin-label">Service Title</label>
				<input type="text" class="admin-input" bind:value={title} required placeholder="e.g. AI Automation & Agents" />
			</div>

			<div class="admin-form-group">
				<label class="admin-label">Slug</label>
				<input type="text" class="admin-input" bind:value={serviceSlug} required placeholder="e.g. ai-automation-agents" />
			</div>

			<div class="admin-form-group">
				<label class="admin-label">Category</label>
				<select class="admin-input" bind:value={categoryId} required style="background: var(--color-abyss); color: white;">
					<option value="" disabled>Select a category</option>
					{#each categories as cat (cat.id)}
						<option value={cat.id}>{cat.name}</option>
					{/each}
				</select>
			</div>

			<div class="admin-form-group">
				<label class="admin-label">Display Order</label>
				<input type="number" class="admin-input" bind:value={displayOrder} required min="0" />
			</div>

			<div class="admin-form-group" style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick={() => isActive = !isActive}>
				<label class="admin-label" style="margin: 0;">Active Status</label>
				<button type="button" style="background: none; border: none; padding: 0; color: var(--color-cyan); cursor: pointer;">
					{#if isActive}
						<ToggleRight size={32} />
					{:else}
						<ToggleLeft size={32} style="color: var(--color-muted);" />
					{/if}
				</button>
			</div>

			<div class="admin-form-group">
				<label for="svc-image" class="admin-label">Featured Image</label>
				<div style="display:flex; gap:10px; align-items: center; margin-bottom: 8px;">
					<input
						id="svc-image"
						type="text"
						bind:value={imageUrl}
						class="admin-input"
						placeholder="Image URL or upload a file..."
						style="margin:0;"
					/>
					<input
						type="file"
						id="svc-file-upload"
						accept="image/*"
						style="display:none;"
						onchange={handleImageUpload}
						disabled={uploadingImage}
					/>
					<label
						for="svc-file-upload"
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
				{#if imageUrl}
					<div style="margin-top: 10px; width: 140px; aspect-ratio: 16/10; border-radius: 8px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); position: relative;">
						<img src={imageUrl} alt="Featured preview" style="width:100%;height:100%;object-fit:cover;" />
						<button 
							type="button"
							class="admin-overlay-btn" 
							onclick={removeImage}
							title="Remove image"
							style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6); border: none; padding: 6px; border-radius: 50%; color: #ef4444; cursor: pointer; display: flex; align-items: center; justify-content: center;"
						>
							<Trash2 style="width: 14px; height: 14px;" />
						</button>
					</div>
				{/if}
			</div>

			<div class="admin-form-group">
				<label class="admin-label">Short Description</label>
				<input type="text" class="admin-input" bind:value={shortDescription} placeholder="Brief summary of the service..." />
			</div>

			<div class="admin-form-group">
				<label class="admin-label">Full Description</label>
				<textarea 
					class="admin-input" 
					bind:value={description} 
					placeholder="Detailed description of the service..."
					style="min-height: 200px; resize: vertical;"
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
				<button type="submit" disabled={saveLoading} class="admin-btn">
					{#if saveLoading}
						<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" />
						Saving...
					{:else}
						<Save style="width: 16px; height: 16px;" />
						Save Service
					{/if}
				</button>
			</div>
		</form>
	</div>
{/if}

{#if loading}
	<div style="display: flex; justify-content: center; padding: 64px 0;">
		<Loader2 style="width: 32px; height: 32px; color: var(--color-cyan); animation: spin 1s linear infinite;" />
	</div>
{:else if filteredServices.length === 0}
	<div class="admin-card" style="text-align: center; padding: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
		<HelpCircle style="width: 48px; height: 48px; color: var(--color-muted);" />
		<div>
			<h3 style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 8px;">No Services Found</h3>
			<p style="color: var(--color-muted); margin: 0;">Ensure the schema is seeded in Supabase database using the services SQL script.</p>
		</div>
		<button onclick={loadData} class="admin-btn" style="margin-top: 8px;">
			Retry Fetch
		</button>
	</div>
{:else if !isEditing}
	<div style="display: flex; flex-direction: column; gap: 16px;">
		{#each filteredServices as service (service.id)}
			<div class="admin-card" style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 20px 24px;">
				<div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
					{#if service.image_url}
						<div style="width: 64px; height: 64px; border-radius: 8px; overflow: hidden; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1);">
							<img src={service.image_url} alt={service.title} style="width: 100%; height: 100%; object-fit: cover;" />
						</div>
					{:else}
						<div style="width: 64px; height: 64px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--color-muted);">
							<ImageIcon size={24} />
						</div>
					{/if}

					<div style="min-width: 0; flex: 1;">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
							<h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0;">
								{service.title}
							</h4>
							<span style="border-radius: 6px; background: rgba(54, 40, 112, 0.4); padding: 2px 6px; font-size: 11px; font-weight: 500; color: white;">
								{getCategoryName(service.category_id)}
							</span>
							{#if !service.is_active}
								<span style="border-radius: 6px; background: rgba(239, 68, 68, 0.2); padding: 2px 6px; font-size: 11px; font-weight: 500; color: #f87171;">
									Inactive
								</span>
							{/if}
						</div>
						<p style="color: var(--color-muted); font-size: 14px; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
							{service.short_description || service.description || 'No description provided.'}
						</p>
					</div>
				</div>

				<div style="display: flex; align-items: center; gap: 8px;">
					<button onclick={() => startEdit(service)} class="admin-icon-btn" aria-label="Edit Service">
						<Edit2 style="width: 16px; height: 16px; color: var(--color-cyan);" />
					</button>
					<button onclick={() => deleteService(service)} class="admin-icon-btn" aria-label="Delete Service" style="border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05);">
						<Trash2 style="width: 16px; height: 16px; color: #ef4444;" />
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
