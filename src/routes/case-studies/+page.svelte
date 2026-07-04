<script lang="ts">
	import { ArrowRight, Clock } from 'lucide-svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	interface Metric {
		value: string;
		description: string;
	}

	interface Study {
		id: string;
		badge: string;
		industry: string;
		title: string;
		duration: string;
		services: string[];
		description: string;
		metrics: Metric[];
		href: string;
		filter: string;
	}

	const pageStudies: Study[] = [
		{
			id: 'dental-clinic',
			badge: 'Healthcare · AI Automation',
			industry: 'Healthcare',
			title: 'Dental Clinic Management System',
			duration: '3 weeks',
			services: ['AI Automation', 'Custom Software'],
			description:
				'Complete automation of patient scheduling, billing reconciliation, and staff workflows for a busy multi-chair dental practice in Indore.',
			metrics: [
				{ value: '25%', description: 'Better chair utilisation' },
				{ value: '0%', description: 'Billing errors (was 4%)' },
				{ value: '3 hrs', description: 'Admin time saved daily' }
			],
			href: '/case-studies/dental-clinic',
			filter: 'AI & Automation'
		},
		{
			id: 'sales-pipeline',
			badge: 'Sales · AI Automation',
			industry: 'Sales & CRM',
			title: 'AI-Powered Sales Pipeline Automation',
			duration: '4 weeks',
			services: ['AI Automation', 'AI Agents'],
			description:
				'End-to-end lead qualification, scoring, and automated follow-up sequences that slashed response time from 8 hours to 30 minutes.',
			metrics: [
				{ value: '+15%', description: 'Revenue in 6 months' },
				{ value: '30 min', description: 'Lead response (was 8 hrs)' },
				{ value: '3×', description: 'Qualification rate' }
			],
			href: '/case-studies/sales-pipeline',
			filter: 'AI & Automation'
		},
		{
			id: 'rgs-saudi-arabia',
			badge: 'Construction · Web Dev · 🇸🇦 Saudi Arabia',
			industry: 'Construction',
			title: 'RGS — A Tamimi Group Company',
			duration: '3 weeks',
			services: ['Web Development', 'SEO'],
			description:
				"Enterprise-grade bilingual website with full RTL Arabic support for a scaffolding subsidiary of Tamimi Group — one of Saudi Arabia's largest conglomerates.",
			metrics: [
				{ value: 'EN+AR', description: 'Bilingual with RTL' },
				{ value: '100%', description: 'Mobile-first, SEO-ready' },
				{ value: 'Enterprise', description: 'Tamimi Group subsidiary' }
			],
			href: '/case-studies/rgs-saudi-arabia',
			filter: 'Development'
		}
	];


	const globalStats = [
		{ value: '50+', label: 'Projects Completed' },
		{ value: '95%', label: 'Client Retention' },
		{ value: '₹3L+', label: 'Revenue Recovered' },
		{ value: '3×', label: 'Average Efficiency Gain' }
	];

	const processSteps = [
		{ num: '01', name: 'Discover', desc: 'Deep-dive into your goals, pain points, and success metrics.' },
		{ num: '02', name: 'Research', desc: 'Audit your current setup and benchmark against best practices.' },
		{ num: '03', name: 'Strategy', desc: 'Build a custom roadmap with clear deliverables and timelines.' },
		{ num: '04', name: 'Execute', desc: 'Ship fast with weekly check-ins and zero scope creep.' },
		{ num: '05', name: 'Optimise', desc: 'Review data, iterate, and fine-tune for peak performance.' },
		{ num: '06', name: 'Grow', desc: "Scale what's working and build on the foundation we've laid." }
	];

	const filters = ['All', 'AI & Automation', 'Development', 'Marketing'];
	let activeFilter = $state('All');

	const filteredStudies = $derived(
		activeFilter === 'All' ? pageStudies : pageStudies.filter((s) => s.filter === activeFilter)
	);
</script>

<svelte:head>
	<title>Case Studies | Adymade — Real Results for Real Businesses</title>
	<meta
		name="description"
		content="Explore Adymade case studies — real client results across AI automation, web development, and digital marketing. See the measurable impact behind every project."
	/>
	<meta property="og:title" content="Case Studies | Adymade" />
	<meta
		property="og:description"
		content="Real results from real projects. See how Adymade delivers measurable impact for businesses across India, GCC, and beyond."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<main>
	<!-- 1. HERO -->
	<section class="cs-page-hero">
		<div class="container">
			<div class="cs-hero-inner">
				<div class="eyebrow">Proof, Not Promises</div>
				<h1>
					Real Results for<br />
					<span class="grad">Real Businesses</span>
				</h1>
				<p class="cs-hero-desc">
					Explore how we've helped businesses increase efficiency, generate leads, and scale revenue
					through precise AI automation, web development, and digital strategy.
				</p>
				<div class="cs-hero-actions">
					<a href="#studies" class="btn btn-primary">
						View Case Studies <ArrowRight size={16} />
					</a>
					<a
						href="https://calendly.com/addymade/15-minute-consultation-call"
						class="btn btn-ghost"
						target="_blank"
						rel="noopener"
					>
						Book a Consultation
					</a>
				</div>
				<div class="cs-trust-strip">
					<span class="cs-trust-item">
						<span class="cs-trust-dot" aria-hidden="true"></span>50+ Projects Delivered
					</span>
					<span class="cs-trust-item">
						<span class="cs-trust-dot" aria-hidden="true"></span>India · GCC · UK
					</span>
					<span class="cs-trust-item">
						<span class="cs-trust-dot" aria-hidden="true"></span>95% Client Retention
					</span>
				</div>
			</div>
		</div>
	</section>
	<!-- 3. FILTER BAR -->
	<section id="studies" class="cs-filter-section" aria-label="Filter case studies">
		<div class="container">
			<div class="cs-filter-top">
				<div class="cs-filter-bar" role="group" aria-label="Filter by category">
					{#each filters as f}
						<button
							class="cs-filter-btn"
							class:active={activeFilter === f}
							onclick={() => (activeFilter = f)}
							aria-pressed={activeFilter === f}
						>
							{f}
						</button>
					{/each}
				</div>
				<span class="cs-result-count" aria-live="polite">
					{filteredStudies.length}
					{filteredStudies.length === 1 ? 'case study' : 'case studies'}
				</span>
			</div>
		</div>
	</section>
	<!-- 2. STUDIES LIST (featured-card style for every entry, filtered) -->
	<section class="cs-featured" aria-label="Case studies">
		<div class="container">
			<div class="cs-studies-list">
				{#each filteredStudies as study (study.id)}
					<div class="cs-featured-card">
						<!-- Left: info -->
						<div class="cs-featured-left">
							<span class="cs-featured-tag">{study.industry}</span>
							<h2 class="cs-featured-title">{study.title}</h2>
							<p class="cs-featured-desc">{study.description}</p>
							<div class="cs-featured-services">
								{#each study.services as svc}
									<span class="cs-service-tag">{svc}</span>
								{/each}
								<span class="cs-service-tag">
									<Clock size={11} aria-hidden="true" />{study.duration}
								</span>
							</div>
							<a href={study.href} class="btn btn-primary" style="align-self: flex-start;">
								Read Full Case Study <ArrowRight size={16} />
							</a>
						</div>

						<!-- Right: metrics grid -->
						<div class="cs-featured-right">
							<div class="cs-featured-metrics">
								{#each study.metrics as metric}
									<div class="cs-feat-metric">
										<div class="cs-feat-metric-val">{metric.value}</div>
										<div class="cs-feat-metric-desc">{metric.description}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}

				{#if filteredStudies.length === 0}
					<div class="cs-empty" role="status">
						<p>No case studies found for this filter. More coming soon!</p>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- 5. GLOBAL SUCCESS METRICS BAND -->
	<section class="cs-stats" aria-label="Company-wide results">
		<div class="container">
			<div class="cs-stats-grid">
				{#each globalStats as stat}
					<div class="cs-stat">
						<div class="cs-stat-value">
							<span class="grad">{stat.value}</span>
						</div>
						<div class="cs-stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 6. PROCESS SECTION -->
	<section class="section" aria-label="Our process">
		<div class="container">
			<div class="section-header">
				<div class="eyebrow">How We Work</div>
				<h2>Our Proven <span class="grad">6-Step Process</span></h2>
				<p>
					Every project follows the same disciplined process — so you always know where we are and
					what's coming next.
				</p>
			</div>
			<div class="cs-process-grid">
				{#each processSteps as step}
					<div class="cs-process-step">
						<div class="cs-process-num" aria-hidden="true">{step.num}</div>
						<div class="cs-process-name">{step.name}</div>
						<div class="cs-process-desc">{step.desc}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 7. FAQ -->
	<FAQ />

	<!-- 8. FINAL CTA -->
	<FinalCTA />
</main>
