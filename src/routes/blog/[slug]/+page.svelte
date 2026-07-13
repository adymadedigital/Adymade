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

	function getParsedContent(content: any) {
		if (!content) return [];
		let parsed = content;
		
		// If the entire content column is returned as a stringified JSON array
		if (typeof parsed === 'string') {
			try {
				const trimmed = parsed.trim();
				if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
					parsed = JSON.parse(trimmed);
				} else {
					return [parsed];
				}
			} catch (e) {
				return [parsed];
			}
		}

		if (Array.isArray(parsed)) {
			return parsed.map((block) => {
				// If individual blocks are stringified JSON strings (e.g. from text array driver issues)
				if (typeof block === 'string') {
					try {
						const trimmed = block.trim();
						if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
							return JSON.parse(trimmed);
						}
					} catch (e) {}
				}
				return block;
			});
		}
		
		return [];
	}

	const contentBlocks = $derived(getParsedContent(post?.content));
</script>

<svelte:head>
	{#if post}
		<title>{post.seo_title || `${post.title} — Adymade Blog`}</title>
		<meta name="description" content={post.seo_description || post.excerpt} />
		<link rel="canonical" href="https://adymade.com/blog/{post.slug}" />
		{#if post.seo_keywords}
			<meta name="keywords" content={post.seo_keywords} />
		{/if}
		
		<!-- Open Graph Meta Tags -->
		<meta property="og:title" content={post.seo_title || post.title} />
		<meta property="og:description" content={post.seo_description || post.excerpt} />
		<meta property="og:image" content={post.image_url || post.image} />
		<meta property="og:url" content="https://adymade.com/blog/{post.slug}" />
		<meta property="og:type" content="article" />
		<meta property="og:site_name" content="Adymade" />
		<meta property="article:published_time" content={post.created_at || post.date} />
		{#if post.author_name}
			<meta property="article:author" content={post.author_name} />
		{/if}

		<!-- Twitter Card Meta Tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={post.seo_title || post.title} />
		<meta name="twitter:description" content={post.seo_description || post.excerpt} />
		<meta name="twitter:image" content={post.image_url || post.image} />

		<!-- Schema.org JSON-LD Structured Data -->
		{@html `<script type="application/ld+json">${JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": post.title,
			"description": post.seo_description || post.excerpt,
			"image": [post.image_url || post.image],
			"datePublished": post.created_at || post.date,
			"dateModified": post.updated_at || post.created_at || post.date,
			"author": {
				"@type": "Person",
				"name": post.author_name || "Adymade Team"
			},
			"publisher": {
				"@type": "Organization",
				"name": "Adymade",
				"logo": {
					"@type": "ImageObject",
					"url": "https://adymade.com/logo.png"
				}
			},
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": `https://adymade.com/blog/${post.slug}`
			}
		})}</script>`}
	{:else}
		<title>Blog — Adymade</title>
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
				{#if post.author_name}
					<span>By {post.author_name}</span>
					<span>·</span>
				{/if}
				<span>{formatDate(post.created_at || post.date)}</span>
				<span>·</span>
				<span>{post.read_time || post.readTime}</span>
			</div>
		</div>
	</section>

	<section class="article-media-section">
		<div class="container">
			<div class="article-media">
				<img src={post.image_url || post.image} alt={post.alt_text || post.title} />
			</div>
		</div>
	</section>

	<section>
		<div class="container article-layout">
			<article class="article-body">
				{#if contentBlocks && contentBlocks.length > 0}
					{#each contentBlocks as block}
						{#if typeof block === 'string'}
							<p>{block}</p>
						{:else if block && typeof block === 'object'}
							{#if block.type === 'paragraph'}
								<p>{block.text}</p>
							{:else if block.type === 'heading'}
								{#if block.level === 1}
									<h1 style="color: white; margin-top: 32px; margin-bottom: 16px; font-size: 32px; font-weight: 700;">{block.text}</h1>
								{:else if block.level === 2}
									<h2 style="color: white; margin-top: 28px; margin-bottom: 14px; font-size: 26px; font-weight: 600;">{block.text}</h2>
								{:else if block.level === 3}
									<h3 style="color: white; margin-top: 24px; margin-bottom: 12px; font-size: 22px; font-weight: 600;">{block.text}</h3>
								{:else if block.level === 4}
									<h4 style="color: white; margin-top: 20px; margin-bottom: 10px; font-size: 18px; font-weight: 600;">{block.text}</h4>
								{/if}
							{:else if block.type === 'image'}
								<div class="article-body-image" style="margin: 32px 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
									<img src={block.url} alt={block.caption || ''} style="width: 100%; height: auto;" />
									{#if block.caption}
										<p style="font-size: 14px; color: var(--color-muted); text-align: center; margin-top: 8px; font-style: italic;">{block.caption}</p>
									{/if}
								</div>
							{:else if block.type === 'newline'}
								<div style="height: 24px;"></div>
							{/if}
						{/if}
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