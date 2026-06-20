<script lang="ts">
	import { CheckCircle, Lock, ArrowRight } from 'lucide-svelte';
	import { supabase } from '$lib/supabase';

	interface Props {
		onClose?: () => void;
	}

	let { onClose }: Props = $props();

	let name    = $state('');
	let email   = $state('');
	let phone   = $state('');
	let company = $state('');
	let message = $state('');

	let loading  = $state(false);
	let success  = $state(false);
	let errorMsg = $state<string | null>(null);

	function validate(): string | null {
		if (!name.trim())  return 'Name is required.';
		if (!email.trim()) return 'Email is required.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email.';
		if (!phone.trim()) return 'Phone number is required.';
		return null;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMsg = null;

		const validationError = validate();
		if (validationError) { errorMsg = validationError; return; }

		loading = true;

		const { error } = await supabase.from('leads').insert({
			name:    name.trim(),
			email:   email.trim(),
			phone:   phone.trim(),
			company: company.trim(),
			message: message.trim(),
			source:  'website'
		});

		loading = false;

		if (error) {
			errorMsg = 'Something went wrong. Please try again or WhatsApp us directly.';
			console.error('Supabase error:', error);
		} else {
			success = true;
			name = ''; email = ''; phone = ''; company = ''; message = '';
		}
	}
</script>

<div class="form-wrap">
	{#if success}
		<div class="success-state">
			<div class="success-icon">
				<CheckCircle size={32} />
			</div>
			<h3>We'll be in touch within 2 hours!</h3>
			<p>
				Your message has been received. We'll review your requirements and reach out with a custom
				proposal. In the meantime, feel free to
				<a href="https://wa.link/u03r6i" target="_blank" rel="noopener">WhatsApp us</a> for a faster response.
			</p>
			<button class="btn btn-ghost" onclick={() => { success = false; onClose?.(); }}>
				Close
			</button>
		</div>
	{:else}
		<div class="form-header">
			<div class="eyebrow">Free Strategy Call</div>
			<h3>Tell Us About Your Business</h3>
			<p>We'll review your requirements and send a custom quote within 24 hours.</p>
		</div>

		<form onsubmit={handleSubmit} novalidate>
			<div class="form-row">
				<div class="field">
					<label for="lead-name">Full Name <span class="req">*</span></label>
					<input
						id="lead-name"
						type="text"
						bind:value={name}
						placeholder="Rajesh Kumar"
						autocomplete="name"
						required
					/>
				</div>
				<div class="field">
					<label for="lead-email">Email Address <span class="req">*</span></label>
					<input
						id="lead-email"
						type="email"
						bind:value={email}
						placeholder="you@company.com"
						autocomplete="email"
						required
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="field">
					<label for="lead-phone">Phone / WhatsApp <span class="req">*</span></label>
					<input
						id="lead-phone"
						type="tel"
						bind:value={phone}
						placeholder="+91 98765 43210"
						autocomplete="tel"
						required
					/>
				</div>
				<div class="field">
					<label for="lead-company">Company / Business Name</label>
					<input
						id="lead-company"
						type="text"
						bind:value={company}
						placeholder="Acme Pvt. Ltd."
						autocomplete="organization"
					/>
				</div>
			</div>

			<div class="field">
				<label for="lead-message">What do you need help with?</label>
				<textarea
					id="lead-message"
					bind:value={message}
					rows="4"
					placeholder="Tell us about your project or challenge — the more detail, the better our proposal..."
				></textarea>
			</div>

			{#if errorMsg}
				<div class="error-msg" role="alert">
					<ArrowRight size={14} />
					{errorMsg}
				</div>
			{/if}

			<button type="submit" class="btn btn-primary submit-btn" disabled={loading}>
				{#if loading}
					<span class="spinner"></span> Sending...
				{:else}
					Send My Request <ArrowRight size={16} />
				{/if}
			</button>

			<p class="form-note">
				<Lock size={12} /> We never share your data. No spam, just a custom quote.
			</p>
		</form>
	{/if}
</div>
