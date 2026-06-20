<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { 
		LayoutDashboard, 
		FileText, 
		Image as ImageIcon, 
		Settings, 
		LogOut,
		Loader2,
		Cpu,
		Video,
		ShieldCheck,
		Globe,
		Code,
		Terminal,
		TrendingUp,
		Search
	} from 'lucide-svelte';

	let { children } = $props();
	let loading = $state(true);
	let userEmail = $state<string | null>(null);

	const navGroups = [
		{
			title: 'Main',
			items: [
				{ name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
				{ name: 'Blogs', href: '/dashboard/blogs', icon: FileText },
				{ name: 'Images', href: '/dashboard/images', icon: ImageIcon },
				{ name: 'Content', href: '/dashboard/content', icon: Settings }
			]
		},
		{
			title: 'AI & Automation',
			items: [
				{ name: 'AI Automation & Agents', href: '/dashboard/services/ai-automation-agents', icon: Cpu },
				{ name: 'AI Videos & Creatives', href: '/dashboard/services/ai-videos', icon: Video },
				{ name: 'Compliance Videos', href: '/dashboard/services/compliance-videos', icon: ShieldCheck },
				{ name: 'GEO — AI Search', href: '/dashboard/services/geo', icon: Globe }
			]
		},
		{
			title: 'Development',
			items: [
				{ name: 'Web & App Development', href: '/dashboard/services/web-app-development', icon: Code },
				{ name: 'Custom Software', href: '/dashboard/services/custom-software', icon: Terminal }
			]
		},
		{
			title: 'Marketing',
			items: [
				{ name: 'Digital Marketing', href: '/dashboard/services/digital-marketing', icon: TrendingUp },
				{ name: 'SEO Services', href: '/dashboard/services/seo', icon: Search }
			]
		},
		{
			title: 'System',
			items: [
				{ name: 'Settings & Data', href: '/dashboard/settings', icon: Settings }
			]
		}
	];

	onMount(() => {
		let authListener: { subscription: { unsubscribe: () => void } } | null = null;

		async function initAuth() {
			const { data: { session } } = await supabase.auth.getSession();
			if (!session) {
				await goto('/login');
			} else {
				userEmail = session.user.email ?? null;
				loading = false;
			}
		}

		initAuth();

		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				await goto('/login');
			}
		});
		authListener = data;

		return () => {
			if (authListener) {
				authListener.subscription.unsubscribe();
			}
		};
	});

	async function handleLogout() {
		await supabase.auth.signOut();
	}
</script>

<svelte:head>
	<title>Dashboard | Adymade CMS</title>
</svelte:head>

{#if loading}
	<div class="admin-layout" style="align-items: center; justify-content: center;">
		<Loader2 class="w-8 h-8 animate-spin" style="color: var(--color-cyan)" />
	</div>
{:else}
	<div class="admin-layout selection:bg-white/20">
		<!-- Sidebar -->
		<aside class="admin-sidebar">
			<div style="height: 72px; display: flex; align-items: center; padding: 0 24px; border-bottom: 1px solid rgba(54, 40, 112, 0.5);">
				<h1 style="font-size: 20px; font-weight: 800; color: white; display: flex; align-items: center; gap: 8px;">
					<div style="width: 24px; height: 24px; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
						<span style="color: black; font-size: 12px; font-weight: bold;">A</span>
					</div>
					Adymade
				</h1>
			</div>

			<div style="flex: 1; overflow-y: auto; padding: 24px 12px;">
				<nav style="display: flex; flex-direction: column; gap: 24px;">
					{#each navGroups as group (group.title)}
						<div>
							{#if group.title !== 'Main'}
								<h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-body-text); font-weight: 600; margin-bottom: 8px; padding-left: 16px;">
									{group.title}
								</h3>
							{/if}
							<div style="display: flex; flex-direction: column; gap: 4px;">
								{#each group.items as item (item.href)}
									{@const isActive = $page.url.pathname === item.href}
									<a
										href={item.href}
										class="admin-nav-link {isActive ? 'active' : ''}"
										style={group.title !== 'Main' ? 'font-size: 14px; padding: 10px 16px;' : ''}
									>
										<item.icon style="width: 18px; height: 18px; {isActive ? 'color: var(--color-cyan)' : 'color: inherit'}" />
										{item.name}
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</nav>
			</div>

			<div style="padding: 16px; border-top: 1px solid rgba(54, 40, 112, 0.5);">
				<div style="display: flex; align-items: center; gap: 12px; padding: 8px 12px; margin-bottom: 8px;">
					<div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-midnight); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
						<span style="font-size: 12px; font-weight: 500; color: white;">{userEmail?.charAt(0).toUpperCase()}</span>
					</div>
					<div style="min-width: 0; flex: 1;">
						<p style="font-size: 14px; font-weight: 500; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{userEmail}</p>
						<p style="font-size: 12px; color: var(--color-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Administrator</p>
					</div>
				</div>
				<button
					onclick={handleLogout}
					class="admin-nav-link"
					style="width: 100%; color: #ef4444;"
				>
					<LogOut style="width: 20px; height: 20px;" />
					Sign out
				</button>
			</div>
		</aside>

		<!-- Main Content -->
		<main class="admin-main">
			<div class="admin-content">
				{@render children()}
			</div>
		</main>
	</div>
{/if}
