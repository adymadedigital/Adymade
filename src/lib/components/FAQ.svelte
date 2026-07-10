<script lang="ts">
	import { Plus } from 'lucide-svelte';

	let { faqItems = [] } = $props();

	let openIndex = $state(-1);

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
				<div
					class="faq-item"
					class:open={openIndex === i}
					onmouseenter={() => (openIndex = i)}
					onmouseleave={() => (openIndex = -1)}
					role="group"
				>
					<button class="faq-btn" aria-expanded={openIndex === i}>
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