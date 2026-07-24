<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let galleryVideos = $derived(data.galleryVideos);
	let galleryPosts = $derived(data.galleryPosts);

	type Tab = 'all' | 'videos' | 'posts';

	let activeTab = $state<Tab>('all');

	const tabs: { key: Tab; label: string }[] = [
		{ key: 'all', label: 'All' },
		{ key: 'videos', label: 'Videos' },
		{ key: 'posts', label: 'Posts' }
	];

	let showVideos = $derived(activeTab === 'all' || activeTab === 'videos');
	let showPosts = $derived(activeTab === 'all' || activeTab === 'posts');

	// Jab bhi koi video play ho, baaki saare video tags (chahe videos section ho
	// ya posts section) pause ho jaane chahiye — sirf ek hi video ek time pe chale.
	function handleVideoPlay(e: Event) {
		const playedVideo = e.currentTarget as HTMLVideoElement;
		document.querySelectorAll('video').forEach((v) => {
			if (v !== playedVideo && !v.paused) {
				v.pause();
			}
		});
	}
</script>

<svelte:head>
	<title>Gallery | Adymade</title>
	<meta name="description" content="Explore Adymade's gallery — AI videos, creatives, and social media work delivered for clients across India, Saudi Arabia, UAE, UK and Australia." />
</svelte:head>

<main>
	<!-- GALLERY HERO -->
	<section class="gallery-hero">
		<div class="container">
			<div class="gallery-hero-inner">
				<div class="eyebrow" style="justify-content:center;">Our Gallery</div>
				<h1>A Look At What<br /><span class="grad">We've Created</span></h1>
				<p class="gallery-hero-desc">
					A running collection of the videos and social media work we've shipped for
					clients — from AI-generated explainers to campaign creatives.
				</p>
			</div>
		</div>
	</section>

	<!-- FILTER TABS -->
	<section class="gallery-filters">
		<div class="container">
			<div class="filter-tabs">
				{#each tabs as tab (tab.key)}
					<button
						class="tab-btn"
						class:active={activeTab === tab.key}
						onclick={() => (activeTab = tab.key)}
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- VIDEOS -->
	{#if showVideos}
		<section class="section">
			<div class="container">
				<div class="section-header">
					<div class="eyebrow" style="justify-content:center;">Videos</div>
					<h2>AI & Creative Videos</h2>
					<p>Explainers, product videos, and compliance training content we've produced.</p>
				</div>

				{#if galleryVideos.length === 0}
					<div class="gallery-empty">
						<p>Videos are coming soon — check back shortly.</p>
					</div>
				{:else}
					<div class="gallery-grid">
						{#each galleryVideos as video (video.id)}
							<div class="gallery-card gallery-card-video">
								<div class="gallery-card-media">
									<video controls preload="metadata" poster={video.poster} onplay={handleVideoPlay}>
										<source src={video.videoSrc} type="video/mp4" />
										Your browser doesn't support video playback.
									</video>
								</div>
								<div class="gallery-card-title">{video.title}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- POSTS -->
	{#if showPosts}
		<section class="section section-alt">
			<div class="container">
				<div class="section-header">
					<div class="eyebrow" style="justify-content:center;">Posts</div>
					<h2>Social Media Posts</h2>
					<p>A snapshot of the creatives and campaigns we've designed for clients' social channels.</p>
				</div>

				{#if galleryPosts.length === 0}
					<div class="gallery-empty">
						<p>Posts are coming soon — check back shortly.</p>
					</div>
				{:else}
					<div class="gallery-grid">
						{#each galleryPosts as post (post.id)}
							<div class="gallery-card">
								<div class="gallery-card-media">
									{#if post.type === 'video'}
										<video controls preload="metadata" onplay={handleVideoPlay}>
											<source src={post.videoSrc} type="video/mp4" />
											Your browser doesn't support video playback.
										</video>
									{:else}
										<img src={post.image} alt={post.title} />
									{/if}
								</div>
								<div class="gallery-card-title">{post.title}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- FINAL CTA -->
	<section class="cta-section">
		<div class="container cta-inner">
			<h2>Want Content Like This For Your Brand?</h2>
			<p>Book a free 15-minute strategy call — no commitment, reply within 2 hours, IST/GST/GMT compatible.</p>
			<div class="cta-btns">
				<a href="https://calendly.com/addymade/15-minute-consultation-call" class="cta-btn-primary" target="_blank" rel="noopener">Book a Free Call →</a>
				<a href="https://api.whatsapp.com/send?phone=919826886021&text=Hello%2C%20I%20have%20just%20visited%20your%20website%20and%20wanted%20to%20connect%20for%20further%20discussion.%20" class="cta-btn-ghost" target="_blank" rel="noopener">Get in Touch</a>
			</div>
			<p class="cta-micro">Trusted by 150+ businesses across India, Saudi Arabia, UAE, UK & Australia</p>
		</div>
	</section>
</main>

<style>
	.gallery-hero {
		padding: 150px 0 60px;
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	.gallery-hero::before {
		content: '';
		position: absolute;
		top: -25%;
		left: 50%;
		transform: translateX(-50%);
		width: 70vw;
		height: 50vw;
		max-width: 820px;
		max-height: 600px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(90, 20, 240, 0.16) 0%, transparent 65%);
		pointer-events: none;
	}
	.gallery-hero-inner {
		max-width: 780px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}
	.gallery-hero-inner h1 {
		margin-bottom: 22px;
		font-size: clamp(26px, 4vw, 54px);
	}
	.gallery-hero-desc {
		font-size: clamp(15px, 1.6vw, 19px);
		color: var(--color-body-text);
		line-height: 1.75;
		max-width: 620px;
		margin: 0 auto;
	}

	.gallery-filters {
		padding-bottom: 20px;
	}
	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.tab-btn {
		padding: 10px 26px;
		border-radius: 999px;
		border: 1px solid var(--color-slate);
		background: var(--color-midnight);
		color: var(--color-body-text);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.25s ease;
	}
	.tab-btn:hover {
		border-color: rgba(90, 20, 240, 0.55);
		color: #fff;
	}
	.tab-btn.active {
		background: linear-gradient(135deg, #320082, #5a14f0);
		border-color: transparent;
		color: #fff;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 22px;
	}
	@media (min-width: 640px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 980px) {
		.gallery-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.gallery-card {
		display: block;
		background: var(--color-midnight);
		border: 1px solid var(--color-slate);
		border-radius: var(--radius-md);
		overflow: hidden;
		text-decoration: none;
		transition: all 0.28s ease;
	}
	.gallery-card:hover {
		border-color: rgba(90, 20, 240, 0.55);
		transform: translateY(-5px);
		box-shadow: 0 20px 40px -18px rgba(90, 20, 240, 0.28);
	}
	.gallery-card-media {
		aspect-ratio: 4 / 3;
		background: rgba(255, 255, 255, 0.03);
		overflow: hidden;
	}
	.gallery-card-media img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: #0a0a14;
	}
	.gallery-card-media video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.gallery-card-title {
		padding: 16px 18px;
		font-size: 14px;
		font-weight: 600;
		color: #fff;
	}

	.gallery-empty {
		padding: 60px 24px;
		text-align: center;
		border: 1px dashed var(--color-slate);
		border-radius: var(--radius-lg);
		color: var(--color-body-text);
		font-size: 15px;
	}
</style>