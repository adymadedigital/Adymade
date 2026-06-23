<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import TrustStrip from '$lib/components/TrustStrip.svelte';
	import Services from '$lib/components/Services.svelte';
	import CaseStudies from '$lib/components/CaseStudies.svelte';
	import StatsBand from '$lib/components/StatsBand.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import GlobalMap from '$lib/components/GlobalMap.svelte';
	import Industries from '$lib/components/Industries.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import FinalCTA from '$lib/components/FinalCTA.svelte';
	import LeadForm from '$lib/components/LeadForm.svelte';

	let showLeadForm = $state(false);
</script>

<main>
	<Hero />
	<TrustStrip />
	<Services />
	<CaseStudies />
	<StatsBand />
	<Testimonials />
	<GlobalMap />
	<Industries />
	<FAQ />

	<!-- Lead Form Section (inline on homepage) -->
	<section class="form-section section">
		<div class="container">
			<div class="section-header">
				<div class="eyebrow">Get Started</div>
				<h2>Book Your <span class="grad">Free Strategy Call</span></h2>
				<p>Fill in the form below — we'll review your requirements and reply within 2 hours.</p>
			</div>
			<LeadForm />
		</div>
	</section>

	<FinalCTA />
</main>

<style>
	.form-section {
		background: #08051a;
	}
</style>
