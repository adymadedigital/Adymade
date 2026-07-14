<script lang="ts">
	import { uiState } from '$lib/state/ui.svelte';
	import { fly, fade } from 'svelte/transition';
	import { AlertTriangle, HelpCircle, CheckCircle2, Info, X } from 'lucide-svelte';

	// Handle close or confirm
	function handleCancel() {
		if (uiState.confirmDialog) {
			uiState.confirmDialog.resolve(false);
		}
	}

	function handleConfirm() {
		if (uiState.confirmDialog) {
			uiState.confirmDialog.resolve(true);
		}
	}

	// Close on Esc key
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleCancel();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if uiState.confirmDialog && uiState.confirmDialog.show}
	<!-- Overlay Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="confirm-overlay" 
		transition:fade={{ duration: 200 }}
		onclick={handleCancel}
	>
		<!-- Modal Box -->
		<div 
			class="confirm-box type-{uiState.confirmDialog.type}"
			transition:fly={{ y: 20, duration: 300 }}
			onclick={(e) => e.stopPropagation()}
		>
			<button 
				class="confirm-close-btn"
				onclick={handleCancel}
				aria-label="Cancel confirmation"
			>
				<X size={18} />
			</button>

			<div class="confirm-header">
				<div class="confirm-icon-wrap">
					{#if uiState.confirmDialog.type === 'danger' || uiState.confirmDialog.type === 'warning'}
						<AlertTriangle class="confirm-icon" />
					{:else if uiState.confirmDialog.type === 'success'}
						<CheckCircle2 class="confirm-icon" />
					{:else}
						<HelpCircle class="confirm-icon" />
					{/if}
				</div>
				<h3 class="confirm-title">{uiState.confirmDialog.title}</h3>
			</div>

			<div class="confirm-body">
				<p class="confirm-message">{uiState.confirmDialog.message}</p>
			</div>

			<div class="confirm-actions">
				<button 
					class="confirm-btn-cancel"
					onclick={handleCancel}
				>
					{uiState.confirmDialog.cancelText}
				</button>
				<button 
					class="confirm-btn-action type-{uiState.confirmDialog.type}"
					onclick={handleConfirm}
				>
					{uiState.confirmDialog.confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.confirm-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(4, 2, 12, 0.75);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		z-index: 9999999;
	}

	.confirm-box {
		position: relative;
		width: 100%;
		max-width: 440px;
		background: rgba(14, 11, 35, 0.85);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		padding: 32px;
		box-shadow: 
			0 24px 64px rgba(0, 0, 0, 0.6), 
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
		color: white;
		display: flex;
		flex-direction: column;
		gap: 20px;
		text-align: center;
		align-items: center;
	}

	/* Liquid glass styling for different confirmation levels */
	.confirm-box.type-danger {
		border-color: rgba(239, 68, 68, 0.25);
		box-shadow: 
			0 24px 64px rgba(0, 0, 0, 0.6),
			0 0 30px rgba(239, 68, 68, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	.confirm-box.type-danger .confirm-icon-wrap {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.confirm-box.type-warning {
		border-color: rgba(245, 158, 11, 0.25);
		box-shadow: 
			0 24px 64px rgba(0, 0, 0, 0.6),
			0 0 30px rgba(245, 158, 11, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	.confirm-box.type-warning .confirm-icon-wrap {
		background: rgba(245, 158, 11, 0.1);
		border-color: rgba(245, 158, 11, 0.2);
		color: #f59e0b;
	}

	.confirm-box.type-success {
		border-color: rgba(16, 185, 129, 0.25);
		box-shadow: 
			0 24px 64px rgba(0, 0, 0, 0.6),
			0 0 30px rgba(16, 185, 129, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	.confirm-box.type-success .confirm-icon-wrap {
		background: rgba(16, 185, 129, 0.1);
		border-color: rgba(16, 185, 129, 0.2);
		color: #10b981;
	}

	.confirm-box.type-info {
		border-color: rgba(6, 182, 212, 0.25);
		box-shadow: 
			0 24px 64px rgba(0, 0, 0, 0.6),
			0 0 30px rgba(6, 182, 212, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	.confirm-box.type-info .confirm-icon-wrap {
		background: rgba(6, 182, 212, 0.1);
		border-color: rgba(6, 182, 212, 0.2);
		color: #06b6d4;
	}

	/* Close Button */
	.confirm-close-btn {
		position: absolute;
		top: 20px;
		right: 20px;
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.3);
		cursor: pointer;
		padding: 6px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}
	.confirm-close-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		color: white;
	}

	/* Header */
	.confirm-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.confirm-icon-wrap {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 4px;
	}

	:global(.confirm-icon) {
		width: 28px !important;
		height: 28px !important;
	}

	.confirm-title {
		font-size: 22px;
		font-weight: 700;
		color: white;
		margin: 0;
		letter-spacing: -0.01em;
	}

	/* Body */
	.confirm-body {
		padding: 0 8px;
	}

	.confirm-message {
		font-size: 15px;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
	}

	/* Actions */
	.confirm-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		width: 100%;
		margin-top: 8px;
	}

	.confirm-btn-cancel {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.85);
		padding: 12px 20px;
		border-radius: 12px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.confirm-btn-cancel:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.confirm-btn-action {
		border: none;
		color: white;
		padding: 12px 20px;
		border-radius: 12px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.confirm-btn-action.type-danger {
		background: linear-gradient(135deg, #ef4444, #dc2626);
	}
	.confirm-btn-action.type-danger:hover {
		box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
		transform: translateY(-2px);
	}

	.confirm-btn-action.type-warning {
		background: linear-gradient(135deg, #f59e0b, #d97706);
	}
	.confirm-btn-action.type-warning:hover {
		box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
		transform: translateY(-2px);
	}

	.confirm-btn-action.type-success {
		background: linear-gradient(135deg, #10b981, #059669);
	}
	.confirm-btn-action.type-success:hover {
		box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
		transform: translateY(-2px);
	}

	.confirm-btn-action.type-info {
		background: linear-gradient(135deg, #06b6d4, #0891b2);
	}
	.confirm-btn-action.type-info:hover {
		box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
		transform: translateY(-2px);
	}
</style>
