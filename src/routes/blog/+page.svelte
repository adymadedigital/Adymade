<script lang="ts">
	import { Search, ArrowRight, X } from 'lucide-svelte';
	import { blogPosts as fallbackPosts, blogTags } from '$lib/data/blog';

	let { data } = $props();

	// Fallback to static blog posts if database is empty
	const blogPosts = $derived(data.blogs && data.blogs.length > 0 ? data.blogs : fallbackPosts);

	let searchQuery = $state('');
	let activeCategory = $state(data.selectedCategory || 'All Topics');
	let activeTag = $state('');

	// Update activeCategory when URL search parameter changes
	$effect(() => {
		if (data.selectedCategory) {
			activeCategory = data.selectedCategory;
		} else {
			activeCategory = 'All Topics';
		}
	});

	function matchesTag(post: any, tag: string) {
		const t = tag.toLowerCase();
		const keywords = (post.seo_keywords || '').toLowerCase();
		const title = (post.title || '').toLowerCase();
		const excerpt = (post.excerpt || '').toLowerCase();
		const category = (post.category || '').toLowerCase();
		
		if (keywords.includes(t) || title.includes(t) || excerpt.includes(t) || category.includes(t)) {
			return true;
		}
		
		// Fallbacks/synonyms to ensure the static tags work well with dynamic posts:
		if (t === 'ai agents' && (keywords.includes('ai') || title.includes('ai') || category.includes('ai'))) return true;
		if (t === 'lead gen' && (keywords.includes('lead') || title.includes('lead'))) return true;
		if (t === 'video ads' && (keywords.includes('video') || title.includes('video'))) return true;
		if (t === 'chatgpt seo' && (keywords.includes('seo') || keywords.includes('geo') || title.includes('seo') || category.includes('seo'))) return true;
		
		return false;
	}

	function toggleTag(tag: string) {
		if (activeTag === tag) {
			activeTag = '';
		} else {
			activeTag = tag;
		}
	}

	// Compute filtered posts dynamically based on search query, active category, and active tag
	const filteredPosts = $derived(
		blogPosts.filter((p) => {
			const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
				p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = activeCategory === 'All Topics' || p.category === activeCategory;
			const matchesActiveTag = !activeTag || matchesTag(p, activeTag);
			return matchesSearch && matchesCategory && matchesActiveTag;
		})
	);

	const featuredPost = $derived(blogPosts.find((p) => p.featured) ?? blogPosts[0]);
	const gridPosts = $derived(filteredPosts.filter((p) => p.slug !== (featuredPost?.slug || '')));
	const popularPosts = $derived(blogPosts.slice(0, 3));

	// Compute categories and counts dynamically
	const blogCategories = $derived([
		{ name: 'All Topics', count: blogPosts.length },
		...Object.entries(
			blogPosts.reduce((acc, p) => {
				acc[p.category] = (acc[p.category] || 0) + 1;
				return acc;
			}, {} as Record<string, number>)
		).map(([name, count]) => ({ name, count }))
	]);

	function formatDate(dateStr?: string, fallback = '') {
		if (!dateStr) return fallback;
		// If it's already in the format "Jul 6, 2026", just return it
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
	<title>Blog — Adymade</title>
	<meta
		name="description"
		content="Practical guides on AI automation, AI video production, web & software development, and search-era marketing from Adymade."
	/>
</svelte:head>

<section class="blog-hero">
	<div class="container">
		<div class="blog-hero-inner">
			<div class="eyebrow">Insights &amp; Resources</div>
			<h1>The Adymade <span class="grad">Blog</span></h1>
			<p class="blog-hero-desc">
				Practical guides on AI automation, AI video production, web &amp; software
				development, and search-era marketing — written by the team building it for
				clients across India, Saudi Arabia, UAE, UK &amp; Australia.
			</p>
		</div>
	</div>
</section>

<section class="blog-featured">
	<div class="container">
		{#if featuredPost}
			<a href="/blog/{featuredPost.slug}" class="blog-featured-card">
				<div class="blog-featured-media">
					<span class="blog-featured-tag">Featured</span>
					<img src={featuredPost.image_url || featuredPost.image} alt={featuredPost.alt_text || featuredPost.title} />
				</div>
				<div class="blog-featured-body">
					<div class="blog-featured-eyebrow">{featuredPost.category}</div>
					<h2>{featuredPost.title}</h2>
					<p class="blog-featured-excerpt">{featuredPost.excerpt}</p>
					<div class="blog-featured-meta">
						<span>{formatDate(featuredPost.created_at || featuredPost.date)}</span>
						<span>·</span>
						<span>{featuredPost.read_time || featuredPost.readTime}</span>
						<span class="blog-read-link">
							Read Article <ArrowRight size={14} />
						</span>
					</div>
				</div>
			</a>
		{/if}
	</div>
</section>

<section>
	<div class="container blog-layout">
		<div class="blog-main">
			<div class="blog-toolbar">
				<div class="blog-result-count"><strong>{blogPosts.length}</strong> articles</div>
			</div>

			<div class="blog-grid">
				{#each gridPosts as post (post.slug)}
					<a href="/blog/{post.slug}" class="blog-card">
						<div class="blog-card-media">
							<img src={post.image_url || post.image} alt={post.alt_text || post.title} />
						</div>
						<div class="blog-card-body">
							<span class="blog-card-cat">{post.category}</span>
							<h3 class="blog-card-title">{post.title}</h3>
							<p class="blog-card-excerpt">{post.excerpt}</p>
							<div class="blog-card-footer">
								<span>{formatDate(post.created_at || post.date)}</span>
								<span class="blog-read-link">Read <ArrowRight size={13} /></span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>

		<aside class="blog-sidebar">
			<div class="blog-widget blog-search">
				<h4>Search</h4>
				<div class="blog-search-input-wrapper">
					<input type="text" placeholder="Search articles…" bind:value={searchQuery} />
					{#if searchQuery}
						<button 
							type="button" 
							onclick={() => searchQuery = ''} 
							class="blog-search-clear-btn"
							title="Clear search"
						>
							<X size={14} />
						</button>
					{/if}
					<span class="blog-search-icon">
						<Search size={16} />
					</span>
				</div>
			</div>

			<div class="blog-widget">
				<h4>Categories</h4>
				<ul class="blog-cat-list">
					{#each blogCategories as cat (cat.name)}
						<li>
							<button
								type="button"
								class="blog-cat-btn"
								class:active={activeCategory === cat.name}
								onclick={() => (activeCategory = cat.name)}
							>
								<span>{cat.name}</span>
								<span class="blog-cat-count">{cat.count}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>

			<div class="blog-widget">
				<h4>Browse by Month</h4>
				<select class="blog-archive-select">
					<option>All Months</option>
					<option>July 2026</option>
					<option>June 2026</option>
					<option>May 2026</option>
					<option>April 2026</option>
				</select>
			</div>

			<div class="blog-widget">
				<h4>Popular Posts</h4>
				{#each popularPosts as post (post.slug)}
					<a href="/blog/{post.slug}" class="blog-mini-post">
						<div class="blog-mini-thumb">
							<img src={post.image_url || post.image} alt="" />
						</div>
						<div>
							<div class="blog-mini-title">{post.title}</div>
							<div class="blog-mini-date">{formatDate(post.created_at || post.date)}</div>
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
						<button 
							type="button" 
							class="blog-tag" 
							class:active={activeTag === tag}
							onclick={() => toggleTag(tag)}
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>
		</aside>
	</div>
</section>