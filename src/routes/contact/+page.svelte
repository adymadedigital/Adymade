<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import LeadForm from '$lib/components/LeadForm.svelte';

	const faqs = [
		{
			q: 'How fast will I hear back?',
			a: "We reply to every inquiry within 2 hours during working hours, and same-day even outside them. Book a free 15-minute call if you'd rather talk it through live."
		},
		{
			q: 'Do you work with clients outside India?',
			a: 'Yes — we actively work with clients across Saudi Arabia, UAE, UK and Australia, and coordinate comfortably across IST, GST and GMT time zones.'
		},
		{
			q: 'Is the strategy call really free?',
			a: "Yes, no commitment required. It's a 15-minute conversation to understand your goals and tell you honestly whether — and how — we can help."
		},
		{
			q: 'What information should I include in the form?',
			a: 'The more context the better — your current challenge, rough timeline, and budget range if you have one. It helps us prepare useful ideas before we even talk.'
		}
	];

	let openIndex = $state<number | null>(0);

	function openFaq(i: number) {
		openIndex = i;
	}
	function closeFaq() {
		openIndex = null;
	}
</script>

<!-- ══════════ CONTACT HERO ══════════ -->
<section class="contact-hero">
	<div class="container">
		<div class="contact-hero-inner">
			<div class="eyebrow">Get in Touch</div>
			<h1>Let's Start a <span class="grad">Conversation</span></h1>
			<p class="contact-hero-desc">
				Tell us about your project and we'll reply within 2 hours. No commitment, no
				pressure — just a straight answer on how AI, video, or a new website can move
				your numbers.
			</p>
		</div>
	</div>
</section>

<!-- ══════════ QUICK CONTACT TILES ══════════ -->
<section class="contact-tiles">
	<div class="container contact-tiles-grid">
		<a href="mailto:contact@adymade.com" class="contact-tile">
			<div class="contact-tile-icon">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
			</div>
			<div class="contact-tile-label">Email Us</div>
			<div class="contact-tile-value">contact@adymade.com</div>
			<div class="contact-tile-sub">Replies within 2 hours</div>
		</a>

		<a href="tel:+919826886021" class="contact-tile">
			<div class="contact-tile-icon">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z"/><path d="M12 18h.01"/></svg>
			</div>
			<div class="contact-tile-label">Call / WhatsApp</div>
			<div class="contact-tile-value">+91 98268 86021</div>
			<div class="contact-tile-sub">Mon–Sat, 10am–7pm IST</div>
		</a>

		<a href="#" class="contact-tile">
			<div class="contact-tile-icon">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
			</div>
			<div class="contact-tile-label">Our Office</div>
			<div class="contact-tile-value">Vallabh Nagar, Indore</div>
			<div class="contact-tile-sub">Madhya Pradesh, India</div>
		</a>

		<a href="https://calendly.com/addymade/15-minute-consultation-call" class="contact-tile" target="_blank" rel="noopener">
			<div class="contact-tile-icon">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
			</div>
			<div class="contact-tile-label">Book a Call</div>
			<div class="contact-tile-value">Free 15-min Strategy Call</div>
			<div class="contact-tile-sub">Pick a slot that works for you</div>
		</a>
	</div>
</section>

<!-- ══════════ FORM + SIDEBAR ══════════ -->
<section class="section section-alt">
	<div class="container contact-layout">

		<!-- Form: reused component -->
		<LeadForm />

		<!-- Sidebar -->
		<div class="contact-side">

			<div class="contact-side-card">
				<h4>Prefer to Talk Directly?</h4>
				<div class="contact-side-row">
					<div class="contact-side-icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
					</div>
					<div>
						<div class="contact-side-row-title">Call or WhatsApp</div>
						<div class="contact-side-row-desc"><a href="tel:+919826886021" style="color:inherit;">+91 98268 86021</a></div>
					</div>
				</div>
				<div class="contact-side-row">
					<div class="contact-side-icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
					</div>
					<div>
						<div class="contact-side-row-title">Email</div>
						<div class="contact-side-row-desc">contact@adymade.com</div>
					</div>
				</div>
				<a href="https://wa.me/919826886021" target="_blank" rel="noopener" class="btn btn-wa" style="width:100%;justify-content:center;margin-top:6px;">Chat on WhatsApp</a>
			</div>

			<div class="contact-side-card">
				<h4>Working Hours</h4>
				<div class="contact-hours-row"><span>Monday – Friday</span><span>10:00am – 7:00pm IST</span></div>
				<div class="contact-hours-row"><span>Saturday</span><span>11:00am – 4:00pm IST</span></div>
				<div class="contact-hours-row"><span>Sunday</span><span>Closed</span></div>
			</div>

			<div class="contact-side-card" style="padding:0;overflow:hidden;">
				<div class="contact-map-card">
					<iframe
						src="https://www.google.com/maps?q=Vallabh+Nagar,+Y.N.+Road,+Indore,+Madhya+Pradesh&output=embed"
						width="100%" height="100%" style="border:0;filter:grayscale(0.3) brightness(0.9) contrast(1.05);"
						allowfullscreen
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="Adymade office location"
					></iframe>
				</div>
			</div>
			<div class="contact-side-card" style="margin-top:-10px;">
				<h4>Our Address</h4>
				<p class="contact-side-row-desc">Vallabh Nagar, Y. N. Road,<br />Indore, Madhya Pradesh, India</p>
			</div>

		</div>

	</div>
</section>

<!-- ══════════ FAQ ══════════ -->
<section class="section">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow" style="justify-content:center;">FAQ</div>
			<h2>Quick Answers Before You Reach Out</h2>
			<p>Still have a question? Send it through the form above and we'll answer directly.</p>
		</div>

		<div class="faq-wrap">
			{#each faqs as item, i}
				<div
					class="faq-item"
					class:open={openIndex === i}
					role="group"
					onmouseenter={() => openFaq(i)}
					onmouseleave={closeFaq}
				>
					<button
						class="faq-btn"
						onclick={() => (openIndex === i ? closeFaq() : openFaq(i))}
						aria-expanded={openIndex === i}
					>
						<span>{item.q}</span>
						<span class="faq-toggle" aria-hidden="true">
							<Plus size={16} />
						</span>
					</button>
					<div class="faq-body">
						<div class="faq-inner">{item.a}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>