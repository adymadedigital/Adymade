<script lang="ts">
	import {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2, TrendingUp, Search, Sparkles,
		HardHat, HeartPulse, ShoppingCart, Lightbulb,
		ChevronDown, MessageCircle, X, Menu
	} from 'lucide-svelte';
	import { navLinks } from '$lib/data/navigation';

	// Lucide icon map — all icons used in nav dropdowns
	const iconMap: Record<string, any> = {
		Bot, Clapperboard, ClipboardCheck, Globe, Settings2, TrendingUp, Search, Sparkles,
		HardHat, HeartPulse, ShoppingCart, Lightbulb
	};

	let servicesOpen   = $state(false);
	let industriesOpen = $state(false);
	let mobileOpen     = $state(false);
	let mobileServicesOpen   = $state(false);
	let mobileIndustriesOpen = $state(false);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
		if (!mobileOpen) {
			mobileServicesOpen   = false;
			mobileIndustriesOpen = false;
		}
	}
</script>

<header>
	<div class="container">
		<nav class="nav-inner">
			<!-- Logo -->
			<a href="/" class="logo-wrap">
				<div class="logo-icon">A</div>
				<span class="logo-text">adymade</span>
			</a>

			<!-- Desktop Nav -->
			<ul class="nav-links">
				<!-- Services Mega-Menu -->
				<li
					class="has-dropdown"
					onmouseenter={() => (servicesOpen = true)}
					onmouseleave={() => (servicesOpen = false)}
				>
					<button class="nav-btn" onclick={() => (servicesOpen = !servicesOpen)} aria-expanded={servicesOpen}>
						Services
						<span class="chev" class:rotated={servicesOpen}>
							<ChevronDown size={14} />
						</span>
					</button>

					<div class="dropdown mega-dropdown" class:open={servicesOpen}>
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
						<div class="dd-col dd-featured">
							<h5>GCC Expertise</h5>
							<div class="dd-featured-content">
								<div class="dd-featured-title">🇸🇦 RGS — Tamimi Group</div>
								<div class="dd-featured-desc">Website built for a Tamimi Group scaffolding company in Saudi Arabia</div>
							</div>
							<a href="/case-studies/rgs-saudi-arabia" class="dd-featured-link">View case study →</a>
						</div>
					</div>
				</li>

				<!-- Industries Dropdown -->
				<li
					class="has-dropdown"
					onmouseenter={() => (industriesOpen = true)}
					onmouseleave={() => (industriesOpen = false)}
				>
					<button class="nav-btn" onclick={() => (industriesOpen = !industriesOpen)} aria-expanded={industriesOpen}>
						Industries
						<span class="chev" class:rotated={industriesOpen}>
							<ChevronDown size={14} />
						</span>
					</button>

					<div class="dropdown dropdown-sm" class:open={industriesOpen}>
						<div class="dd-col">
							<h5>By Industry</h5>
							<ul>
								<li><a href="/industries/construction"><span class="dd-icon"><HardHat size={15} /></span>Construction &amp; Scaffolding</a></li>
								<li><a href="/industries/healthcare">  <span class="dd-icon"><HeartPulse size={15} /></span>Healthcare &amp; Clinics</a></li>
							</ul>
						</div>
						<div class="dd-col dd-col-offset">
							<ul>
								<li><a href="/industries/ecommerce"><span class="dd-icon"><ShoppingCart size={15} /></span>E-commerce</a></li>
								<li><a href="/industries/saas">     <span class="dd-icon"><Lightbulb size={15} /></span>SaaS &amp; Tech</a></li>
							</ul>
						</div>
					</div>
				</li>

				<li><a href="/case-studies">Our Work</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/blog">Blog</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>

			<!-- Nav Actions -->
			<div class="nav-actions">
				<a href="https://wa.link/u03r6i" class="wa-nav" aria-label="WhatsApp" target="_blank" rel="noopener">
					<MessageCircle size={20} />
				</a>
				<a href="https://calendly.com/addymade/15-minute-consultation-call" class="nav-cta" target="_blank" rel="noopener">
					Book a Call
				</a>
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

			<!-- Industries -->
			<div class="mob-item">
				<button class="mob-section-btn" onclick={() => (mobileIndustriesOpen = !mobileIndustriesOpen)}>
					Industries
					<span class="chev" class:rotated={mobileIndustriesOpen}><ChevronDown size={16} /></span>
				</button>
				{#if mobileIndustriesOpen}
					<div class="mob-submenu">
						<a href="/industries/construction" onclick={() => (mobileOpen = false)}><span class="mob-icon"><HardHat size={14} /></span>Construction &amp; Scaffolding</a>
						<a href="/industries/healthcare"   onclick={() => (mobileOpen = false)}><span class="mob-icon"><HeartPulse size={14} /></span>Healthcare &amp; Clinics</a>
						<a href="/industries/ecommerce"    onclick={() => (mobileOpen = false)}><span class="mob-icon"><ShoppingCart size={14} /></span>E-commerce</a>
						<a href="/industries/saas"         onclick={() => (mobileOpen = false)}><span class="mob-icon"><Lightbulb size={14} /></span>SaaS &amp; Tech</a>
					</div>
				{/if}
			</div>

			<a href="/case-studies" class="mob-link" onclick={() => (mobileOpen = false)}>Our Work</a>
			<a href="/about"        class="mob-link" onclick={() => (mobileOpen = false)}>About</a>
			<a href="/blog"         class="mob-link" onclick={() => (mobileOpen = false)}>Blog</a>
			<a href="/contact"      class="mob-link" onclick={() => (mobileOpen = false)}>Contact</a>

			<div class="mob-ctas">
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
