<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { Loader2, ArrowRight, Lock } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleLogin() {
		loading = true;
		error = '';

		const { data, error: authError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		loading = false;

		if (authError) {
			error = authError.message;
		} else if (data.session) {
			await goto('/dashboard');
		}
	}
</script>

<svelte:head>
	<title>Login | Adymade CMS</title>
</svelte:head>

<div class="admin-login-wrapper">
	<!-- Ambient Background Elements handled in CSS -->
	<div class="admin-login-ambient-1"></div>
	<div class="admin-login-ambient-2"></div>

	<div class="admin-login-container">
		<div class="admin-login-box">
			
			<div class="admin-login-header">
				<div class="admin-icon-box">
					<Lock class="w-7 h-7 text-white" />
				</div>
				<h2>AdyMade Admin Portal</h2>
				<p>Sign in to access your digital workspace</p>
			</div>

			<form class="admin-login-form" onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
				{#if error}
					<div class="admin-alert error">
						<svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p>{error}</p>
					</div>
				{/if}

				<div class="admin-form-group">
					<label for="email" class="admin-label">
						Email Address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={email}
						class="admin-input glass-input"
						placeholder="admin@adymade.com"
					/>
				</div>

				<div class="admin-form-group">
					<label for="password" class="admin-label flex-between">
						<span>Password</span>
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						bind:value={password}
						class="admin-input glass-input"
						placeholder="••••••••"
					/>
				</div>
				
				<div class="admin-form-actions">
					<button
						type="submit"
						disabled={loading}
						class="admin-btn glass-btn"
					>
						{#if loading}
							<Loader2 class="w-5 h-5 animate-spin" style="margin-right: 8px;" />
							Authenticating...
						{:else}
							Sign In to Dashboard
							<ArrowRight class="w-5 h-5" style="margin-left: 8px;" />
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
