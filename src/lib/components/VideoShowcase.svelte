<script lang="ts">
	import { Play } from 'lucide-svelte';

	type VideoItem = {
		videoId: string;
		title: string;
		description: string;
	};

	let { videos }: { videos: VideoItem[] } = $props();

	// Track which video is currently playing (by videoId), null = none playing
	let playingId = $state<string | null>(null);
</script>

<div class="cv-category">
	<div class="cv-section-header">
		<h2>See Our Work in Action</h2>
		<p>Real compliance training videos we've produced for clients.</p>
	</div>

	<div class="cv-video-grid">
		{#each videos as video (video.videoId)}
			<div class="glass-card cv-video-card">
				<div class="cv-video-wrapper">
					{#if playingId === video.videoId}
						<iframe
							src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
							title={video.title}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					{:else}
						<button
							class="cv-video-thumb"
							onclick={() => (playingId = video.videoId)}
							aria-label={`Play ${video.title}`}
						>
							<img
								src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
								alt={video.title}
								loading="lazy"
							/>
							<span class="cv-play-icon"><Play size={26} fill="white" /></span>
						</button>
					{/if}
				</div>
				<div class="cv-video-info">
					<h3>{video.title}</h3>
					<p>{video.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.cv-category {
		margin-bottom: 100px;
	}

	.cv-section-header {
		margin-bottom: 40px;
	}

    .cv-section-header h2 {
		margin-bottom: 16px;
	}

	.cv-video-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}

	@media (min-width: 768px) {
		.cv-video-grid { grid-template-columns: 1fr 1fr; }
	}

	.cv-video-card {
		padding: 0 !important;
		overflow: hidden;
	}

	.cv-video-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #000;
	}

	.cv-video-wrapper iframe {
		width: 100%;
		height: 100%;
		border: none;
		position: absolute;
		inset: 0;
	}

	.cv-video-thumb {
		position: relative;
		width: 100%;
		height: 100%;
		border: none;
		padding: 0;
		cursor: pointer;
		display: block;
	}

	.cv-video-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.cv-play-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 64px;
		height: 64px;
		background: rgba(6,182,212,0.85);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.cv-video-thumb:hover .cv-play-icon {
		transform: translate(-50%, -50%) scale(1.1);
		background: rgba(6,182,212,1);
	}

	.cv-video-info {
		padding: 20px 24px;
	}

	.cv-video-info h3 {
		font-size: 18px;
		font-weight: 700;
		color: white;
		margin-bottom: 6px;
	}

	.cv-video-info p {
		font-size: 14px;
		color: rgba(255,255,255,0.6);
		line-height: 1.5;
	}
</style>