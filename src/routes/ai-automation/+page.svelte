<script lang="ts">
	import { Bot, LineChart, ShieldCheck, Zap, ArrowRight, Building2, CheckCircle2 } from 'lucide-svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';

	// FAQ Data
	const faqs = [
		{
			q: "What is an AI Agent?",
			a: "An AI agent is an intelligent system that can perform tasks, make decisions, and interact with software and users autonomously."
		},
		{
			q: "Can AI integrate with our existing tools?",
			a: "Yes. We integrate with CRM, ERP, email, Slack, Teams, databases, and custom systems."
		}
	];
</script>

<svelte:head>
	<title>AI Automation & Intelligent Agents | Adymade</title>
	<meta name="description" content="Transform repetitive business processes into intelligent, self-operating workflows powered by AI. Automate work and accelerate growth." />
</svelte:head>

<div class="svc-page">
	<main>
		<!-- Hero Section -->
		<section class="svc-hero">
			<div class="container">
				<div class="hero-content text-center" style="max-width: 800px; margin: 0 auto;">
					<div class="eyebrow" style="justify-content: center; margin-bottom: 24px;">AI Automation &amp; Intelligent Agents</div>
					<h1 style="font-size: clamp(36px, 5.5vw, 60px); font-weight: 800; line-height: 1.1; margin-bottom: 24px;">
						Automate Work. <br/><span class="grad">Accelerate Growth.</span>
					</h1>
					<p class="svc-hero-sub" style="margin: 0 auto 40px; font-size: 18px;">
						We design and deploy AI agents that handle customer support, lead qualification, document processing, data entry, reporting, and business workflows—allowing your team to focus on high-value work.
					</p>
					<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="btn btn-primary" style="font-size: 16px; padding: 16px 36px; border-radius: 50px;">
						Book a Free Consultation <ArrowRight size={18} />
					</a>
				</div>
			</div>
		</section>

		<!-- What We Do / Services Section -->
		<section class="section pt-0">
			<div class="container">
				<div class="svc-block">
					<div class="svc-section-head">
						<h2>What We Do</h2>
						<p>Modern businesses lose hundreds of hours every month to manual tasks. Our AI automation solutions eliminate repetitive work while improving speed, accuracy, and scalability.</p>
					</div>

					<div class="svc-grid-2col" style="margin-bottom: 80px;">
						<div class="glass-card" style="padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 320px;">
							<img src="/placeholder-ai-1.jpg" alt="AI Automation Dashboard" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;" />
						</div>

						<div class="glass-card">
							<h3 style="margin-bottom: 24px; font-size: 24px; color: var(--theme-heading);">Services Include</h3>
							<ul class="svc-checklist">
								<li><CheckCircle2 size={18} class="list-icon"/> AI Customer Support Agents</li>
								<li><CheckCircle2 size={18} class="list-icon"/> Sales &amp; Lead Qualification Agents</li>
								<li><CheckCircle2 size={18} class="list-icon"/> CRM Automation</li>
								<li><CheckCircle2 size={18} class="list-icon"/> Email &amp; Communication Automation</li>
								<li><CheckCircle2 size={18} class="list-icon"/> Workflow Automation</li>
								<li><CheckCircle2 size={18} class="list-icon"/> Data Extraction &amp; Processing</li>
								<li><CheckCircle2 size={18} class="list-icon"/> Internal Knowledge Assistants</li>
								<li><CheckCircle2 size={18} class="list-icon"/> Multi-Agent Systems</li>
							</ul>
						</div>
					</div>

					<!-- Benefits -->
					<div class="svc-section-head">
						<h2>Benefits</h2>
						<p>Why invest in AI automation for your business operations?</p>
					</div>
					<div class="benefits-grid" style="margin-bottom: 80px;">
						<div class="glass-card benefit-card">
							<div class="svc-icon-wrap"><Zap size={24} /></div>
							<div>
								<h3>Save Time</h3>
								<p>Reduce manual effort by up to 80%.</p>
							</div>
						</div>
						<div class="glass-card benefit-card">
							<div class="svc-icon-wrap"><LineChart size={24} /></div>
							<div>
								<h3>Reduce Costs</h3>
								<p>Lower operational expenses through intelligent automation.</p>
							</div>
						</div>
						<div class="glass-card benefit-card">
							<div class="svc-icon-wrap"><ShieldCheck size={24} /></div>
							<div>
								<h3>Improve Accuracy</h3>
								<p>Minimize human errors in repetitive processes.</p>
							</div>
						</div>
						<div class="glass-card benefit-card">
							<div class="svc-icon-wrap"><Bot size={24} /></div>
							<div>
								<h3>Scale Faster</h3>
								<p>Handle more customers without increasing headcount.</p>
							</div>
						</div>
					</div>

					<!-- Industries -->
					<div class="svc-section-head">
						<h2>Industries We Serve</h2>
						<p>Tailored AI solutions for diverse market sectors.</p>
					</div>
					<div class="svc-industries-grid" style="margin-bottom: 80px;">
						{#each ['Healthcare', 'Manufacturing', 'Finance', 'SaaS', 'Education', 'E-commerce'] as industry (industry)}
							<div class="glass-card svc-ind-card">
								<Building2 size={24} color="var(--color-cyan)" />
								<h3>{industry}</h3>
							</div>
						{/each}
					</div>

					<!-- FAQ -->
					<div class="svc-section-head">
						<h2>Frequently Asked Questions</h2>
					</div>
					<div class="svc-faq-list">
						{#each faqs as faq (faq.q)}
							<div class="glass-card svc-faq-card" style="padding: 24px 32px;">
								<h3 style="font-size: 18px; font-weight: 700; color: var(--theme-heading); margin-bottom: 8px;">{faq.q}</h3>
								<p style="font-size: 15px; color: var(--theme-text-secondary); margin: 0; line-height: 1.6;">{faq.a}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<FinalCTA />
	</main>
</div>
