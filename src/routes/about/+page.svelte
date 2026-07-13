<script lang="ts">
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

	<!-- HOW WE WORK -->
	<section class="section">
		<div class="container">
			<div class="section-header">
				<div class="eyebrow" style="justify-content:center;">Our Process</div>
				<h2>How We Work, Start to Scale</h2>
				<p>A simple, repeatable process — the same one behind every case study on our site.</p>
			</div>

			<div class="cs-process-grid">
				{#each process as p}
					<div class="cs-process-step">
						<div class="cs-process-num">{p.num}</div>
						<div class="cs-process-name">{p.name}</div>
						<div class="cs-process-desc">{p.desc}</div>
					</div>
				{/each}
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
	.about-hero {
		padding: 150px 0 70px;
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	.about-hero::before {
		content: '';
		position: absolute;
		top: -25%;
		left: 50%;
		transform: translateX(-50%);
		width: 70vw;
		height: 50vw;
		max-width: 820px;
		max-height: 600px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(90, 20, 240, 0.16) 0%, transparent 65%);
		pointer-events: none;
	}
	.about-hero-inner {
		max-width: 980px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}
	.about-hero-inner :global(.eyebrow) {
		justify-content: center;
	}
	.about-hero-inner h1 {
		margin-bottom: 22px;
		white-space: nowrap;
		font-size: clamp(22px, 3.6vw, 54px);
	}
	@media (max-width: 640px) {
		.about-hero-inner h1 {
			white-space: normal;
			font-size: clamp(26px, 6.5vw, 38px);
		}
	}
	.about-hero-desc {
		font-size: clamp(15px, 1.6vw, 19px);
		color: var(--color-body-text);
		line-height: 1.75;
		max-width: 780px;
		margin: 0 auto;
	}
	.about-hero-desc :global(strong) {
		color: var(--color-lavender);
		font-weight: 700;
		font-style: italic;
	}

	.about-story {
		padding: 20px 0 110px;
	}
	.about-story-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 56px;
		align-items: center;
	}
	@media (min-width: 940px) {
		.about-story-grid {
			grid-template-columns: 0.85fr 1.15fr;
		}
	}
	.about-story-media {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--color-slate);
		aspect-ratio: 4 / 5;
		background: var(--color-midnight);
	}
	.about-story-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.about-story-media-badge {
		position: absolute;
		bottom: 20px;
		left: 20px;
		right: 20px;
		background: rgba(8, 5, 26, 0.75);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: 16px 18px;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.about-story-media-badge-icon {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: linear-gradient(135deg, #320082, #5a14f0);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
	}
	.about-story-media-badge-title {
		font-size: 13px;
		font-weight: 700;
		color: #fff;
	}
	.about-story-media-badge-desc {
		font-size: 11px;
		color: var(--color-body-text);
	}
	.about-story-copy :global(.eyebrow) {
		margin-bottom: 18px;
	}
	.about-story-copy h2 {
		margin-bottom: 22px;
	}
	.about-story-copy p {
		font-size: 15px;
		color: var(--color-body-text);
		line-height: 1.8;
		margin-bottom: 18px;
	}
	.about-story-copy p:last-of-type {
		margin-bottom: 0;
	}
	.about-story-copy :global(strong) {
		color: #fff;
		font-weight: 600;
	}

	.about-value-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 18px;
	}
	@media (min-width: 560px) {
		.about-value-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 900px) {
		.about-value-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.about-value-card {
		background: var(--color-midnight);
		border: 1px solid var(--color-slate);
		border-radius: var(--radius-md);
		padding: 28px 24px;
		transition: all 0.28s ease;
	}
	.about-value-card:hover {
		border-color: rgba(90, 20, 240, 0.55);
		transform: translateY(-5px);
		box-shadow: 0 20px 40px -18px rgba(90, 20, 240, 0.28);
	}
	.about-value-icon {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		background: linear-gradient(135deg, rgba(50, 0, 130, 0.6), rgba(90, 20, 240, 0.4));
		border: 1px solid rgba(90, 20, 240, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-lavender);
		margin-bottom: 20px;
		transition: all 0.28s;
	}
	.about-value-card:hover .about-value-icon {
		background: linear-gradient(135deg, #320082, #5a14f0);
		border-color: transparent;
		color: #fff;
	}
	.about-value-card h3 {
		font-size: 16px;
		margin-bottom: 10px;
	}
	.about-value-card p {
		font-size: 13px;
		color: var(--color-body-text);
		line-height: 1.65;
	}

	.about-team-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}
	@media (min-width: 700px) {
		.about-team-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.about-team-card {
		background: var(--color-midnight);
		border: 1px solid var(--color-slate);
		border-radius: var(--radius-md);
		padding: 30px 20px;
		text-align: center;
		transition: all 0.25s ease;
	}
	.about-team-card:hover {
		border-color: rgba(90, 20, 240, 0.5);
		transform: translateY(-4px);
	}
	.about-team-avatar {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 19px;
		font-weight: 800;
		color: #fff;
		margin: 0 auto 18px;
		background: linear-gradient(135deg, var(--color-royal), var(--color-electric));
	}
	.about-team-name {
		font-size: 15px;
		font-weight: 700;
		color: #fff;
		margin-bottom: 4px;
	}
	.about-team-role {
		font-size: 12px;
		color: var(--color-cyan);
		font-weight: 500;
	}
</style>