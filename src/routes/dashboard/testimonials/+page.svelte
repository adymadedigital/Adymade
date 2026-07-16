<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type TestimonialDB } from '$lib/supabase';
	import { Plus, Trash2, Edit2, Loader2, Save, X, ArrowUp, ArrowDown, MessageSquare } from 'lucide-svelte';
	import { uiState } from '$lib/state/ui.svelte';

	let testimonials = $state<TestimonialDB[]>([]);
	let loading = $state(true);
	let error = $state('');
	let reordering = $state(false);

	let isEditing = $state(false);
	let editingId = $state<string | null>(null);
	let quote = $state('');
	let name = $state('');
	let initials = $state('');
	let role = $state('');
	let avatarGradient = $state('');
	let saveLoading = $state(false);

	onMount(async () => {
		await fetchTestimonials();
	});

	async function fetchTestimonials(quiet = false) {
		if (!quiet) loading = true;
		const { data, error: fetchError } = await supabase
			.from('testimonials')
			.select('*')
			.order('sort_order', { ascending: true })
			.order('created_at', { ascending: false });

		if (fetchError) {
			error = fetchError.message;
		} else {
			testimonials = data || [];
		}
		if (!quiet) loading = false;
	}

	function startEdit(t?: TestimonialDB) {
		error = '';
		if (t) {
			isEditing = true;
			editingId = t.id!;
			quote = t.quote;
			name = t.name;
			initials = t.initials;
			role = t.role;
			avatarGradient = t.avatar_gradient || '';
		} else {
			isEditing = true;
			editingId = null;
			quote = '';
			name = '';
			initials = '';
			role = '';
			avatarGradient = '';
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	async function saveTestimonial() {
		saveLoading = true;
		error = '';

		const tData = {
			quote,
			name,
			initials,
			role,
			avatar_gradient: avatarGradient || null
		};

		if (editingId) {
			const { error: updateError } = await supabase
				.from('testimonials')
				.update(tData)
				.eq('id', editingId);
			if (updateError) {
				error = updateError.message;
				uiState.error('Failed to update testimonial: ' + error);
			} else {
				uiState.success('Testimonial updated successfully!');
			}
		} else {
			const maxOrder = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.sort_order ?? 0)) : 0;
			const { error: insertError } = await supabase
				.from('testimonials')
				.insert([{ ...tData, sort_order: maxOrder + 10 }]);
			if (insertError) {
				error = insertError.message;
				uiState.error('Failed to create testimonial: ' + error);
			} else {
				uiState.success('Testimonial created successfully!');
			}
		}

		saveLoading = false;
		if (!error) {
			cancelEdit();
			await fetchTestimonials();
		}
	}

	async function deleteTestimonial(id: string) {
		const confirmed = await uiState.confirm({
			title: 'Delete Testimonial',
			message: 'Are you sure you want to delete this testimonial?',
			confirmText: 'Delete',
			cancelText: 'Cancel',
			type: 'danger'
		});
		if (!confirmed) return;

		const { error: deleteError } = await supabase
			.from('testimonials')
			.delete()
			.eq('id', id);

		if (deleteError) {
			uiState.error('Failed to delete: ' + deleteError.message);
		} else {
			uiState.success('Testimonial deleted successfully');
			await fetchTestimonials();
		}
	}

	async function moveTestimonial(index: number, direction: 'up' | 'down') {
		if (reordering) return;
		const targetIndex = direction === 'up' ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= testimonials.length) return;

		reordering = true;
		
		const newTestimonials = [...testimonials];
		const temp = newTestimonials[index];
		newTestimonials[index] = newTestimonials[targetIndex];
		newTestimonials[targetIndex] = temp;
		
		newTestimonials.forEach((t, idx) => {
			t.sort_order = (idx + 1) * 10;
		});
		
		testimonials = newTestimonials;

		try {
			const updates = testimonials.map((t) =>
				supabase
					.from('testimonials')
					.update({ sort_order: t.sort_order })
					.eq('id', t.id)
			);
			
			const results = await Promise.all(updates);
			const hasError = results.some((r) => r.error);
			
			if (hasError) {
				console.error('Failed to save updated sorting to DB.');
				await fetchTestimonials();
			} else {
				await fetchTestimonials(true);
			}
		} catch (err) {
			console.error(err);
			await fetchTestimonials();
		} finally {
			reordering = false;
		}
	}
</script>

<div>
	<div class="admin-header">
		<div>
			<h2>Testimonials</h2>
			<p>Manage your client testimonials and reviews shown on the main page.</p>
		</div>
		{#if !isEditing}
			<button onclick={() => startEdit()} class="admin-btn">
				<Plus style="width: 16px; height: 16px;" />
				New Testimonial
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
				<h3 style="font-size: 20px; font-weight: 600; color: white;">{editingId ? 'Edit Testimonial' : 'Create New Testimonial'}</h3>
				<button onclick={cancelEdit} style="background: none; border: none; padding: 8px; color: var(--color-muted); cursor: pointer; border-radius: 8px; transition: all 0.2s;">
					<X style="width: 20px; height: 20px;" />
				</button>
			</div>

			<form style="display: flex; flex-direction: column; gap: 24px;" onsubmit={(e) => { e.preventDefault(); saveTestimonial(); }}>
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
					<div>
						<label for="name" class="admin-label">Client Name</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							required
							class="admin-input"
							placeholder="e.g. Priya Mehta"
						/>
					</div>

					<div>
						<label for="initials" class="admin-label">Initials (For Avatar)</label>
						<input
							type="text"
							id="initials"
							bind:value={initials}
							required
							maxlength="2"
							class="admin-input"
							placeholder="e.g. PM"
						/>
					</div>
				</div>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
					<div>
						<label for="role" class="admin-label">Role & Company</label>
						<input
							type="text"
							id="role"
							bind:value={role}
							required
							class="admin-input"
							placeholder="e.g. D2C E-commerce Brand · Mumbai"
						/>
					</div>

					<div>
						<label for="avatarGradient" class="admin-label">Avatar Gradient (Optional)</label>
						<input
							type="text"
							id="avatarGradient"
							bind:value={avatarGradient}
							class="admin-input"
							placeholder="linear-gradient(135deg,#320082,#06b6d4)"
						/>
					</div>
				</div>

				<div>
					<label for="quote" class="admin-label">Testimonial Quote</label>
					<textarea
						id="quote"
						bind:value={quote}
						rows="5"
						required
						class="admin-input"
						placeholder="What did the client say about Adymade?"
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
							Save Testimonial
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
	{:else if testimonials.length === 0}
		<div class="admin-card" style="text-align: center; padding: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
			<MessageSquare style="width: 48px; height: 48px; color: var(--color-muted);" />
			<div>
				<h3 style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 8px;">No Testimonials Found</h3>
				<p style="color: var(--color-muted); margin: 0;">Add your first client testimonial to get started.</p>
			</div>
			<button onclick={() => startEdit()} class="admin-btn" style="margin-top: 8px;">
				<Plus style="width: 16px; height: 16px;" />
				New Testimonial
			</button>
		</div>
	{:else}
		<div style="display: flex; flex-direction: column; gap: 16px;">
			{#each testimonials as t, idx (t.id)}
				<div class="admin-card testimonial-row" style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 20px 24px;">
					<div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
						<div style="display: flex; flex-direction: column; gap: 4px;">
							<button
								onclick={() => moveTestimonial(idx, 'up')}
								disabled={idx === 0 || reordering}
								class="admin-icon-btn reorder-btn"
								aria-label="Move Up"
							>
								<ArrowUp style="width: 16px; height: 16px;" />
							</button>
							<button
								onclick={() => moveTestimonial(idx, 'down')}
								disabled={idx === testimonials.length - 1 || reordering}
								class="admin-icon-btn reorder-btn"
								aria-label="Move Down"
							>
								<ArrowDown style="width: 16px; height: 16px;" />
							</button>
						</div>
						<div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
							<div
								style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; flex-shrink: 0; {t.avatar_gradient ? `background: ${t.avatar_gradient}` : 'background: linear-gradient(135deg,#320082,#5a14f0)'}"
							>
								{t.initials}
							</div>
							<div style="min-width: 0; flex: 1;">
								<h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 4px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
									{t.name}
								</h4>
								<p style="color: var(--color-muted); font-size: 13px; margin: 0 0 6px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
									{t.role}
								</p>
								<p style="color: var(--color-muted); font-size: 14px; font-style: italic; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
									"{t.quote}"
								</p>
							</div>
						</div>
					</div>

					<div style="display: flex; align-items: center; gap: 8px;">
						<button onclick={() => startEdit(t)} class="admin-icon-btn" aria-label="Edit Testimonial">
							<Edit2 style="width: 16px; height: 16px; color: var(--color-cyan);" />
						</button>
						<button onclick={() => deleteTestimonial(t.id!)} class="admin-icon-btn" aria-label="Delete Testimonial">
							<Trash2 style="width: 16px; height: 16px; color: #ef4444;" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(.testimonial-row .admin-icon-btn.reorder-btn:disabled) {
		opacity: 0.15 !important;
		cursor: not-allowed !important;
		pointer-events: none !important;
	}
</style>
