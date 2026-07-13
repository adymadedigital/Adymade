<script lang="ts">
	import { Search, ArrowRight } from 'lucide-svelte';
	import { blogPosts, blogCategories, blogTags } from '$lib/data/blog';

	let searchQuery = $state('');
	let activeCategory = $state('All Topics');

	const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];
	const gridPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);
	const popularPosts = blogPosts.slice(0, 3);
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
		<a href="/blog/{featuredPost.slug}" class="blog-featured-card">
			<div class="blog-featured-media">
				<span class="blog-featured-tag">Featured</span>
				<img src={featuredPost.image} alt={featuredPost.title} />
			</div>
			<div class="blog-featured-body">
				<div class="blog-featured-eyebrow">{featuredPost.category}</div>
				<h2>{featuredPost.title}</h2>
				<p class="blog-featured-excerpt">{featuredPost.excerpt}</p>
				<div class="blog-featured-meta">
					<span>{featuredPost.date}</span>
					<span>·</span>
					<span>{featuredPost.readTime}</span>
					<span class="blog-read-link">
						Read Article <ArrowRight size={14} />
					</span>
				</div>
			</div>
		</a>
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
							<img src={post.image} alt={post.title} />
						</div>
						<div class="blog-card-body">
							<span class="blog-card-cat">{post.category}</span>
							<h3 class="blog-card-title">{post.title}</h3>
							<p class="blog-card-excerpt">{post.excerpt}</p>
							<div class="blog-card-footer">
								<span>{post.date}</span>
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
				<input type="text" placeholder="Search articles…" bind:value={searchQuery} />
				<span class="blog-search-icon">
					<Search size={16} />
				</span>
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
							<img src={post.image} alt="" />
						</div>
						<div>
							<div class="blog-mini-title">{post.title}</div>
							<div class="blog-mini-date">{post.date}</div>
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