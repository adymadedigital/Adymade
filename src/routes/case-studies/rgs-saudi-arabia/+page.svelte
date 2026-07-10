<script lang="ts">
	import {
		ArrowLeft,
		ArrowRight,
		Building2,
		Globe2,
		Layers,
		Wrench,
		Clock,
		CheckCircle2,
		LayoutGrid,
		Image as ImageIcon,
		Newspaper,
		Briefcase,
		Settings2,
		ShieldAlert,
		Quote,
		Users,
		FolderKanban,
		Images
	} from 'lucide-svelte';

	const snapshot = [
		{ label: 'Client', value: 'RGS Global — A Tamimi Group Company', icon: Building2 },
		{ label: 'Country', value: 'Saudi Arabia', icon: Globe2 },
		{ label: 'Industry', value: 'Construction, Scaffolding & Industrial Solutions', icon: Wrench },
		{ label: 'Service', value: 'Website Redesign + Custom Admin CMS', icon: Layers },
		{ label: 'Frontend', value: 'Svelte', icon: FolderKanban },
		{ label: 'Backend', value: 'JavaScript', icon: Settings2 },
		{ label: 'Timeline', value: '3 months', icon: Clock },
		{ label: 'Project Type', value: 'Redesign · SEO Structure · Admin Panel · CMS', icon: LayoutGrid }
	];

	const builtSections = [
		{ name: 'Services', desc: 'Construction and industrial offerings, laid out for quick scanning.' },
		{ name: 'Projects', desc: 'Completed work presented in an organized, credible format.' },
		{ name: 'Clients', desc: 'Builds trust with B2B and corporate buyers.' },
		{ name: 'Media', desc: 'Gallery, videos, news, blogs, and brochures in one place.' },
		{ name: 'About Us', desc: 'Company background and market positioning.' },
		{ name: 'Jobs', desc: 'Recruitment listings and applications.' },
		{ name: 'Solutions', desc: 'Specialized service categories, clearly grouped.' }
	];

	const cmsManages = [
		'Products',
		'Projects',
		'Gallery',
		'Videos',
		'Brochures',
		'News',
		'Blogs',
		'Solutions',
		'Jobs',
		'Job applications',
		'System settings'
	];

	const improvements = [
		'A more modern and professional website experience',
		'Better organization of services, projects, clients, media, jobs, and solutions',
		'Custom admin control for ongoing website updates',
		'Easier service and project showcase',
		'SEO-oriented content structure',
		'Improved mobile experience',
		'Stronger brand image for the Saudi Arabia market',
		'Easier job and application management through the admin panel'
	];

	const websiteShots = ['Homepage', 'Services section', 'Projects section', 'Clients section', 'Media section', 'Mobile view'];
	const adminShots = [
		'Dashboard',
		'Project management',
		'Gallery / media management',
		'Blog / news management',
		'Jobs / applications management'
	];
</script>

<svelte:head>
	<title>RGS — A Tamimi Group Company Case Study | Adymade</title>
	<meta name="description" content="How Adymade delivered a bilingual (EN+AR) enterprise website and custom admin CMS for RGS Global, a Tamimi Group subsidiary based in Saudi Arabia." />
</svelte:head>

<main class="cs-page">
	<!-- Back link -->
	<div class="cs-back-bar">
		<div class="container">
			<a href="/#case-studies" class="back-link">
				<ArrowLeft size={16} /> Back to Case Studies
			</a>
		</div>
	</div>

	<!-- Hero -->
	<section class="cs-hero">
		<div class="container">
			<span class="cs-badge" style="background:rgba(6,182,212,0.1);border-color:rgba(6,182,212,0.25);color:#06b6d4">
				Construction · Web Dev · 🇸🇦 Saudi Arabia
			</span>
			<h1>RGS — <span class="grad-cyan">A Tamimi Group</span> Company</h1>
			<p class="cs-subtitle">
				A modern website and custom admin CMS for one of Saudi Arabia's most respected construction and
				industrial solutions groups.
			</p>

			<div class="metrics-row">
				<div class="metric-pill">
					<span class="mp-value mp-cyan">EN+AR</span>
					<span class="mp-label">Bilingual website delivered</span>
				</div>
				<div class="metric-pill">
					<span class="mp-value mp-cyan">100%</span>
					<span class="mp-label">Mobile-first, SEO-ready</span>
				</div>
				<div class="metric-pill">
					<span class="mp-value mp-cyan">Enterprise</span>
					<span class="mp-label">Tamimi Group subsidiary — Saudi Arabia</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Project Snapshot -->
	<section class="section">
		<div class="container">
			<div class="snapshot-grid">
				{#each snapshot as item (item.label)}
					<div class="snapshot-item">
						<div class="snapshot-icon"><svelte:component this={item.icon} size={18} /></div>
						<div>
							<div class="snapshot-label">{item.label}</div>
							<div class="snapshot-value">{item.value}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- About the Client -->
	<section class="section">
		<div class="container narrow">
			<h2>About the Client</h2>
			<p class="body-text">
				RGS Global — A Tamimi Group Company provides trusted construction, scaffolding, and industrial
				solutions for large-scale projects across Saudi Arabia. It serves construction companies,
				industrial clients, government and corporate buyers, project managers, procurement teams, and
				businesses looking for scaffolding, shoring, hoists, waterproofing, insulation, and related
				construction support solutions.
			</p>
			<p class="body-text">
				Operating in a serious B2B and industrial market, the website needed to communicate trust, scale,
				professionalism, and clarity.
			</p>
		</div>
	</section>

	<!-- The Challenge -->
	<section class="section alt-bg">
		<div class="container narrow">
			<h2>The Challenge</h2>
			<p class="body-text">
				The old website was outdated, unorganized, and difficult to manage. It didn't reflect the
				company's scale, credibility, or professional positioning in the Saudi Arabia construction and
				industrial solutions market. Services, projects, clients, media, blogs, news, brochures, jobs, and
				solutions weren't presented in a clean, structured way.
			</p>
			<p class="body-text">
				A bigger issue was the lack of proper admin access — the RGS team couldn't update content on
				their own, and even small changes needed developer involvement. RGS needed a modern website that
				improved brand presentation, organized content clearly, supported SEO, worked smoothly across
				devices, and gave the team full backend control through a proper admin panel.
			</p>
		</div>
	</section>

	<!-- What Adymade Built -->
	<section class="section">
		<div class="container">
			<h2>What Adymade Built</h2>
			<p class="body-text intro">
				Adymade redesigned and reorganized the complete RGS website experience with a modern, clean,
				professional, corporate direction — structured so visitors can quickly understand RGS's services,
				projects, clients, media, background, jobs, and specialized solutions.
			</p>
			<div class="feature-grid">
				{#each builtSections as s (s.name)}
					<div class="feature-card">
						<h3>{s.name}</h3>
						<p>{s.desc}</p>
					</div>
				{/each}
			</div>
			<p class="body-text foot-note">
				Built with an SEO-oriented structure, a mobile-friendly experience, and a consistent color theme
				throughout.
			</p>
		</div>
	</section>

	<!-- Custom Admin CMS -->
	<section class="section alt-bg">
		<div class="container">
			<h2>Custom Admin CMS</h2>
			<p class="body-text intro">
				Beyond a redesigned frontend, Adymade built a complete backend content management system so the
				RGS team can manage website updates independently — without depending on developers for every
				small change.
			</p>
			<div class="tag-cloud">
				{#each cmsManages as item (item)}
					<span class="cms-tag">{item}</span>
				{/each}
			</div>
			<div class="notice-box">
				<ShieldAlert size={16} />
				<span>Admin panel screenshots should have applicant names, phone numbers, emails, and other sensitive details blurred before publishing.</span>
			</div>
		</div>
	</section>

	<!-- Design Direction -->
	<section class="section">
		<div class="container narrow">
			<h2>Design Direction</h2>
			<p class="body-text">
				Adymade created a modern, clean, professional design reflecting RGS Global's credibility in the
				Saudi Arabia construction and industrial solutions market — corporate, trustworthy, organized, and
				easy to navigate, with every section structured to help users find information quickly.
			</p>
			<p class="body-text">
				A consistent color theme was used across the site for a polished brand experience, while the
				content structure was planned to support both user clarity and SEO.
			</p>
		</div>
	</section>

	<!-- Key Improvements -->
	<section class="section alt-bg">
		<div class="container">
			<h2>Key Improvements</h2>
			<div class="improve-grid">
				{#each improvements as item (item)}
					<div class="improve-item">
						<CheckCircle2 size={18} class="improve-check" />
						<span>{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Outcome -->
	<section class="section">
		<div class="container narrow">
			<h2>Outcome</h2>
			<p class="body-text">
				The final result is a modern, organized, business-ready website system for RGS Global — giving it
				a stronger digital presence in Saudi Arabia and presenting its services, projects, clients, and
				capabilities more clearly.
			</p>
			<p class="body-text">
				With the custom admin CMS, the RGS team now has better control over website updates, media,
				blogs, jobs, applications, and other content — reducing technical dependency and making the
				website easier to manage over time.
			</p>
			<p class="body-text emphasis">
				For Adymade, this project reflects our approach to website development: we don't only redesign
				websites, we build complete digital systems — frontend, backend, admin control, content
				structure, and long-term scalability.
			</p>
		</div>
	</section>

	<!-- Visual Showcase -->
	<section class="section alt-bg">
		<div class="container">
			<h2>Visual Showcase</h2>

			<h3 class="showcase-subhead"><ImageIcon size={16} /> Website Screenshots</h3>
			<div class="shot-grid">
				{#each websiteShots as label (label)}
					<div class="shot-placeholder">
						<Images size={22} />
						<span>{label}</span>
					</div>
				{/each}
			</div>

			<h3 class="showcase-subhead"><Briefcase size={16} /> Admin Panel Screenshots</h3>
			<div class="shot-grid">
				{#each adminShots as label (label)}
					<div class="shot-placeholder">
						<Newspaper size={22} />
						<span>{label}</span>
					</div>
				{/each}
			</div>
			<div class="notice-box">
				<ShieldAlert size={16} />
				<span>Blur all personal or sensitive information before publishing backend screenshots.</span>
			</div>
		</div>
	</section>

	<!-- Testimonial -->
	<section class="section">
		<div class="container narrow">
			<div class="testimonial-card">
				<span class="placeholder-tag">Placeholder — pending client approval</span>
				<Quote size={28} class="quote-icon" />
				<p class="testimonial-text">
					"Adymade helped us redesign our website into a more modern, organized, and easy-to-manage
					platform. The new admin panel gives our team better control over website updates, while the
					improved design presents our services and projects more professionally."
				</p>
				<div class="testimonial-author">
					<Users size={16} />
					<span>RGS Team</span>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="cta-section">
		<div class="container narrow" style="text-align:center;">
			<h2>Need more than just a redesigned website?</h2>
			<p class="body-text" style="margin-inline:auto;">
				Adymade builds complete website systems with modern frontend design, custom admin panels,
				content management controls, and scalable backend support — so you can manage services,
				projects, blogs, media, jobs, and updates without depending on developers for every small change.
			</p>
			<a
				href="https://calendly.com/addymade/15-minute-consultation-call"
				class="btn-primary"
				target="_blank"
				rel="noopener"
			>
				Let's talk about your project <ArrowRight size={16} />
			</a>
		</div>
	</section>
</main>

<style>
	.cs-page {
		background: #08051a;
		min-height: 100vh;
		color: rgba(255 255 255 / 0.92);
	}

	/* Back bar */
	.cs-back-bar {
		padding: 1.25rem 0;
		border-bottom: 1px solid rgba(255 255 255 / 0.06);
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: rgba(255 255 255 / 0.5);
		font-size: 0.85rem;
		text-decoration: none;
		transition: color 0.2s;
	}
	.back-link:hover { color: #fff; }

	/* Hero */
	.cs-hero {
		padding: 5rem 0 3.5rem;
		text-align: center;
	}
	.cs-badge {
		display: inline-block;
		padding: 0.35rem 1rem;
		border-radius: 999px;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		border: 1px solid;
	}
	.cs-hero h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		line-height: 1.15;
		margin: 0 0 1rem;
	}
	.cs-subtitle {
		color: rgba(255 255 255 / 0.6);
		font-size: 1.1rem;
		max-width: 560px;
		margin: 0 auto 2.5rem;
	}

	/* Metrics row */
	.metrics-row {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.metric-pill {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: rgba(6 182 212 / 0.04);
		border: 1px solid rgba(6 182 212 / 0.15);
		border-radius: 14px;
		padding: 1.25rem 2rem;
		min-width: 140px;
	}
	.mp-value {
		font-size: 2rem;
		font-weight: 800;
	}
	.mp-cyan {
		background: linear-gradient(135deg, #06b6d4, #0891b2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.mp-label {
		font-size: 0.78rem;
		color: rgba(255 255 255 / 0.5);
		text-align: center;
	}

	.grad-cyan {
		background: linear-gradient(135deg, #06b6d4, #0891b2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	.container.narrow {
		max-width: 760px;
	}

	/* Generic sections */
	.section {
		padding: 4rem 0;
	}
	.section.alt-bg {
		background: rgba(6 182 212 / 0.03);
		border-block: 1px solid rgba(255 255 255 / 0.05);
	}
	.section h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 700;
		margin: 0 0 1.5rem;
	}
	.body-text {
		color: rgba(255 255 255 / 0.65);
		font-size: 1rem;
		line-height: 1.75;
		margin: 0 0 1rem;
	}
	.body-text.intro {
		max-width: 760px;
	}
	.body-text.foot-note {
		margin-top: 1.75rem;
		font-size: 0.9rem;
	}
	.body-text.emphasis {
		color: rgba(255 255 255 / 0.85);
		font-weight: 500;
	}

	/* Project snapshot */
	.snapshot-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
	.snapshot-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: rgba(255 255 255 / 0.02);
		border: 1px solid rgba(255 255 255 / 0.07);
		border-radius: 12px;
		padding: 1rem 1.1rem;
	}
	.snapshot-icon {
		width: 34px;
		height: 34px;
		flex-shrink: 0;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(6 182 212 / 0.1);
		color: #06b6d4;
	}
	.snapshot-label {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: rgba(255 255 255 / 0.4);
		margin-bottom: 0.2rem;
	}
	.snapshot-value {
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.4;
	}

	/* Feature grid (What Adymade Built) */
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 2rem;
	}
	.feature-card {
		background: rgba(255 255 255 / 0.02);
		border: 1px solid rgba(255 255 255 / 0.07);
		border-radius: 14px;
		padding: 1.5rem;
		transition: border-color 0.2s ease;
	}
	.feature-card:hover {
		border-color: rgba(6 182 212 / 0.3);
	}
	.feature-card h3 {
		font-size: 1.05rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		color: #06b6d4;
	}
	.feature-card p {
		font-size: 0.9rem;
		color: rgba(255 255 255 / 0.6);
		line-height: 1.6;
		margin: 0;
	}

	/* CMS tag cloud */
	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin: 1.5rem 0 2rem;
	}
	.cms-tag {
		padding: 0.5rem 1rem;
		border-radius: 999px;
		background: rgba(6 182 212 / 0.08);
		border: 1px solid rgba(6 182 212 / 0.2);
		color: rgba(255 255 255 / 0.85);
		font-size: 0.85rem;
		font-weight: 500;
	}

	/* Notice box */
	.notice-box {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		background: rgba(251 191 36 / 0.06);
		border: 1px solid rgba(251 191 36 / 0.2);
		color: #fbbf24;
		border-radius: 12px;
		padding: 0.9rem 1.1rem;
		font-size: 0.85rem;
		line-height: 1.5;
		margin-top: 1rem;
	}
	.notice-box :global(svg) {
		flex-shrink: 0;
		margin-top: 0.1rem;
	}

	/* Key improvements */
	.improve-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.9rem;
	}
	.improve-item {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		font-size: 0.92rem;
		color: rgba(255 255 255 / 0.8);
		line-height: 1.5;
	}
	.improve-item :global(.improve-check) {
		color: #06b6d4;
		flex-shrink: 0;
		margin-top: 0.1rem;
	}

	/* Visual showcase */
	.showcase-subhead {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
		font-weight: 700;
		color: rgba(255 255 255 / 0.85);
		margin: 2rem 0 1rem;
	}
	.shot-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	.shot-placeholder {
		aspect-ratio: 16 / 10;
		border: 1px dashed rgba(255 255 255 / 0.15);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: rgba(255 255 255 / 0.35);
		font-size: 0.8rem;
		background: rgba(255 255 255 / 0.015);
	}

	/* Testimonial */
	.testimonial-card {
		position: relative;
		background: rgba(6 182 212 / 0.04);
		border: 1px solid rgba(6 182 212 / 0.15);
		border-radius: 20px;
		padding: 2.5rem;
		text-align: center;
	}
	.placeholder-tag {
		display: inline-block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #fbbf24;
		background: rgba(251 191 36 / 0.08);
		border: 1px solid rgba(251 191 36 / 0.2);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		margin-bottom: 1.25rem;
	}
	.testimonial-card :global(.quote-icon) {
		color: rgba(6 182 212 / 0.4);
		margin-bottom: 0.75rem;
	}
	.testimonial-text {
		font-size: 1.1rem;
		line-height: 1.7;
		color: rgba(255 255 255 / 0.85);
		font-style: italic;
		margin: 0 0 1.25rem;
	}
	.testimonial-author {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: rgba(255 255 255 / 0.55);
		font-weight: 600;
	}

	/* CTA */
	.cta-section {
		padding: 5rem 0 6rem;
		background: linear-gradient(180deg, rgba(6 182 212 / 0.05), transparent);
		border-top: 1px solid rgba(255 255 255 / 0.06);
	}
	.cta-section h2 {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 800;
		margin: 0 0 1rem;
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 2.2rem;
		border-radius: 10px;
		background: linear-gradient(135deg, #0891b2, #06b6d4);
		color: #fff;
		font-weight: 600;
		font-size: 0.95rem;
		text-decoration: none;
		transition: opacity 0.2s, transform 0.2s;
		margin-top: 1rem;
	}
	.btn-primary:hover {
		opacity: 0.88;
		transform: translateY(-2px);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.snapshot-grid { grid-template-columns: repeat(2, 1fr); }
		.feature-grid { grid-template-columns: repeat(2, 1fr); }
		.shot-grid { grid-template-columns: repeat(2, 1fr); }
		.improve-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 560px) {
		.snapshot-grid { grid-template-columns: 1fr; }
		.feature-grid { grid-template-columns: 1fr; }
		.shot-grid { grid-template-columns: 1fr; }
	}
</style>