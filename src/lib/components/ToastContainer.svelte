<script lang="ts">
	import { uiState } from '$lib/state/ui.svelte';
	import { fly, fade } from 'svelte/transition';
	import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-svelte';
</script>

<div class="toast-container">
	{#each uiState.toasts as toast (toast.id)}
		<div
			class="toast-item toast-{toast.type}"
			in:fly={{ x: 300, duration: 400, opacity: 0 }}
			out:fade={{ duration: 200 }}
		>
			<div class="toast-icon-wrap">
				{#if toast.type === 'success'}
					<CheckCircle2 class="toast-icon" />
				{:else if toast.type === 'warning'}
					<AlertTriangle class="toast-icon" />
				{:else if toast.type === 'error'}
					<AlertCircle class="toast-icon" />
				{:else}
					<Info class="toast-icon" />
				{/if}
			</div>

			<div class="toast-content">
				<p class="toast-message">{toast.message}</p>
			</div>

			<button
				class="toast-close"
				onclick={() => uiState.removeToast(toast.id)}
				aria-label="Dismiss notification"
			>
				<X size={16} />
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 24px;
		right: 24px;
		z-index: 999999;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 400px;
		width: calc(100% - 48px);
		pointer-events: none;
	}

	.toast-item {
		pointer-events: auto;
		display: flex;
		align-items: flex-start;
		gap: 14px;
		padding: 16px;
		border-radius: 16px;
		background: rgba(10, 8, 30, 0.75);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.4), 
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
		color: white;
		position: relative;
		overflow: hidden;
		transition: border-color 0.3s ease;
	}

	/* Liquid Glass Accents based on type */
	.toast-success {
		border-color: rgba(16, 185, 129, 0.35);
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.4),
			0 0 15px rgba(16, 185, 129, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}


	.toast-warning {
		border-color: rgba(245, 158, 11, 0.35);
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.4),
			0 0 15px rgba(245, 158, 11, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	

	.toast-error {
		border-color: rgba(239, 68, 68, 0.35);
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.4),
			0 0 15px rgba(239, 68, 68, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	

	.toast-info {
		border-color: rgba(6, 182, 212, 0.35);
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.4),
			0 0 15px rgba(6, 182, 212, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
	

	/* Layout & contents */
	.toast-icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 2px;
	}
	
	:global(.toast-icon) {
		width: 20px !important;
		height: 20px !important;
	}

	.toast-content {
		flex: 1;
		min-width: 0;
		padding-right: 12px;
	}

	.toast-message {
		font-size: 14px;
		line-height: 1.5;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.95);
		margin: 0;
		word-break: break-word;
	}

	.toast-close {
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		padding: 4px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.2s ease;
		margin-top: -2px;
		margin-right: -4px;
	}

	.toast-close:hover {
		background: rgba(255, 255, 255, 0.08);
		color: white;
	}
</style>
