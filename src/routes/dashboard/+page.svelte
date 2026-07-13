<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { FileText, BookOpen, Briefcase, MessageSquare, ArrowRight } from 'lucide-svelte';
	import WixAnalyticsCard from '$lib/components/admin/WixAnalyticsCard.svelte';
	import AnalyticsCharts from '$lib/components/admin/AnalyticsCharts.svelte';

	let blogCount = $state<number | string>('...');
	let caseStudyCount = $state<number | string>('...');
	let serviceCount = $state<number | string>('...');
	let testimonialCount = $state<number | string>('...');

	onMount(async () => {
		const [blogsRes, caseStudiesRes, servicesRes, testimonialsRes] = await Promise.all([
			supabase.from('blogs').select('*', { count: 'exact', head: true }),
			supabase.from('case_studies').select('*', { count: 'exact', head: true }),
			supabase.from('services').select('*', { count: 'exact', head: true }),
			supabase.from('testimonials').select('*', { count: 'exact', head: true })
		]);

		blogCount = blogsRes.error ? 0 : (blogsRes.count ?? 0);
		caseStudyCount = caseStudiesRes.error ? 0 : (caseStudiesRes.count ?? 0);
		serviceCount = servicesRes.error ? 0 : (servicesRes.count ?? 0);
		testimonialCount = testimonialsRes.error ? 0 : (testimonialsRes.count ?? 0);
	});

	const stats = $derived([
		{ name: 'Total Blogs', value: blogCount, icon: FileText, href: '/dashboard/blogs', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
		{ name: 'Case Studies', value: caseStudyCount, icon: BookOpen, href: '/dashboard/case-studies', color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
		{ name: 'Services', value: serviceCount, icon: Briefcase, href: '/dashboard/services', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
		{ name: 'Testimonials', value: testimonialCount, icon: MessageSquare, href: '/dashboard/testimonials', color: '#c084fc', bg: 'rgba(192,132,252,0.1)' }
	]);
</script>

<div style="max-width: 1000px;">
	<div class="admin-header">
		<div>
			<h2>Dashboard Overview</h2>
			<p>Welcome to the Adymade content management system. Select a category below to start editing.</p>
		</div>
	</div>

	<WixAnalyticsCard />

	<div class="stats-grid">
		{#each stats as stat (stat.name)}
			<div class="admin-card" style="position: relative; overflow: hidden;">
				<div style="display: flex; align-items: center; justify-content: space-between;">
					<div class="admin-icon-box" style="color: {stat.color}; background: {stat.bg};">
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

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		margin-bottom: 32px;
	}

	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
