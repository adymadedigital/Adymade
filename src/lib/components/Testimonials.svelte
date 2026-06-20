<script lang="ts">
	import { Star, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { testimonials } from '$lib/data/testimonials';

	const visibleCount = 3;
	const total = testimonials.length;

	let activeIndex = $state(0);

	function next() {
		activeIndex = (activeIndex + 1) % total;
	}
	function prev() {
		activeIndex = (activeIndex - 1 + total) % total;
	}

	const trackOffset = $derived(activeIndex * (100 / total));
</script>

<section class="section">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Client Voices</div>
			<h2>What Our Clients Say</h2>
			<p>Real words from real clients — no screenshot screenshots, no made-up names.</p>
		</div>

		<div class="testi-carousel">
			<button class="testi-nav testi-nav-prev" onclick={prev} aria-label="Previous testimonials">
				<ChevronLeft size={20} />
			</button>

			<div class="testi-viewport">
				<div
					class="testi-track"
					style="transform: translateX(-{trackOffset}%); width: {(total / visibleCount) * 100}%;"
				>
					{#each testimonials as t, i (t.name + i)}
						<div class="testi-slide" style="width: {100 / total}%;">
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
						</div>
					{/each}
				</div>
			</div>

			<button class="testi-nav testi-nav-next" onclick={next} aria-label="Next testimonials">
				<ChevronRight size={20} />
			</button>
		</div>

		<div class="testi-dots">
			{#each testimonials as _, i}
				<button
					class="testi-dot"
					class:active={i === activeIndex}
					onclick={() => (activeIndex = i)}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.testi-carousel {
		display: flex;
		align-items: stretch;
		gap: 12px;
	}

	.testi-viewport {
		overflow: hidden;
		flex: 1;
	}

	.testi-track {
		display: flex;
		transition: transform 0.4s ease;
	}

	.testi-slide {
		flex: 0 0 auto;
		padding: 0 12px;
		box-sizing: border-box;
		display: flex;
	}

	.testi-card {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.testi-quote {
		flex: 1;
	}

	.testi-nav {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--slate);
		background: var(--midnight);
		color: var(--pale);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		align-self: center;
		transition: background 0.2s ease;
	}
	.testi-nav:hover {
		background: var(--navy);
	}

	.testi-dots {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-top: 24px;
	}

	.testi-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: none;
		background: var(--slate);
		cursor: pointer;
		padding: 0;
		transition: background 0.2s ease, transform 0.2s ease;
	}
	.testi-dot.active {
		background: var(--electric);
		transform: scale(1.3);
	}

	@media (max-width: 900px) {
		.testi-slide {
			width: 50% !important;
		}
	}
	@media (max-width: 600px) {
		.testi-slide {
			width: 100% !important;
		}
	}
</style>