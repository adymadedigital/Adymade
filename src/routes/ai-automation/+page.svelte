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
	<title>AI Automation & Intelligent Agents | Adymade CMS</title>
	<meta name="description" content="Transform repetitive business processes into intelligent, self-operating workflows powered by AI. Automate work and accelerate growth." />
</svelte:head>

<!-- Liquid Glass Wrapper -->
<div class="relative min-h-screen bg-[#08051a] overflow-hidden">
	
	<!-- Ambient Background Orbs -->
	<div class="admin-login-ambient-1" style="position: absolute; z-index: 0;"></div>
	<div class="admin-login-ambient-2" style="position: absolute; z-index: 0;"></div>

	<main class="relative z-10">
		<!-- Hero Section -->
		<section class="glass-hero">
			<div class="container relative">
				<div class="hero-content text-center">
					<div class="eyebrow" style="justify-content: center; margin-bottom: 24px; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">AI Automation &amp; Intelligent Agents</div>
					<h1 style="font-size: clamp(40px, 6vw, 64px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: white;">
						Automate Work. <br/><span class="grad">Accelerate Growth.</span>
					</h1>
					<p style="font-size: 18px; color: rgba(255,255,255,0.7); max-width: 700px; margin: 0 auto 40px; line-height: 1.6;">
						We design and deploy AI agents that handle customer support, lead qualification, document processing, data entry, reporting, and business workflows—allowing your team to focus on high-value work.
					</p>
					<a href="https://calendly.com/addymade/15-minute-consultation-call" target="_blank" rel="noopener" class="glass-btn-inline" style="font-size: 16px; padding: 16px 32px; border-radius: 50px;">
						Book a Free Consultation <ArrowRight size={18} />
					</a>
				</div>
			</div>
		</section>

		<!-- What We Do / Services Section -->
		<section class="section pt-0">
			<div class="container">
				<div class="service-category">
					<div class="category-header">
						<h2>What We Do</h2>
						<p style="max-width: 800px; line-height: 1.6;">Modern businesses lose hundreds of hours every month to manual tasks. Our AI automation solutions eliminate repetitive work while improving speed, accuracy, and scalability.</p>
					</div>

					<div class="glass-grid" style="margin-bottom: 80px;">
						<!-- Placeholder image 1 -->
						<div class="glass-card" style="padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02);">
							<!-- Note to User: Replace this placeholder src with your local image path -->
							<img src="/placeholder-ai-1.jpg" alt="AI Automation Dashboard" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.5;" />
							<div style="position: absolute; padding: 24px; text-align: center;">
								<span style="color: rgba(255,255,255,0.5);">Local Image Placeholder 1</span>
							</div>
						</div>

						<div class="glass-card">
							<h3 style="margin-bottom: 24px; font-size: 24px;">Services Include</h3>
							<ul class="services-list">
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
					<div class="category-header">
						<h2>Benefits</h2>
						<p>Why invest in AI automation for your business operations?</p>
					</div>
					<div class="glass-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 80px;">
						<div class="glass-card">
							<div class="gc-icon"><Zap size={24} /></div>
							<h3>Save Time</h3>
							<p>Reduce manual effort by up to 80%.</p>
						</div>
						<div class="glass-card">
							<div class="gc-icon"><LineChart size={24} /></div>
							<h3>Reduce Costs</h3>
							<p>Lower operational expenses through intelligent automation.</p>
						</div>
						<div class="glass-card">
							<div class="gc-icon"><ShieldCheck size={24} /></div>
							<h3>Improve Accuracy</h3>
							<p>Minimize human errors in repetitive processes.</p>
						</div>
						<div class="glass-card">
							<div class="gc-icon"><Bot size={24} /></div>
							<h3>Scale Faster</h3>
							<p>Handle more customers without increasing headcount.</p>
						</div>
					</div>

					<!-- Industries -->
					<div class="category-header">
						<h2>Industries We Serve</h2>
						<p>Tailored AI solutions for diverse market sectors.</p>
					</div>
					<div class="glass-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 80px;">
						{#each ['Healthcare', 'Manufacturing', 'Finance', 'SaaS', 'Education', 'E-commerce'] as industry}
							<div class="glass-card" style="padding: 24px; align-items: center; text-align: center; flex-direction: row; gap: 16px;">
								<Building2 size={24} color="var(--color-cyan)" />
								<h3 style="margin: 0; font-size: 18px;">{industry}</h3>
							</div>
						{/each}
					</div>

					<!-- FAQ -->
					<div class="category-header">
						<h2>Frequently Asked Questions</h2>
					</div>
					<div class="faq-container">
						{#each faqs as faq}
							<div class="glass-card faq-card">
								<h3>{faq.q}</h3>
								<p>{faq.a}</p>
							</div>
						{/each}
					</div>

					<div class="glass-grid" style="margin-top: 80px;">
						<!-- Placeholder image 2 -->
						<div class="glass-card" style="padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02); height: 300px;">
							<img src="/placeholder-ai-2.jpg" alt="AI Analytics" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.5;" />
							<div style="position: absolute; padding: 24px; text-align: center;">
								<span style="color: rgba(255,255,255,0.5);">Local Image Placeholder 2</span>
							</div>
						</div>
						
						<!-- Placeholder image 3 -->
						<div class="glass-card" style="padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02); height: 300px;">
							<img src="/placeholder-ai-3.jpg" alt="AI Workflows" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.5;" />
							<div style="position: absolute; padding: 24px; text-align: center;">
								<span style="color: rgba(255,255,255,0.5);">Local Image Placeholder 3</span>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>

		<FinalCTA />
	</main>
</div>

<style>
	.services-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.services-list li {
		display: flex;
		align-items: center;
		gap: 12px;
		color: rgba(255,255,255,0.85);
		font-size: 16px;
	}

	:global(.list-icon) {
		color: var(--color-cyan);
		flex-shrink: 0;
	}

	.faq-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.faq-card {
		padding: 24px 32px;
	}

	.faq-card h3 {
		font-size: 20px;
		margin-bottom: 8px;
		color: white;
	}

	.faq-card p {
		margin-bottom: 0;
		font-size: 16px;
	}
</style>
