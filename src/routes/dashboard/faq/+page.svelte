<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase, type FaqDB } from '$lib/supabase';
	import { Plus, Trash2, Edit2, Loader2, Save, X, ArrowUp, ArrowDown, HelpCircle } from 'lucide-svelte';
	import { uiState } from '$lib/state/ui.svelte';

	let faqs = $state<FaqDB[]>([]);
	let loading = $state(true);
	let error = $state('');
	let reordering = $state(false);

	let isEditing = $state(false);
	let editingId = $state<string | null>(null);
	let question = $state('');
	let answer = $state('');
	let saveLoading = $state(false);

	onMount(async () => {
		await fetchFaqs();
	});

	async function fetchFaqs(quiet = false) {
		if (!quiet) loading = true;
		const { data, error: fetchError } = await supabase
			.from('faqs')
			.select('*')
			.order('sort_order', { ascending: true })
			.order('created_at', { ascending: false });

		if (fetchError) {
			error = fetchError.message;
		} else {
			faqs = data || [];
		}
		if (!quiet) loading = false;
	}

	function startEdit(faq?: FaqDB) {
		error = '';
		if (faq) {
			isEditing = true;
			editingId = faq.id!;
			question = faq.question;
			answer = faq.answer;
		} else {
			isEditing = true;
			editingId = null;
			question = '';
			answer = '';
		}
	}

	function cancelEdit() {
		isEditing = false;
		editingId = null;
	}

	async function saveFaq() {
		saveLoading = true;
		error = '';

		const faqData = {
			question,
			answer
		};

		if (editingId) {
			const { error: updateError } = await supabase
				.from('faqs')
				.update(faqData)
				.eq('id', editingId);
			if (updateError) {
				error = updateError.message;
				uiState.error('Failed to update FAQ: ' + error);
			} else {
				uiState.success('FAQ updated successfully!');
			}
		} else {
			// Find max sort_order to append at the end
			const maxOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.sort_order ?? 0)) : 0;
			const { error: insertError } = await supabase
				.from('faqs')
				.insert([{ ...faqData, sort_order: maxOrder + 10 }]);
			if (insertError) {
				error = insertError.message;
				uiState.error('Failed to create FAQ: ' + error);
			} else {
				uiState.success('FAQ created successfully!');
			}
		}

		saveLoading = false;
		if (!error) {
			cancelEdit();
			await fetchFaqs();
		}
	}

	async function deleteFaq(id: string) {
		const confirmed = await uiState.confirm({
			title: 'Delete FAQ',
			message: 'Are you sure you want to delete this FAQ?',
			confirmText: 'Delete',
			cancelText: 'Cancel',
			type: 'danger'
		});
		if (!confirmed) return;

		const { error: deleteError } = await supabase
			.from('faqs')
			.delete()
			.eq('id', id);

		if (deleteError) {
			uiState.error('Failed to delete: ' + deleteError.message);
		} else {
			uiState.success('FAQ deleted successfully');
			await fetchFaqs();
		}
	}

	async function moveFaq(index: number, direction: 'up' | 'down') {
		if (reordering) return;
		const targetIndex = direction === 'up' ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= faqs.length) return;

		reordering = true;
		
		// Optimistically swap locally
		const newFaqs = [...faqs];
		const temp = newFaqs[index];
		newFaqs[index] = newFaqs[targetIndex];
		newFaqs[targetIndex] = temp;
		
		// Assign clean increments of 10 for sort orders
		newFaqs.forEach((faq, idx) => {
			faq.sort_order = (idx + 1) * 10;
		});
		
		// Set local state instantly
		faqs = newFaqs;

		try {
			// Persist changes in database concurrently
			const updates = faqs.map((faq) =>
				supabase
					.from('faqs')
					.update({ sort_order: faq.sort_order })
					.eq('id', faq.id)
			);
			
			const results = await Promise.all(updates);
			const hasError = results.some((r) => r.error);
			
			if (hasError) {
				console.error('Failed to save updated sorting to DB.');
				await fetchFaqs(); // Revert local state to DB state
			} else {
				await fetchFaqs(true); // Quietly sync state
			}
		} catch (err) {
			console.error(err);
			await fetchFaqs();
		} finally {
			reordering = false;
		}
	}
</script>

<div>
	<div class="admin-header">
		<div>
			<h2>FAQs</h2>
			<p>Manage your frequently asked questions and their ordering on the main website.</p>
		</div>
		{#if !isEditing}
			<button onclick={() => startEdit()} class="admin-btn">
				<Plus style="width: 16px; height: 16px;" />
				New FAQ
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
				<h3 style="font-size: 20px; font-weight: 600; color: white;">{editingId ? 'Edit FAQ' : 'Create New FAQ'}</h3>
				<button onclick={cancelEdit} style="background: none; border: none; padding: 8px; color: var(--color-muted); cursor: pointer; border-radius: 8px; transition: all 0.2s;">
					<X style="width: 20px; height: 20px;" />
				</button>
			</div>

			<form style="display: flex; flex-direction: column; gap: 24px;" onsubmit={(e) => { e.preventDefault(); saveFaq(); }}>
				<div>
					<label for="question" class="admin-label">Question</label>
					<input
						type="text"
						id="question"
						bind:value={question}
						required
						class="admin-input"
						placeholder="e.g. What is GEO?"
					/>
				</div>

				<div>
					<label for="answer" class="admin-label">Answer</label>
					<textarea
						id="answer"
						bind:value={answer}
						rows="6"
						required
						class="admin-input"
						placeholder="Explain the answer clearly..."
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
							Save FAQ
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
	{:else if faqs.length === 0}
		<div class="admin-card" style="text-align: center; padding: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
			<HelpCircle style="width: 48px; height: 48px; color: var(--color-muted);" />
			<div>
				<h3 style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 8px;">No FAQs Found</h3>
				<p style="color: var(--color-muted); margin: 0;">Add your first frequently asked question to get started.</p>
			</div>
			<button onclick={() => startEdit()} class="admin-btn" style="margin-top: 8px;">
				<Plus style="width: 16px; height: 16px;" />
				New FAQ
			</button>
		</div>
	{:else}
		<div style="display: flex; flex-direction: column; gap: 16px;">
			{#each faqs as faq, idx (faq.id)}
				<div class="admin-card faq-row" style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 20px 24px;">
					<div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
						<div style="display: flex; flex-direction: column; gap: 4px;">
							<button
								onclick={() => moveFaq(idx, 'up')}
								disabled={idx === 0 || reordering}
								class="admin-icon-btn reorder-btn"
								aria-label="Move Up"
							>
								<ArrowUp style="width: 16px; height: 16px;" />
							</button>
							<button
								onclick={() => moveFaq(idx, 'down')}
								disabled={idx === faqs.length - 1 || reordering}
								class="admin-icon-btn reorder-btn"
								aria-label="Move Down"
							>
								<ArrowDown style="width: 16px; height: 16px;" />
							</button>
						</div>
						<div style="min-width: 0; flex: 1;">
							<h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 8px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
								{faq.question}
							</h4>
							<p style="color: var(--color-muted); font-size: 14px; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
								{faq.answer}
							</p>
						</div>
					</div>

					<div style="display: flex; align-items: center; gap: 8px;">
						<button onclick={() => startEdit(faq)} class="admin-icon-btn" aria-label="Edit FAQ">
							<Edit2 style="width: 16px; height: 16px; color: var(--color-cyan);" />
						</button>
						<button onclick={() => deleteFaq(faq.id!)} class="admin-icon-btn" aria-label="Delete FAQ">
							<Trash2 style="width: 16px; height: 16px; color: #ef4444;" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(.faq-row .admin-icon-btn.reorder-btn:disabled) {
		opacity: 0.15 !important;
		cursor: not-allowed !important;
		pointer-events: none !important;
	}
</style>
