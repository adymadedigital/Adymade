<script lang="ts">
	import '../app.css';
	import { seo, localBusinessSchema, buildFaqSchema } from '$lib/config/seo';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
	// import { injectAnalytics } from '@vercel/analytics/sveltekit';

	// injectAnalytics({ mode: dev ? 'development' : 'production' });

	const { children } = $props();

	const faqSchema = buildFaqSchema();

	// Check if current route is an admin or login page
	let isPublicPage = $derived(!$page.url.pathname.startsWith('/dashboard') && !$page.url.pathname.startsWith('/login'));
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />

	<!-- Open Graph -->
	<meta property="og:title" content={seo.og.title} />
	<meta property="og:description" content={seo.og.description} />
	<meta property="og:type" content={seo.og.type} />
	<meta property="og:url" content={seo.og.url} />

	<!-- Canonical -->
	<link rel="canonical" href="https://www.adymade.com" />

	<!-- JSON-LD: LocalBusiness -->
	{@html `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`}

	<!-- JSON-LD: FAQPage — dynamically generated from faqItems array (same as FAQ.svelte accordion) -->
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

{#if isPublicPage}
	<Header />
{/if}

{@render children()}

{#if isPublicPage}
	<Footer />
	<WhatsAppFloat />
{/if}
