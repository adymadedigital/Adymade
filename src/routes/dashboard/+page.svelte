<script lang="ts">
	import { FileText, Image as ImageIcon, Settings, ArrowRight } from 'lucide-svelte';
	import WixAnalyticsCard from '$lib/components/admin/WixAnalyticsCard.svelte';
	import AnalyticsCharts from '$lib/components/admin/AnalyticsCharts.svelte';

	const stats = [
		{ name: 'Total Blogs', value: '12', icon: FileText, href: '/dashboard/blogs', color: 'text-blue-400', bg: 'bg-blue-400/10' },
		{ name: 'Images Hosted', value: '48', icon: ImageIcon, href: '/dashboard/images', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
		{ name: 'Content Keys', value: '8', icon: Settings, href: '/dashboard/content', color: 'text-purple-400', bg: 'bg-purple-400/10' }
	];
</script>

<div style="max-width: 1000px;">
	<div class="admin-header">
		<div>
			<h2>Dashboard Overview</h2>
			<p>Welcome to the Adymade content management system. Select a category below to start editing.</p>
		</div>
	</div>

	<WixAnalyticsCard />

	<div class="admin-grid">
		{#each stats as stat (stat.name)}
			<div class="admin-card" style="position: relative; overflow: hidden;">
				<div style="display: flex; align-items: center; justify-content: space-between;">
					<div class="admin-icon-box" style="color: {stat.color.replace('text-', '') === 'blue-400' ? '#60a5fa' : stat.color.replace('text-', '') === 'emerald-400' ? '#34d399' : '#c084fc'}; background: {stat.bg.replace('bg-', '').replace('/10', '') === 'blue-400' ? 'rgba(96,165,250,0.1)' : stat.bg.replace('bg-', '').replace('/10', '') === 'emerald-400' ? 'rgba(52,211,153,0.1)' : 'rgba(192,132,252,0.1)'}">
						<stat.icon style="width: 24px; height: 24px;" />
					</div>
					<a href={stat.href} style="padding: 8px; color: var(--color-muted); transition: color 0.2s;">
						<ArrowRight style="width: 20px; height: 20px;" />
					</a>
				</div>
				<div style="margin-top: 24px;">
					<h3 style="font-size: 14px; font-weight: 500; color: var(--color-body-text);">{stat.name}</h3>
					<p style="font-size: 30px; font-weight: bold; color: white; margin-top: 8px;">{stat.value}</p>
				</div>
			</div>
		{/each}
	</div>
	<AnalyticsCharts />
	<div class="admin-card" style="margin-top: 32px;">
		<h3 style="font-size: 18px; font-weight: 600; color: white; margin-bottom: 16px;">Quick Setup Guide</h3>
		<ul style="display: flex; flex-direction: column; gap: 16px; font-size: 14px; color: var(--color-body-text);">
			<li style="display: flex; gap: 12px;">
				<div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-midnight); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 12px; flex-shrink: 0;">1</div>
				<div>
					<span style="color: white; font-weight: 500; display: block; margin-bottom: 4px;">Configure Database</span>
					Ensure the `blogs` and `content` tables exist in your Supabase project with the correct schema.
				</div>
			</li>
			<li style="display: flex; gap: 12px;">
				<div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-midnight); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 12px; flex-shrink: 0;">2</div>
				<div>
					<span style="color: white; font-weight: 500; display: block; margin-bottom: 4px;">Setup Storage Bucket</span>
					Create a public storage bucket named `images` in Supabase to host your media files.
				</div>
			</li>
			<li style="display: flex; gap: 12px;">
				<div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-midnight); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 12px; flex-shrink: 0;">3</div>
				<div>
					<span style="color: white; font-weight: 500; display: block; margin-bottom: 4px;">Start Creating</span>
					Use the sidebar to navigate to the respective sections and start managing your content!
				</div>
			</li>
		</ul>
	</div>

	
</div>
