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

<div class="admin-login-wrapper selection:bg-white/20">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="flex justify-center">
			<div class="admin-icon-box shadow-lg shadow-white/5 bg-white">
				<Lock class="w-6 h-6 text-black" />
			</div>
		</div>
		<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
			Admin Portal
		</h2>
		<p class="mt-2 text-center text-sm text-neutral-400">
			Sign in to access the content management system
		</p>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="admin-login-box">
			<form class="space-y-6" onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
				{#if error}
					<div class="admin-alert error">
						<svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p>{error}</p>
					</div>
				{/if}

				<div>
					<label for="email" class="admin-label">
						Email address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={email}
						class="admin-input"
						placeholder="admin@adymade.com"
					/>
				</div>

				<div>
					<label for="password" class="admin-label">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						bind:value={password}
						class="admin-input"
						placeholder="••••••••"
					/>
				</div>

				<div class="pt-2">
					<button
						type="submit"
						disabled={loading}
						class="admin-btn w-full"
						style="background: white; color: black;"
					>
						{#if loading}
							<Loader2 class="w-4 h-4 animate-spin" />
							Signing in...
						{:else}
							Sign in
							<ArrowRight class="w-4 h-4 transition-transform" />
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
