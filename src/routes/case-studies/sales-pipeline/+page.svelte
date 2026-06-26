<script lang="ts">
	import { ArrowLeft, HardHat, Clock } from 'lucide-svelte';
</script>

<svelte:head>
	<title>AI-Powered Sales Pipeline Automation — Case Study | Adymade</title>
	<meta name="description" content="How Adymade's AI automation tripled lead qualification rates and cut response time from 8 hours to 30 minutes." />
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
			<span class="cs-badge">Sales · AI Automation</span>
			<h1>AI-Powered <span class="grad">Sales Pipeline</span> Automation</h1>
			<p class="cs-subtitle">Slashing lead response time and tripling qualification rates with intelligent automation.</p>

			<div class="metrics-row">
				<div class="metric-pill">
					<span class="mp-value">+15%</span>
					<span class="mp-label">Revenue growth in 6 months</span>
				</div>
				<div class="metric-pill">
					<span class="mp-value">30 min</span>
					<span class="mp-label">Lead response time (was 8 hrs)</span>
				</div>
				<div class="metric-pill">
					<span class="mp-value">3×</span>
					<span class="mp-label">Lead qualification rate</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Under Construction -->
	<section class="uc-section">
		<div class="container">
			<div class="uc-card">
				<div class="uc-icon-wrap">
					<HardHat size={48} strokeWidth={1.5} />
				</div>
				<h2>Under Construction</h2>
				<p>
					We're crafting the full write-up for this case study — complete with process breakdowns,
					screenshots, and measurable outcomes. Check back soon!
				</p>
				<div class="uc-eta">
					<Clock size={14} />
					<span>Coming soon</span>
				</div>
				<a href="/" class="btn-primary">← Return Home</a>
			</div>
		</div>
	</section>
</main>

<style>
	.cs-page {
		background: #08051a;
		min-height: 100vh;
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
		background: rgba(139 92 246 / 0.1);
		border: 1px solid rgba(139 92 246 / 0.25);
		color: #a78bfa;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
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
		max-width: 540px;
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
		background: rgba(255 255 255 / 0.04);
		border: 1px solid rgba(255 255 255 / 0.1);
		border-radius: 14px;
		padding: 1.25rem 2rem;
		min-width: 140px;
	}
	.mp-value {
		font-size: 2rem;
		font-weight: 800;
		background: linear-gradient(135deg, #a78bfa, #7c3aed);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.mp-label {
		font-size: 0.78rem;
		color: rgba(255 255 255 / 0.5);
		text-align: center;
	}

	/* Under Construction */
	.uc-section {
		padding: 4rem 0 6rem;
	}
	.uc-card {
		max-width: 560px;
		margin: 0 auto;
		background: rgba(255 255 255 / 0.03);
		border: 1px solid rgba(255 255 255 / 0.08);
		border-radius: 24px;
		padding: 3.5rem 2.5rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}
	.uc-icon-wrap {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(139 92 246 / 0.15), rgba(124 58 237 / 0.05));
		border: 1px solid rgba(139 92 246 / 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #a78bfa;
	}
	.uc-card h2 {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0;
	}
	.uc-card p {
		color: rgba(255 255 255 / 0.55);
		font-size: 1rem;
		line-height: 1.7;
		margin: 0;
		max-width: 420px;
	}
	.uc-eta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 1rem;
		border-radius: 999px;
		background: rgba(251 191 36 / 0.08);
		border: 1px solid rgba(251 191 36 / 0.2);
		color: #fbbf24;
		font-size: 0.8rem;
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 2rem;
		border-radius: 10px;
		background: linear-gradient(135deg, #7c3aed, #5a14f0);
		color: #fff;
		font-weight: 600;
		font-size: 0.9rem;
		text-decoration: none;
		transition: opacity 0.2s, transform 0.2s;
		margin-top: 0.5rem;
	}
	.btn-primary:hover {
		opacity: 0.88;
		transform: translateY(-2px);
	}

	.grad {
		background: linear-gradient(135deg, #a78bfa, #7c3aed);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
</style>
