<script lang="ts">
	import { TrendingUp, Search, ArrowRight, CheckCircle2, BarChart3, Users, Target, Zap } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const offerings = [
		{
			icon: TrendingUp,
			title: "Digital Marketing",
			href: "/digital-marketing",
			desc: "Comprehensive digital marketing strategies that increase brand awareness, drive traffic, and generate qualified leads across multiple channels.",
		},
		{
			icon: Search,
			title: "SEO Services",
			href: "/seo-services",
			desc: "Improve your online visibility and attract high-intent customers through search engine optimization designed for long-term growth and organic success.",
		},
	];

	const benefits = [
		{ icon: BarChart3, text: "Increased brand visibility across digital channels" },
		{ icon: Target,    text: "Higher-quality leads and improved conversion rates" },
		{ icon: Users,     text: "Improved online presence and brand reputation" },
		{ icon: Zap,       text: "Measurable marketing performance and clear ROI" },
		{ icon: TrendingUp, text: "Long-term sustainable business growth" },
	];

	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
</script>

<svelte:head>
	<title>Marketing Services | Adymade CMS</title>
	<meta name="description" content="Accelerate growth with data-driven marketing. Reach the right audience, generate qualified leads, and grow your brand with strategic digital marketing." />
</svelte:head>

<div class="mkt-page">
	<div class="admin-login-ambient-1" style="position:absolute;z-index:0;"></div>
	<div class="admin-login-ambient-2" style="position:absolute;z-index:0;"></div>

	<main class="relative z-10">

		<!-- Hero -->
		<section class="mkt-hero">
			<div class="container">
				<div class="mkt-hero-inner">
					<div class="mkt-hero-text">
						<div class="eyebrow" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(10px);margin-bottom:24px;">Marketing</div>
						<h1>Accelerate Growth with <span class="grad">Data-Driven Marketing</span></h1>
						<p class="mkt-hero-sub">Reach the right audience, generate qualified leads, and grow your brand with strategic digital marketing solutions designed to deliver measurable results.</p>
						<p class="mkt-hero-body">In today's competitive landscape, businesses need more than visibility — they need a marketing strategy that attracts, engages, and converts. Our marketing services combine creativity, technology, and analytics to help businesses achieve sustainable growth.</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="mkt-cta">Explore Marketing Services <ArrowRight size={18} /></a>
					</div>
					<div class="mkt-hero-media mkt-glass">
						{#if !img1Error}
							<img src="/marketing-hero.jpg" alt="Marketing Services" class="mkt-img" onerror={() => img1Error = true} />
						{:else}
							<div class="mkt-img-ph"><TrendingUp size={56} color="rgba(6,182,212,0.5)" /><span>Image 1 — Place in static/</span></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- What We Offer -->
				<div class="mkt-block">
					<div class="mkt-section-head"><h2>What We Offer</h2><p>Two specialist marketing service lines to grow your brand.</p></div>
					<div class="mkt-offer-grid">
						{#each offerings as o}
							<a href={o.href} class="mkt-glass mkt-offer-card">
								<div class="mkt-icon-wrap"><o.icon size={26} /></div>
								<h3>{o.title}</h3>
								<p>{o.desc}</p>
								<span class="mkt-link">Learn more <ArrowRight size={16} /></span>
							</a>
						{/each}

						<!-- Image 2 -->
						<div class="mkt-glass mkt-img-card">
							{#if !img2Error}
								<img src="/marketing-services.jpg" alt="Marketing Services" class="mkt-img" onerror={() => img2Error = true} />
							{:else}
								<div class="mkt-img-ph"><BarChart3 size={40} color="rgba(6,182,212,0.5)" /><span>Image 2 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Image row -->
				<div class="mkt-block">
					<div class="mkt-img-row">
						<div class="mkt-glass mkt-img-card">
							{#if !img3Error}
								<img src="/marketing-seo.jpg" alt="SEO Growth" class="mkt-img" onerror={() => img3Error = true} />
							{:else}
								<div class="mkt-img-ph"><Search size={40} color="rgba(6,182,212,0.5)" /><span>Image 3 — Place in static/</span></div>
							{/if}
						</div>
						<div class="mkt-glass mkt-img-card">
							{#if !img4Error}
								<img src="/marketing-analytics.jpg" alt="Marketing Analytics" class="mkt-img" onerror={() => img4Error = true} />
							{:else}
								<div class="mkt-img-ph"><Target size={40} color="rgba(6,182,212,0.5)" /><span>Image 4 — Place in static/</span></div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Key Benefits -->
				<div class="mkt-block" style="margin-bottom:40px;">
					<div class="mkt-section-head"><h2>Key Benefits</h2><p>Why strategic marketing is the growth lever your business needs.</p></div>
					<div class="mkt-benefits-grid">
						{#each benefits as b}
							<div class="mkt-glass mkt-benefit-card">
								<div class="mkt-icon-wrap mkt-icon-sm"><b.icon size={20} /></div>
								<p class="mkt-benefit-text">{b.text}</p>
							</div>
						{/each}
					</div>
				</div>

			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	.mkt-page{background:#08051a;min-height:100vh;overflow:hidden;position:relative;}
	.mkt-hero{padding:140px 0 80px;position:relative;}
	.mkt-hero-inner{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;}
	@media(min-width:900px){.mkt-hero-inner{grid-template-columns:55% 1fr;}}
	.mkt-hero-text h1{font-size:clamp(34px,5vw,58px);font-weight:800;color:white;line-height:1.1;letter-spacing:-0.02em;margin-bottom:22px;}
	.mkt-hero-sub{font-size:18px;color:rgba(255,255,255,0.75);line-height:1.75;margin-bottom:14px;max-width:580px;}
	.mkt-hero-body{font-size:15px;color:rgba(255,255,255,0.55);line-height:1.75;margin-bottom:36px;max-width:580px;}
	.mkt-hero-media{padding:0!important;min-height:420px;overflow:hidden;position:relative;border-radius:24px;}
	.mkt-cta{display:inline-flex;align-items:center;gap:10px;background:white;color:#08051a;padding:15px 30px;border-radius:50px;font-weight:700;font-size:16px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(255,255,255,.15);}
	.mkt-cta:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(255,255,255,.25);}
	.mkt-glass{background:rgba(255,255,255,.02);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:32px;display:flex;flex-direction:column;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 10px 30px rgba(0,0,0,.2);}
	.mkt-glass:hover{background:rgba(255,255,255,.04);border-color:rgba(6,182,212,.4);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 20px rgba(6,182,212,.08);}
	.mkt-block{margin-bottom:80px;}
	.mkt-section-head{margin-bottom:40px;border-bottom:1px solid rgba(255,255,255,.05);padding-bottom:24px;}
	.mkt-section-head h2{font-size:32px;font-weight:700;color:white;letter-spacing:-0.02em;margin-bottom:8px;}
	.mkt-section-head p{font-size:16px;color:rgba(255,255,255,.6);}
	.mkt-offer-grid{display:grid;grid-template-columns:1fr;gap:24px;}
	@media(min-width:768px){.mkt-offer-grid{grid-template-columns:1fr 1fr 1fr;}}
	.mkt-offer-card{text-decoration:none;}
	.mkt-offer-card h3{font-size:22px;font-weight:700;color:white;margin-bottom:12px;}
	.mkt-offer-card p{font-size:15px;color:rgba(255,255,255,.65);line-height:1.7;flex:1;margin-bottom:24px;}
	.mkt-link{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:var(--color-cyan);transition:gap .2s,color .2s;}
	.mkt-offer-card:hover .mkt-link{gap:12px;color:white;}
	.mkt-icon-wrap{width:52px;height:52px;background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.1);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--color-cyan);margin-bottom:20px;transition:all .3s;}
	.mkt-icon-sm{width:44px;height:44px;border-radius:12px;margin-bottom:0;}
	.mkt-glass:hover .mkt-icon-wrap{background:linear-gradient(135deg,rgba(6,182,212,.15),rgba(90,20,240,.15));border-color:rgba(6,182,212,.5);color:white;transform:scale(1.05) rotate(-2deg);}
	.mkt-img-row{display:grid;grid-template-columns:1fr;gap:24px;}
	@media(min-width:768px){.mkt-img-row{grid-template-columns:1fr 1fr;}}
	.mkt-benefits-grid{display:grid;grid-template-columns:1fr;gap:16px;}
	@media(min-width:640px){.mkt-benefits-grid{grid-template-columns:1fr 1fr;}}
	@media(min-width:1024px){.mkt-benefits-grid{grid-template-columns:repeat(3,1fr);}}
	.mkt-benefit-card{flex-direction:row;align-items:center;gap:16px;padding:20px 24px;}
	.mkt-benefit-text{font-size:15px;color:rgba(255,255,255,.8);line-height:1.5;margin:0;}
	.mkt-img-card{padding:0!important;overflow:hidden;min-height:280px;position:relative;}
	.mkt-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
	.mkt-img-ph{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:280px;color:rgba(255,255,255,.3);font-size:13px;text-align:center;padding:24px;}
</style>
