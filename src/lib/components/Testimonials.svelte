<script lang="ts">
	import { Star } from 'lucide-svelte';
	import { testimonials } from '$lib/data/testimonials';

	// Duplicate the list so the CSS animation can loop seamlessly (0% -> -50%)
	const loopList = [...testimonials, ...testimonials];

	let isPaused = $state(false);
</script>

<section class="section">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Client Voices</div>
			<h2>What Our Clients Say</h2>
			<p>Real words from real clients — no screenshot screenshots, no made-up names.</p>
		</div>
	</div>

	<div
		class="testi-marquee-wrap"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}
	>
		<div class="testi-marquee-track" class:paused={isPaused}>
			{#each loopList as t, i (t.name + i)}
				<div class="testi-card">
					<div class="stars">
						{#each Array(5) as _}
							<Star size={18} fill="currentColor" />
						{/each}
					</div>

					<p class="testi-quote">{t.quote}</p>

					<div class="testi-author">
						<div
							class="t-avatar"
							style={t.avatarGradient
								? `background:${t.avatarGradient}`
								: 'background:linear-gradient(135deg,#320082,#5a14f0)'}
						>
							{t.initials}
						</div>

						<div>
							<div class="t-name">{t.name}</div>
							<div class="t-role">{t.role}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.testi-marquee-wrap {
		overflow: hidden;
		width: 100%;
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 5%,
			black 95%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 5%,
			black 95%,
			transparent 100%
		);
	}

	.testi-marquee-track {
		display: flex;
		width: max-content;
		gap: 22px;
		animation: testi-scroll 40s linear infinite;
	}

	.testi-marquee-track.paused {
		animation-play-state: paused;
	}

	@keyframes testi-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.testi-card {
		flex: 0 0 auto;
		width: 340px;
		background: var(--theme-card-bg);
		border: 1px solid var(--theme-card-border);
		border-radius: var(--radius-md);
		padding: 30px;
		display: flex;
		flex-direction: column;
		transition: border-color 0.25s;
	}

	.testi-card:hover {
		border-color: var(--theme-border-hover);
	}

	.stars {
		display: flex;
		gap: 3px;
		margin-bottom: 18px;
		color: var(--color-cyan);
	}

	.testi-quote {
		font-size: 15px;
		line-height: 1.75;
		color: var(--theme-text);
		margin-bottom: 24px;
		flex: 1;
		font-style: italic;
	}

	.testi-quote::before {
		content: '"';
		color: var(--color-electric);
		font-size: 24px;
		line-height: 0;
		vertical-align: -8px;
		margin-right: 4px;
		font-style: normal;
	}

	.testi-author {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-top: 18px;
		border-top: 1px solid var(--theme-card-border);
	}

	.t-avatar {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		font-weight: 700;
		color: white;
		flex-shrink: 0;
	}

	.t-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--theme-heading);
		margin-bottom: 2px;
	}
	.t-role {
		font-size: 12px;
		color: var(--theme-text-muted);
	}

	@media (max-width: 600px) {
		.testi-card {
			width: 280px;
		}
	}
</style>