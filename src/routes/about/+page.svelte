<script lang="ts">
	import { onMount } from 'svelte';
	import { Zap, Users, ShieldCheck, Clock } from 'lucide-svelte';

	const values = [
		{ icon: Zap, title: 'Innovation First', desc: 'We stay ahead of AI tooling so your business gets the advantage before it becomes the industry standard.' },
		{ icon: Users, title: 'Client Success', desc: 'We measure our work by your outcomes — response times, conversions, and revenue — not billable hours.' },
		{ icon: ShieldCheck, title: 'Quality Obsessed', desc: 'Every deliverable goes through a strategy-first review before it ever reaches your team for approval.' },
		{ icon: Clock, title: 'Speed & Reliability', desc: 'From a 3–7 day AI video turnaround to same-week automation pilots, we move at startup speed.' }
	];

	const process = [
		{ num: 'Step 1', name: 'Discover', desc: 'Free strategy call to understand your goals and bottlenecks.' },
		{ num: 'Step 2', name: 'Strategize', desc: 'We map the automation, video, or site to your growth targets.' },
		{ num: 'Step 3', name: 'Design', desc: 'Wireframes, storyboards, or workflow diagrams for your sign-off.' },
		{ num: 'Step 4', name: 'Build', desc: 'Our team builds and tests in tight, visible sprints.' },
		{ num: 'Step 5', name: 'Launch', desc: 'We deploy, integrate, and hand over with full documentation.' },
		{ num: 'Step 6', name: 'Optimize', desc: 'We track results and keep tuning after launch, not just before.' }
	];

	const team = [
		{ initials: 'AS', name: 'AI Strategy', role: 'Automation Planning' },
		{ initials: 'AE', name: 'Automation Engineering', role: 'Agents & Integrations' },
		{ initials: 'CD', name: 'Creative Direction', role: 'Video & Brand Design' },
		{ initials: 'WD', name: 'Web & Product', role: 'Development' }
	];

	// ── Process section: pinned scroll-scrubbed stack ──
	let processPinEl: HTMLElement;
	let sectionProgress = $state(0);

	function computeSectionProgress() {
		if (!processPinEl) return 0;
		const rect = processPinEl.getBoundingClientRect();
		const vh = window.innerHeight;
		const total = rect.height - vh;
		if (total <= 0) return 0;
		const scrolled = Math.min(Math.max(-rect.top, 0), total);
		return scrolled / total;
	}

	let rafId = 0;
	function onScroll() {
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			sectionProgress = computeSectionProgress();
			rafId = 0;
		});
	}

	onMount(() => {
		sectionProgress = computeSectionProgress();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	// ── Dynamic stats count-up ──
	let sectionEl: HTMLElement;
	let hasAnimated = $state(false);

	const aboutStats = [
		{ value: '3+', label: 'Years of Experience' },
		{ value: '236+', label: 'Projects Completed' },
		{ value: '150+', label: 'Happy Clients' },
		{ value: '5', label: 'Countries Served' }
	];

	let displayValues: number[] = $state(aboutStats.map(() => 0));

	function parseStat(value: string) {
		const match = value.match(/^(\d+)(.*)$/);
		if (!match) return { number: 0, suffix: '' };
		return { number: parseInt(match[1], 10), suffix: match[2] };
	}

	function animateCount(index: number, target: number) {
		const duration = 1500;
		const startTime = performance.now();

		function tick(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			displayValues[index] = Math.floor(eased * target);

			if (progress < 1) {
				requestAnimationFrame(tick);
			} else {
				displayValues[index] = target;
			}
		}
		requestAnimationFrame(tick);
	}

	function startAllAnimations() {
		if (hasAnimated) return;
		hasAnimated = true;
		aboutStats.forEach((stat, i) => {
			const { number } = parseStat(stat.value);
			animateCount(i, number);
		});
	}

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						startAllAnimations();
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>About Us | Adymade</title>
	<meta name="description" content="We're a team of AI generalists and AI specialists helping businesses across India, Saudi Arabia, UAE, UK and Australia build their identity and automate their growth." />
</svelte:head>

<main>
	<!-- ABOUT HERO -->
	<section class="about-hero">
		<div class="container">
			<div class="about-hero-inner">
				<div class="eyebrow">About Adymade</div>
				<h1>Creativity Isn't Just What We Do.<br /><span class="grad">It's Who We Are.</span></h1>
				<p class="about-hero-desc">
					We started with a simple belief: every brand has a story worth telling, and the
	                right blend of AI and creativity can make all the difference. What began as a
	                passion for animated video has grown into a full AI development & creative powerhouse — helping businesses across <strong>India, Saudi Arabia, UAE, UK and Australia</strong> build their identity and automate their growth.
				</p>
			</div>
		</div>
	</section>

	<!-- OUR STORY -->
	<section class="about-story">
		<div class="container about-story-grid">
			<div class="about-story-media">
				<img src="/logos/team-photo.jpg" alt="Adymade team collaborating on a project" />
				<div class="about-story-media-badge">
					<div class="about-story-media-badge-icon">
						<Zap size={18} />
					</div>
					<div>
						<div class="about-story-media-badge-title">3+ Years, 236+ Projects</div>
						<div class="about-story-media-badge-desc">Delivered for 150+ businesses worldwide</div>
					</div>
				</div>
			</div>

			<div class="about-story-copy">
				<div class="eyebrow">Our Story</div>
				<h2>We Drive Businesses To The Forefront Of Their Industries</h2>
				<p>
					We're a team of <strong>AI generalists and AI specialists</strong> who take a deep
					interest in the businesses we work with — combining strategy, design and automation
					to deliver 10X growth at minimal investment.
				</p>
				<p>
					We're storytellers, designers, and strategists who don't just deliver projects —
					we create experiences. Whether it's an explainer video that simplifies a complex
					idea, an AI agent that answers leads in under 30 minutes, or a website that feels
					effortless to navigate, we bring vision to life with a perfect blend of strategy
					and creativity.
				</p>
				<p>
					With a commitment to innovation, quality, and client success, Adymade isn't just a
					service provider — <strong>we're your growth partner.</strong> Let's build something
					extraordinary together. 🚀
				</p>
			</div>
		</div>
	</section>

	<!-- STATS (dynamic count-up) -->
	<section class="stats-band" bind:this={sectionEl}>
		<div class="stats-glow" aria-hidden="true"></div>
		<div class="container">
			<div class="stats-grid">
				{#each aboutStats as stat, i}
					{@const { suffix } = parseStat(stat.value)}
					<div class="stat-box">
						<div class="stat-number">{displayValues[i]}{suffix}</div>
						<div class="stat-lbl">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- VALUES -->
	<section class="section section-alt">
		<div class="container">
			<div class="section-header">
				<div class="eyebrow" style="justify-content:center;">What Drives Us</div>
				<h2>The Values Behind Every Project</h2>
				<p>The same principles guide every automation we build, every video we ship, and every website we launch.</p>
			</div>

			<div class="about-value-grid">
				{#each values as v}
					<div class="about-value-card">
						<div class="about-value-icon">
							<v.icon size={24} />
						</div>
						<h3>{v.title}</h3>
						<p>{v.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- HOW WE WORK — pinned scroll-scrubbed stack -->
	<section class="section cs-process-pin" bind:this={processPinEl} aria-label="Our process">
		<div class="cs-process-sticky">
			<div class="container">
				<div class="section-header">
					<div class="eyebrow" style="justify-content:center;">Our Process</div>
					<h2>How We Work, Start to Scale</h2>
					<p>A simple, repeatable process — the same one behind every case study on our site.</p>
				</div>

				<div class="cs-process-grid">
					{#each process as p, i (p.num)}
						{@const windowSize = 1 / process.length}
						{@const localRaw = (sectionProgress - i * windowSize) / windowSize}
						{@const local = Math.min(Math.max(localRaw, 0), 1)}
						{@const depth = (i % 2 === 0 ? 1 : -1) * (1 - local) * 14}
						<div
							class="cs-process-step"
							style="
								opacity: {local};
								transform: translateY({(1 - local) * 70}px) translateX({depth}px) scale({0.9 + local * 0.1});
							"
						>
							<div class="cs-process-num">{p.num}</div>
							<div class="cs-process-name">{p.name}</div>
							<div class="cs-process-desc">{p.desc}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- TEAM -->
	<section class="section section-alt">
		<div class="container">
			<div class="section-header">
				<div class="eyebrow" style="justify-content:center;">Our Team</div>
				<h2>AI Generalists & AI Specialists</h2>
				<p>A lean, senior team — no account-manager layers between you and the people doing the work.</p>
			</div>

			<div class="about-team-grid">
				{#each team as t}
					<div class="about-team-card">
						<div class="about-team-avatar">{t.initials}</div>
						<div class="about-team-name">{t.name}</div>
						<div class="about-team-role">{t.role}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="cta-section">
		<div class="container cta-inner">
			<h2>Let's Build Something Extraordinary Together</h2>
			<p>Book a free 15-minute strategy call — no commitment, reply within 2 hours, IST/GST/GMT compatible.</p>
			<div class="cta-btns">
				<a href="https://calendly.com/addymade/15-minute-consultation-call" class="cta-btn-primary" target="_blank" rel="noopener">Book a Free Call →</a>
				<a href="https://api.whatsapp.com/send?phone=919752571277&text=Hello%2C%20I%20have%20just%20visited%20your%20website%20and%20wanted%20to%20connect%20for%20further%20discussion.%20" class="cta-btn-ghost" target="_blank" rel="noopener">Get in Touch</a>
			</div>
			<p class="cta-micro">Trusted by 150+ businesses across India, Saudi Arabia, UAE, UK & Australia</p>
		</div>
	</section>
</main>

<style>
	.cs-process-pin {
		position: relative;
		height: 250vh;
	}
	.cs-process-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
	}
	.cs-process-step {
		will-change: transform, opacity;
	}

	@media (prefers-reduced-motion: reduce) {
		.cs-process-step {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>

