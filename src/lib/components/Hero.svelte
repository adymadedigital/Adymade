<script lang="ts">
	import { Check, ArrowRight, Bot, Clapperboard, Search } from 'lucide-svelte';
</script>

<section class="hero">
	<div class="hero-grid-bg"></div>
	<div class="container">
		<div class="hero-layout">
			<!-- Left Content -->
			<div class="hero-content">
				<div class="hero-badge">
					<div class="badge-dot">A</div>
					Global AI &amp; Digital Agency · Based in Indore, India
				</div>

				<div class="service-pills">
					<span class="s-pill">AI Automation</span>
					<span class="s-pill">AI Videos</span>
					<span class="s-pill">Compliance Videos</span>
					<span class="s-pill">Web Development</span>
					<span class="s-pill">Software Dev</span>
					<span class="s-pill">Digital Marketing</span>
					<span class="s-pill">SEO</span>
					<span class="s-pill">GEO</span>
				</div>

				<h1>Your Business,<br /><span class="grad">Supercharged by AI.</span></h1>

				<p class="hero-sub">
					AI automation that runs 24/7. Videos that stop the scroll. Websites that convert. Marketing
					that delivers ROI. Trusted across India, Saudi Arabia, UAE, UK &amp; Australia.
				</p>

				<div class="hero-actions">
					<a
						href="https://calendly.com/addymade/15-minute-consultation-call"
						class="btn btn-primary"
						target="_blank"
						rel="noopener"
					>
						Book a Free Strategy Call <ArrowRight size={17} />
					</a>
					<a href="#services" class="btn btn-ghost">Explore Services</a>
				</div>

				<div class="trust-micro">
					<span><span class="tk"><Check size={14} /></span> No commitment</span>
					<span><span class="tk"><Check size={14} /></span> Free 15-min call</span>
					<span><span class="tk"><Check size={14} /></span> Reply within 2 hours</span>
					<span><span class="tk"><Check size={14} /></span> IST · GST · GMT compatible</span>
				</div>
			</div>

			<!-- Right: Floating Stat Cards (desktop only) -->
			<div class="hero-vis" aria-hidden="true">
				<!-- Card 1: AI Automation -->
				<div class="float-card fc1">
					<div class="fc-label">
						<div class="fc-icon"><Bot size={18} /></div>
						<div>
							<div class="fc-title">AI Automation</div>
							<div class="fc-desc">Lead response time</div>
						</div>
					</div>
					<div class="fc-stat">
						<div>
							<div class="fc-num">30 min</div>
							<div class="fc-was">Was 8 hours</div>
						</div>
						<span class="fc-badge">↑ 94% faster</span>
					</div>
					<div class="fc-bar"><div class="fc-bar-fill" style="width:94%"></div></div>
				</div>

				<!-- Card 2: AI Video -->
				<div class="float-card fc2">
					<div class="fc-label">
						<div class="fc-icon"><Clapperboard size={18} /></div>
						<div>
							<div class="fc-title">AI Video Production</div>
							<div class="fc-desc">vs traditional production</div>
						</div>
					</div>
					<div class="fc-stat">
						<div>
							<div class="fc-num">80%</div>
							<div class="fc-was">Cost saved</div>
						</div>
						<div style="text-align:right">
							<div class="fc-delivery">3–7 days</div>
							<div class="fc-was">delivery</div>
						</div>
					</div>
					<div class="fc-bar"><div class="fc-bar-fill" style="width:80%"></div></div>
				</div>

				<!-- Card 3: SEO & GEO -->
				<div class="float-card fc3">
					<div class="fc-label">
						<div class="fc-icon"><Search size={18} /></div>
						<div>
							<div class="fc-title">SEO &amp; GEO</div>
							<div class="fc-desc">AI search visibility</div>
						</div>
					</div>
					<div class="fc-stat">
						<div>
							<div class="fc-num">Top 3</div>
							<div class="fc-was">In AI Overviews &amp; ChatGPT</div>
						</div>
						<span class="fc-badge fc-badge-purple">Ranked ✦</span>
					</div>
					<div class="fc-bar"><div class="fc-bar-fill" style="width:88%"></div></div>
				</div>
			</div>
		</div>
	</div>
</section>