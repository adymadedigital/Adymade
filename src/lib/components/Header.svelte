<script lang="ts">
	import {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2, TrendingUp, Search, Sparkles,
		ChevronDown, MessageCircle, X, Menu
	} from 'lucide-svelte';
	import { navLinks } from '$lib/data/navigation';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	// Lucide icon map — all icons used in nav dropdowns
	const iconMap: Record<string, any> = {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2, TrendingUp, Search, Sparkles
	};

	let servicesOpen   = $state(false);
	let mobileOpen     = $state(false);
	let mobileServicesOpen   = $state(false);

	// Close-delay timer — give the cursor time to travel into the dropdown
	let servicesTimer: ReturnType<typeof setTimeout> | null = null;

	function openServices() {
		if (servicesTimer) { clearTimeout(servicesTimer); servicesTimer = null; }
		servicesOpen = true;
	}
	function closeServices() {
		servicesTimer = setTimeout(() => { servicesOpen = false; }, 400);
	}

	function toggleMobile() {
		mobileOpen = !mobileOpen;
		if (!mobileOpen) {
			mobileServicesOpen   = false;
		}
	}
</script>

<header>
	<div class="container">
		<nav class="nav-inner">
			<!-- Logo -->
			<a href="/" class="logo-wrap">
				<img src="/logos/adymade.png" alt="adymade Logo" class="logo-icon"/>
				<div class="logo-text-group">
				    <span class="logo-text">adymade</span>
				    <span class="logo-subtext">Digital LLP</span>
				</div>
			</a>

			<!-- Desktop Nav -->
			<ul class="nav-links">
				<!-- Services Mega-Menu -->
				<li
					class="has-dropdown"
					onmouseenter={openServices}
					onmouseleave={closeServices}
				>
					<a href="/services" class="nav-btn" onclick={() => { if (window.innerWidth <= 1024) { servicesOpen = !servicesOpen; return false; } }} aria-expanded={servicesOpen}>
						Services
						<span class="chev" class:rotated={servicesOpen}>
							<ChevronDown size={14} />
						</span>
					</a>

					<div class="dropdown mega-dropdown" class:open={servicesOpen} onmouseenter={openServices} onmouseleave={closeServices}>
						<div class="dd-col">
							<h5>AI &amp; Automation</h5>
							<ul>
								<li><a href="/ai-automation">    <span class="dd-icon"><Bot size={15} /></span>AI Automation &amp; Agents</a></li>
								<li><a href="/ai-videos">         <span class="dd-icon"><Clapperboard size={15} /></span>AI Videos &amp; Creatives</a></li>
								<li><a href="/compliance-videos"> <span class="dd-icon"><ClipboardCheck size={15} /></span>Compliance Videos</a></li>
								<li><a href="/geo">               <span class="dd-icon"><Sparkles size={15} /></span>GEO — AI Search Ranking</a></li>
							</ul>
						</div>
						<div class="dd-col">
							<h5>Development</h5>
							<ul>
								<li><a href="/web-development">      <span class="dd-icon"><Globe size={15} /></span>Web &amp; App Development</a></li>
								<li><a href="/software-development">  <span class="dd-icon"><Settings2 size={15} /></span>Custom Software</a></li>
							</ul>
							<h5 style="margin-top:20px">Marketing</h5>
							<ul>
								<li><a href="/digital-marketing">     <span class="dd-icon"><TrendingUp size={15} /></span>Digital Marketing</a></li>
								<li><a href="/digital-marketing#seo"> <span class="dd-icon"><Search size={15} /></span>SEO Services</a></li>
							</ul>
						</div>
					</div>
				</li>

				<li><a href="/case-studies">Case Studies</a></li>
				<li><a href="/gallery">Gallery</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/blog">Blog</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>

			<!-- Nav Actions -->
			<div class="nav-actions">
				<!-- <a href="https://wa.link/u03r6i" class="wa-nav" aria-label="WhatsApp" target="_blank" rel="noopener">
					<MessageCircle size={20} />
				</a> -->
				<a href="https://calendly.com/addymade/15-minute-consultation-call" class="nav-cta" target="_blank" rel="noopener">
					Book a Call
				</a>
				<ThemeSwitcher />
				<button class="mob-menu-btn" onclick={toggleMobile} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
					{#if mobileOpen}
						<X size={22} />
					{:else}
						<Menu size={22} />
					{/if}
				</button>
			</div>
		</nav>
	</div>

	<!-- Mobile Menu -->
	{#if mobileOpen}
		<div class="mobile-menu">
			<!-- Services -->
			<div class="mob-item">
				<button class="mob-section-btn" onclick={() => (mobileServicesOpen = !mobileServicesOpen)}>
					Services
					<span class="chev" class:rotated={mobileServicesOpen}><ChevronDown size={16} /></span>
				</button>
				{#if mobileServicesOpen}
					<div class="mob-submenu">
						<a href="/ai-automation"       onclick={() => (mobileOpen = false)}><span class="mob-icon"><Bot size={14} /></span>AI Automation &amp; Agents</a>
						<a href="/ai-videos"            onclick={() => (mobileOpen = false)}><span class="mob-icon"><Clapperboard size={14} /></span>AI Videos &amp; Creatives</a>
						<a href="/compliance-videos"    onclick={() => (mobileOpen = false)}><span class="mob-icon"><ClipboardCheck size={14} /></span>Compliance Videos</a>
						<a href="/web-development"      onclick={() => (mobileOpen = false)}><span class="mob-icon"><Globe size={14} /></span>Web &amp; App Development</a>
						<a href="/software-development" onclick={() => (mobileOpen = false)}><span class="mob-icon"><Settings2 size={14} /></span>Custom Software</a>
						<a href="/digital-marketing"    onclick={() => (mobileOpen = false)}><span class="mob-icon"><TrendingUp size={14} /></span>Digital Marketing</a>
						<a href="/digital-marketing#seo"onclick={() => (mobileOpen = false)}><span class="mob-icon"><Search size={14} /></span>SEO Services</a>
						<a href="/geo"                  onclick={() => (mobileOpen = false)}><span class="mob-icon"><Sparkles size={14} /></span>GEO Services</a>
					</div>
				{/if}
			</div>

			<a href="/case-studies" class="mob-link" onclick={() => (mobileOpen = false)}>Our Work</a>
			<a href="/gallery"      class="mob-link" onclick={() => (mobileOpen = false)}>Gallery</a>
			<a href="/about"        class="mob-link" onclick={() => (mobileOpen = false)}>About</a>
			<a href="/blog"         class="mob-link" onclick={() => (mobileOpen = false)}>Blog</a>
			<a href="/contact"      class="mob-link" onclick={() => (mobileOpen = false)}>Contact</a>

			<div class="mob-ctas">
				<div class="mob-theme-row">
					<span style="font-size: 14px; font-weight: 500; color: var(--theme-text-secondary);">Theme Mode</span>
					<ThemeSwitcher />
				</div>
				<a href="https://wa.link/u03r6i" class="btn btn-wa" target="_blank" rel="noopener">
					<MessageCircle size={18} /> WhatsApp Us
				</a>
				<a href="https://calendly.com/addymade/15-minute-consultation-call" class="btn btn-primary" target="_blank" rel="noopener">
					Book a Free Call
				</a>
			</div>
		</div>
	{/if}
</header>