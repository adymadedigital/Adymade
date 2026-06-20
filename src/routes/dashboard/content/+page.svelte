<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type Content } from '$lib/supabase';
	import { Plus, Trash2, Edit2, Loader2, Save, X, Settings } from 'lucide-svelte';

	let contentItems = $state<Content[]>([]);
	let loading = $state(true);
	let error = $state('');

	let isEditing = $state(false);
	let editingId = $state<string | null>(null);
	let key = $state('');
	let value = $state('');
	let saveLoading = $state(false);

	onMount(async () => {
		await fetchContent();
	});

	async function fetchContent() {
		loading = true;
		const { data, error: fetchError } = await supabase
			.from('content')
			.select('*')
			.order('key', { ascending: true });

		if (fetchError) {
			error = fetchError.message;
		} else {
			contentItems = data || [];
		}
		loading = false;
	}

	function startEdit(item?: Content) {
		error = '';
		if (item) {
			isEditing = true;
			editingId = item.id!;
			key = item.key;
			value = item.value;
		} else {
			isEditing = true;
			editingId = null;
			key = '';
			value = '';
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	async function saveContent() {
		saveLoading = true;
		error = '';

		const contentData = {
			key: key.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
			value
		};

		if (editingId) {
			const { error: updateError } = await supabase
				.from('content')
				.update(contentData)
				.eq('id', editingId);
			if (updateError) error = updateError.message;
		} else {
			const { error: insertError } = await supabase
				.from('content')
				.insert([contentData]);
			if (insertError) error = insertError.message;
		}

		saveLoading = false;
		if (!error) {
			cancelEdit();
			await fetchContent();
		}
	}

	async function deleteContent(id: string) {
		if (!confirm('Are you sure you want to delete this content item?')) return;
		
		const { error: deleteError } = await supabase
			.from('content')
			.delete()
			.eq('id', id);

		if (deleteError) {
			alert('Failed to delete: ' + deleteError.message);
		} else {
			await fetchContent();
		}
	}
</script>

<div>
	<div class="admin-header">
		<div>
			<h2>Site Content</h2>
			<p>Manage generic text content across your website.</p>
		</div>
		{#if !isEditing}
			<button
				onclick={() => startEdit()}
				class="admin-btn"
			>
				<Plus style="width: 16px; height: 16px;" />
				New Item
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
				<h3 style="font-size: 20px; font-weight: 600; color: white;">{editingId ? 'Edit Content' : 'Add New Content'}</h3>
				<button onclick={cancelEdit} style="background: none; border: none; padding: 8px; color: var(--color-muted); cursor: pointer; border-radius: 8px; transition: all 0.2s;">
					<X style="width: 20px; height: 20px;" />
				</button>
			</div>

			<form style="display: flex; flex-direction: column; gap: 24px;" onsubmit={(e) => { e.preventDefault(); saveContent(); }}>
				<div>
					<label for="key" class="admin-label">Identifier Key</label>
					<input
						type="text"
						id="key"
						bind:value={key}
						required
						class="admin-input"
						style="font-family: monospace;"
						placeholder="e.g. homepage_hero_title"
					/>
					<p style="font-size: 12px; color: var(--color-muted); margin-top: 8px;">Use a unique snake_case name to identify this content in your code.</p>
				</div>

				<div>
					<label for="value" class="admin-label">Content Value</label>
					<textarea
						id="value"
						bind:value={value}
						rows="5"
						required
						class="admin-input"
						placeholder="The text that will be displayed..."
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
							Save Item
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
	{:else if contentItems.length === 0 && !isEditing}
		<div class="admin-card" style="text-align: center; padding: 48px 24px;">
			<div style="margin: 0 auto 16px; width: 48px; height: 48px; background: var(--color-midnight); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
				<Settings style="width: 24px; height: 24px; color: var(--color-muted);" />
			</div>
			<h3 style="font-size: 18px; font-weight: 500; color: white;">No content keys yet</h3>
			<p style="margin-top: 8px; font-size: 14px; color: var(--color-muted);">Add key-value pairs to manage your static text.</p>
			<button
				onclick={() => startEdit()}
				class="admin-btn"
				style="margin-top: 24px;"
			>
				<Plus style="width: 16px; height: 16px;" />
				Add Item
			</button>
		</div>
	{:else if !isEditing}
		<div class="admin-card" style="padding: 0; overflow: hidden;">
			<ul style="list-style: none; padding: 0; margin: 0;">
				{#each contentItems as item (item.id)}
					<li class="admin-table-row group">
						<div style="flex: 1; min-width: 0;">
							<div style="display: flex; align-items: center; gap: 12px;">
								<span style="display: inline-flex; align-items: center; border-radius: 6px; background: rgba(54, 40, 112, 0.4); padding: 4px 8px; font-size: 12px; font-weight: 500; color: white; font-family: monospace;">
									{item.key}
								</span>
							</div>
							<p style="margin-top: 12px; font-size: 14px; color: var(--color-body-text); white-space: pre-wrap;">{item.value}</p>
						</div>
						<div style="display: flex; gap: 8px; opacity: 1;">
							<button
								onclick={() => startEdit(item)}
								class="admin-icon-btn"
								title="Edit"
							>
								<Edit2 style="width: 16px; height: 16px;" />
							</button>
							<button
								onclick={() => deleteContent(item.id!)}
								class="admin-icon-btn danger"
								title="Delete"
							>
								<Trash2 style="width: 16px; height: 16px;" />
							</button>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
