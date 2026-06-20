<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { faqItems } from '$lib/data/faq';

	let openIndex = $state(0);

	function toggle(i: number) {
		openIndex = openIndex === i ? -1 : i;
	}
</script>

<section class="section section-alt">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Frequently Asked</div>
			<h2>Questions We Get All the Time</h2>
		</div>

		<div class="faq-wrap">
			{#each faqItems as item, i}
				<div class="faq-item" class:open={openIndex === i}>
					<button class="faq-btn" onclick={() => toggle(i)} aria-expanded={openIndex === i}>
						<span>{item.question}</span>
						<span class="faq-toggle" aria-hidden="true">
							<Plus size={16} />
						</span>
					</button>
					<div class="faq-body" role="region">
						<div class="faq-inner">{item.answer}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
