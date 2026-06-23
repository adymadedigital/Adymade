<script lang="ts">
	import { ClipboardCheck, ShieldCheck, Heart, Lock, HardHat, Stethoscope, FileText, Play, CheckSquare, Globe, ArrowRight, CheckCircle2, TrendingUp, Users } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	const approach = [
		{ icon: FileText, title: "Script Development", desc: "Transform complex policies into simple, engaging narratives your employees will actually understand and retain." },
		{ icon: Play, title: "Engaging Visuals", desc: "Animation, motion graphics, and scenario-based learning to bring compliance topics to life." },
		{ icon: CheckSquare, title: "Assessment Integration", desc: "Built-in knowledge checks, quizzes, and completion tracking to verify understanding." },
		{ icon: Globe, title: "Multi-Language Delivery", desc: "Global workforce support with AI-powered dubbing and subtitle generation in 20+ languages." },
	];

	const benefits = [
		{ stat: "↑ 80%", label: "Higher Training Completion Rates", desc: "Engaging video content dramatically outperforms text-based manuals." },
		{ stat: "3×", label: "Better Knowledge Retention", desc: "Video learning improves long-term recall versus traditional methods." },
		{ stat: "↓ Risk", label: "Reduced Compliance Risk", desc: "Documented training records reduce legal and regulatory exposure." },
		{ stat: "100%", label: "Consistent Employee Education", desc: "Every employee receives the same high-quality training experience." },
	];

	// Image error states
	let img1Error = $state(false);
	let img2Error = $state(false);
	let img3Error = $state(false);
	let img4Error = $state(false);
	let img5Error = $state(false);
	let img6Error = $state(false);
</script>

<svelte:head>
	<title>Compliance & Training Videos | Adymade CMS</title>
	<meta name="description" content="Engaging compliance videos that help organizations educate employees, reduce risk, and meet regulatory requirements." />
</svelte:head>

<div class="relative min-h-screen cv-bg overflow-hidden">
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">

		<!-- Hero -->
		<section class="cv-hero">
			<div class="container">
				<div class="cv-hero-inner">
					<div class="cv-hero-text">
						<div class="eyebrow" style="background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px); margin-bottom: 24px;">
							Compliance &amp; Training Video Solutions
						</div>
						<h1>Turn Mandatory Training into <span class="grad">Meaningful Learning</span></h1>
						<p class="cv-hero-sub">
							We create professional compliance and training videos that improve employee understanding, increase completion rates, and support regulatory compliance.
						</p>
						<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="cv-cta">
							Get a Free Quote <ArrowRight size={18} />
						</a>
					</div>

					<!-- Hero Image 1 -->
					<div class="cv-hero-media glass-card">
						{#if !img1Error}
							<img src="/compliance-hero.jpg" alt="Compliance Video Production" class="cv-img" onerror={() => img1Error = true} />
						{:else}
							<div class="cv-img-placeholder">
								<ClipboardCheck size={56} color="rgba(6,182,212,0.5)" />
								<span>Image 1 — Place in static/</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="section pt-0">
			<div class="container">

				<!-- Types of Compliance Videos -->
				<div class="cv-category">
					<div class="cv-section-header">
						<h2>Types of Compliance Videos</h2>
						<p>Covering every compliance requirement across industries and departments.</p>
					</div>

					<div class="cv-types-grid">

						<!-- Workplace Compliance -->
						<div class="glass-card">
							<div class="gc-icon"><ShieldCheck size={24} /></div>
							<h3>Workplace Compliance</h3>
							<ul class="cv-list">
								<li><CheckCircle2 size={16} /><span>Code of Conduct</span></li>
								<li><CheckCircle2 size={16} /><span>Anti-Harassment</span></li>
								<li><CheckCircle2 size={16} /><span>Diversity &amp; Inclusion</span></li>
								<li><CheckCircle2 size={16} /><span>Ethics Training</span></li>
							</ul>
						</div>

						<!-- Safety Compliance -->
						<div class="glass-card">
							<div class="gc-icon"><HardHat size={24} /></div>
							<h3>Safety Compliance</h3>
							<ul class="cv-list">
								<li><CheckCircle2 size={16} /><span>Workplace Safety</span></li>
								<li><CheckCircle2 size={16} /><span>Hazard Awareness</span></li>
								<li><CheckCircle2 size={16} /><span>Equipment Handling</span></li>
								<li><CheckCircle2 size={16} /><span>Emergency Procedures</span></li>
							</ul>
						</div>

						<!-- Industry-Specific -->
						<div class="glass-card">
							<div class="gc-icon"><Stethoscope size={24} /></div>
							<h3>Industry-Specific Compliance</h3>
							<ul class="cv-list">
								<li><CheckCircle2 size={16} /><span>Healthcare Compliance</span></li>
								<li><CheckCircle2 size={16} /><span>Data Privacy</span></li>
								<li><CheckCircle2 size={16} /><span>Cybersecurity Awareness</span></li>
								<li><CheckCircle2 size={16} /><span>Regulatory Training</span></li>
							</ul>
						</div>

						<!-- Image 2 -->
						<div class="glass-card cv-img-card">
							{#if !img2Error}
								<img src="/compliance-types.jpg" alt="Compliance Video Types" class="cv-img" onerror={() => img2Error = true} />
							{:else}
								<div class="cv-img-placeholder">
									<ShieldCheck size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 2 — Place in static/</span>
								</div>
							{/if}
						</div>

					</div>
				</div>

				<!-- Image Row 1 -->
				<div class="cv-category">
					<div class="cv-img-row">
						<div class="glass-card cv-img-card">
							{#if !img3Error}
								<img src="/compliance-workplace.jpg" alt="Workplace Compliance" class="cv-img" onerror={() => img3Error = true} />
							{:else}
								<div class="cv-img-placeholder">
									<Users size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 3 — Place in static/</span>
								</div>
							{/if}
						</div>
						<div class="glass-card cv-img-card">
							{#if !img4Error}
								<img src="/compliance-training.jpg" alt="Training Session" class="cv-img" onerror={() => img4Error = true} />
							{:else}
								<div class="cv-img-placeholder">
									<Heart size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 4 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Our Approach -->
				<div class="cv-category">
					<div class="cv-section-header">
						<h2>Our Approach</h2>
						<p>A proven process to transform dry compliance content into effective learning.</p>
					</div>
					<div class="cv-approach-grid">
						{#each approach as step, i}
							<div class="glass-card cv-approach-card">
								<div class="cv-step-num">0{i + 1}</div>
								<div class="gc-icon" style="margin-bottom: 16px;"><step.icon size={22} /></div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Benefits -->
				<div class="cv-category">
					<div class="cv-section-header">
						<h2>Benefits</h2>
						<p>Measurable outcomes from switching to AI-powered compliance video training.</p>
					</div>
					<div class="cv-benefits-grid">
						{#each benefits as b}
							<div class="glass-card cv-benefit-card">
								<div class="cv-stat">{b.stat}</div>
								<h3>{b.label}</h3>
								<p>{b.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Image Row 2 -->
				<div class="cv-category" style="margin-bottom: 40px;">
					<div class="cv-img-row">
						<div class="glass-card cv-img-card">
							{#if !img5Error}
								<img src="/compliance-safety.jpg" alt="Safety Compliance" class="cv-img" onerror={() => img5Error = true} />
							{:else}
								<div class="cv-img-placeholder">
									<HardHat size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 5 — Place in static/</span>
								</div>
							{/if}
						</div>
						<div class="glass-card cv-img-card">
							{#if !img6Error}
								<img src="/compliance-results.jpg" alt="Compliance Results" class="cv-img" onerror={() => img6Error = true} />
							{:else}
								<div class="cv-img-placeholder">
									<TrendingUp size={40} color="rgba(6,182,212,0.5)" />
									<span>Image 6 — Place in static/</span>
								</div>
							{/if}
						</div>
					</div>
				</div>

			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	.cv-bg { background: #08051a; }

	.cv-hero {
		padding: 140px 0 80px;
		position: relative;
	}

	.cv-hero-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: center;
	}

	@media (min-width: 900px) {
		.cv-hero-inner { grid-template-columns: 1fr 1fr; }
	}

	.cv-hero-text h1 {
		font-size: clamp(34px, 5vw, 58px);
		font-weight: 800;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-bottom: 24px;
	}

	.cv-hero-sub {
		font-size: 17px;
		color: rgba(255,255,255,0.7);
		line-height: 1.7;
		margin-bottom: 36px;
		max-width: 520px;
	}

	.cv-cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: white;
		color: #08051a;
		padding: 16px 32px;
		border-radius: 50px;
		font-weight: 700;
		font-size: 16px;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(255,255,255,0.15);
	}

	.cv-cta:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(255,255,255,0.25);
	}

	.cv-hero-media {
		border-radius: 24px;
		overflow: hidden;
		padding: 0 !important;
		min-height: 380px;
		position: relative;
	}

	/* Sections */
	.cv-category { margin-bottom: 80px; }
	.cv-category:last-child { margin-bottom: 40px; }

	.cv-section-header {
		margin-bottom: 40px;
		border-bottom: 1px solid rgba(255,255,255,0.05);
		padding-bottom: 24px;
	}

	.cv-section-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		letter-spacing: -0.02em;
		margin-bottom: 8px;
	}

	.cv-section-header p { font-size: 16px; color: rgba(255,255,255,0.6); }

	/* Grids */
	.cv-types-grid, .cv-approach-grid, .cv-benefits-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.cv-types-grid   { grid-template-columns: 1fr 1fr; }
		.cv-approach-grid { grid-template-columns: 1fr 1fr; }
		.cv-benefits-grid { grid-template-columns: 1fr 1fr; }
	}

	.cv-img-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.cv-img-row { grid-template-columns: 1fr 1fr; }
	}

	/* Images */
	.cv-img-card {
		padding: 0 !important;
		overflow: hidden;
		min-height: 280px;
		position: relative;
	}

	.cv-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
	}

	.cv-img-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		min-height: 280px;
		color: rgba(255,255,255,0.3);
		font-size: 13px;
		text-align: center;
		padding: 24px;
	}

	/* Checklist */
	.cv-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.cv-list li {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 15px;
		color: rgba(255,255,255,0.8);
	}

	.cv-list li :global(svg) { color: var(--color-cyan); flex-shrink: 0; }

	/* Approach cards */
	.cv-approach-card { position: relative; padding-top: 20px; }

	.cv-step-num {
		font-size: 56px;
		font-weight: 900;
		color: rgba(6,182,212,0.08);
		line-height: 1;
		position: absolute;
		top: 16px;
		right: 24px;
		pointer-events: none;
	}

	/* Benefit cards */
	.cv-benefit-card { text-align: center; align-items: center; }

	.cv-stat {
		font-size: 48px;
		font-weight: 900;
		background: linear-gradient(135deg, var(--color-electric), var(--color-cyan));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 12px;
		line-height: 1;
	}

	/* Scoped glass card */
	.glass-card {
		background: rgba(255,255,255,0.02);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 24px;
		padding: 32px;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
		display: flex;
		flex-direction: column;
		height: 100%;
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	}

	.glass-card:hover {
		background: rgba(255,255,255,0.04);
		border-color: rgba(6,182,212,0.4);
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(6,182,212,0.08);
	}

	.gc-icon {
		width: 52px;
		height: 52px;
		background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-cyan);
		margin-bottom: 20px;
		transition: all 0.3s ease;
	}

	.glass-card:hover .gc-icon {
		background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(90,20,240,0.15));
		border-color: rgba(6,182,212,0.5);
		color: white;
		transform: scale(1.05) rotate(-2deg);
	}

	.glass-card h3 {
		font-size: 20px;
		font-weight: 700;
		color: white;
		margin-bottom: 14px;
		letter-spacing: -0.01em;
	}

	.glass-card p {
		font-size: 15px;
		color: rgba(255,255,255,0.65);
		line-height: 1.7;
		margin-bottom: 0;
		flex: 1;
	}
</style>
