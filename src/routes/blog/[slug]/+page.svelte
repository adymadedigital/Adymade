<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { blogPosts as fallbackPosts, blogCategories, blogTags } from '$lib/data/blog';

	let { data } = $props();

	const post = $derived(data.post);
	const popularPosts = $derived(fallbackPosts.filter((p) => p.slug !== post?.slug).slice(0, 3));

	function formatDate(dateStr?: string, fallback = '') {
		if (!dateStr) return fallback;
		if (dateStr.includes(',') && !dateStr.includes('-') && !dateStr.includes('T')) return dateStr;
		try {
			return new Date(dateStr).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});
		} catch (e) {
			return dateStr;
		}
	}
</script>

<svelte:head>
	<title>{post ? `${post.title} — Adymade Blog` : 'Blog — Adymade'}</title>
	{#if post}
		<meta name="description" content={post.excerpt} />
	{/if}
</svelte:head>

{#if post}
	<section class="article-hero">
		<div class="container">
			<a href="/blog" class="back-link">
				<ArrowLeft size={16} />
				Back to Blog
			</a>
			<div class="article-eyebrow">{post.category}</div>
			<h1 class="article-title">{post.title}</h1>
			<div class="article-meta">
				<span>{formatDate(post.created_at || post.date)}</span>
				<span>·</span>
				<span>{post.read_time || post.readTime}</span>
			</div>
		</div>
	</section>

	<section class="article-media-section">
		<div class="container">
			<div class="article-media">
				<img src={post.image_url || post.image} alt={post.title} />
			</div>
		</div>
	</section>

	<section>
		<div class="container article-layout">
			<article class="article-body">
				{#if post.content}
					{#each post.content as paragraph}
						<p>{paragraph}</p>
					{/each}
				{:else}
					<p>{post.excerpt}</p>
				{/if}
			</article>

			<aside class="blog-sidebar">
				<div class="blog-widget">
					<h4>Categories</h4>
					<ul class="blog-cat-list">
						{#each blogCategories as cat (cat.name)}
							<li>
								<span class="blog-cat-btn">
									<span>{cat.name}</span>
									<span class="blog-cat-count">{cat.count}</span>
								</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="blog-widget">
					<h4>Popular Posts</h4>
					{#each popularPosts as p (p.slug)}
						<a href="/blog/{p.slug}" class="blog-mini-post">
							<div class="blog-mini-thumb">
								<img src={p.image_url || p.image} alt="" />
							</div>
							<div>
								<div class="blog-mini-title">{p.title}</div>
								<div class="blog-mini-date">{formatDate(p.created_at || p.date)}</div>
							</div>
						</a>
					{/each}
				</div>

				<div class="blog-widget blog-cta-widget">
					<h4>Ready to get started?</h4>
					<p>Book a free 15-minute strategy call — no commitment, reply within 2 hours.</p>
					<a href="/contact" class="btn btn-primary">Book a Free Call</a>
				</div>

				<div class="blog-widget">
					<h4>Popular Tags</h4>
					<div class="blog-tag-cloud">
						{#each blogTags as tag (tag)}
							<span class="blog-tag">{tag}</span>
						{/each}
					</div>
				</div>
			</aside>
		</div>
	</section>
{:else}
	<section class="section">
		<div class="container">
			<h1>Post not found</h1>
			<p class="blog-hero-desc">This article doesn't exist or may have been moved.</p>
			<a href="/blog" class="btn btn-primary" style="margin-top: 24px;">
				<ArrowLeft size={16} />
				Back to Blog
			</a>
		</div>
	</section>
{/if}