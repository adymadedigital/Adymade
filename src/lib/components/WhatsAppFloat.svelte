<script lang="ts">
	import { MessageCircle, X, Send } from 'lucide-svelte';

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

{#if isOpen}
	<div class="chat-panel">
		<div class="chat-panel-header">
			<div>
				<div class="chat-panel-title">Let's Chat!</div>
				<div class="chat-panel-status">
					<span class="status-dot"></span> We'll reply as soon as we can
				</div>
			</div>
			<button class="chat-panel-close" onclick={toggle} aria-label="Close chat">
				<X size={18} />
			</button>
		</div>

		<div class="chat-panel-body">
			<div class="chat-bubble">
				<div class="chat-bubble-sender">Adymade</div>
				<div class="chat-bubble-text">
					Hi there 👋! Welcome to Adymade Digital LLP. Let me know how can we help you.
				</div>
			</div>
		</div>

		<a
			href="https://wa.me/919826886021"
			class="chat-panel-cta"
			target="_blank"
			rel="noopener"
		>
			<Send size={16} /> Continue on WhatsApp
		</a>
	</div>
{/if}

<button class="wa-float" aria-label="Open chat" title="Chat with us" onclick={toggle}>
	{#if isOpen}
		<X size={26} />
	{:else}
		<MessageCircle size={28} />
	{/if}
</button>

<style>
	.wa-float {
		position: fixed;
		bottom: 28px;
		right: 28px;
		width: 58px;
		height: 58px;
		background: #25d366;
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		z-index: 300;
		box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
		transition: all 0.22s;
		cursor: pointer;
	}

	.wa-float:hover {
		transform: scale(1.1);
		box-shadow: 0 12px 32px rgba(37, 211, 102, 0.5);
	}

	.chat-panel {
		position: fixed;
		bottom: 98px;
		right: 28px;
		width: 320px;
		max-width: calc(100vw - 40px);
		background: var(--color-midnight, #1a1440);
		border: 1px solid var(--color-slate, #362870);
		border-radius: 18px;
		box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.6);
		z-index: 300;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: chat-pop-in 0.22s ease;
	}

	@keyframes chat-pop-in {
		from {
			opacity: 0;
			transform: translateY(12px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.chat-panel-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 18px 18px 14px;
		background: linear-gradient(135deg, #320082, #5a14f0);
	}

	.chat-panel-title {
		font-size: 16px;
		font-weight: 700;
		color: #fff;
		margin-bottom: 6px;
	}

	.chat-panel-status {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.85);
	}

	.status-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #4ade80;
		flex-shrink: 0;
	}

	.chat-panel-close {
		background: rgba(255, 255, 255, 0.12);
		border: none;
		border-radius: 50%;
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.18s;
	}

	.chat-panel-close:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.chat-panel-body {
		padding: 18px;
		background: repeating-linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.015) 0px,
			rgba(255, 255, 255, 0.015) 1px,
			transparent 1px,
			transparent 12px
		);
	}

	.chat-bubble {
		background: #fff;
		border-radius: 12px;
		padding: 12px 14px;
		max-width: 90%;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.chat-bubble-sender {
		font-size: 12px;
		font-weight: 700;
		color: var(--color-electric, #5a14f0);
		margin-bottom: 4px;
	}

	.chat-bubble-text {
		font-size: 13px;
		color: #1a1440;
		line-height: 1.5;
	}

	.chat-panel-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin: 0 18px 18px;
		padding: 12px;
		background: #25d366;
		color: #fff;
		font-size: 14px;
		font-weight: 600;
		border-radius: 10px;
		text-decoration: none;
		transition: background 0.2s;
	}

	.chat-panel-cta:hover {
		background: #1da851;
	}
</style>