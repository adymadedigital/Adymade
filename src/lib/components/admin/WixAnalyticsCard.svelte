<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import { Loader2, RefreshCw, AlertCircle, BarChart3 } from 'lucide-svelte';

	let data = $state<any>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	const labels: Record<string, string> = {
		TOTAL_SESSIONS: 'Total Sessions',
		CLICKS_TO_CONTACT: 'Clicks to Contact',
		TOTAL_FORMS_SUBMITTED: 'Forms Submitted',
		TOTAL_UNIQUE_VISITORS: 'Unique Visitors'
	};

	onMount(() => {
		fetchAnalytics();
	});

	async function fetchAnalytics() {
		loading = true;
		error = null;
		try {
			const res = await fetch('/api/wix-analytics');
			const text = await res.text();
			let json;
			try {
				json = JSON.parse(text);
			} catch {
				throw new Error(`Server returned HTML instead of JSON (Status ${res.status}). Vite might be restarting after your .env changes, please try refreshing the page.`);
			}
			if (!res.ok) throw new Error(json.error?.message || json.error || 'Failed to load analytics');
			data = json;
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}
</script>

<div class="admin-card" style="margin-bottom: 32px;">
	<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
		<div style="display: flex; align-items: center; gap: 12px;">
			<div class="admin-icon-box" style="color: #60a5fa; background: rgba(96,165,250,0.1); width: 40px; height: 40px;">
				<BarChart3 style="width: 20px; height: 20px;" />
			</div>
			<div>
				<h3 style="font-size: 18px; font-weight: 600; color: white;">Site Analytics</h3>
				<p style="font-size: 13px; color: var(--color-body-text);">Last 30 days of traffic (via Wix)</p>
			</div>
		</div>

		<button
			onclick={fetchAnalytics}
			class="admin-icon-btn"
			title="Refresh Data"
			disabled={loading}
		>
			<RefreshCw style="width: 18px; height: 18px; {loading ? 'animation: spin 1s linear infinite;' : ''}" />
		</button>
	</div>

	{#if loading}
		<div style="display: flex; align-items: center; justify-content: center; padding: 40px 0; color: var(--color-muted);">
			<Loader2 style="width: 24px; height: 24px; animation: spin 1s linear infinite;" />
			<span style="margin-left: 12px; font-size: 14px;">Loading analytics...</span>
		</div>
	{:else if error}
		<div class="admin-alert error" style="margin-bottom: 0;">
			<AlertCircle style="width: 20px; height: 20px;" />
			<div style="flex: 1;">
				<h4 style="font-weight: 600; margin-bottom: 4px;">Analytics Error</h4>
				<p>{error}</p>
				<p style="font-size: 12px; opacity: 0.8; margin-top: 8px;">Ensure `WIX_API_KEY` and `WIX_SITE_ID` are set in your `.env` file.</p>
			</div>
		</div>
	{:else if data}
		<div class="admin-grid">
			{#each data.measurements ?? [] as metric (metric.measurementType)}
				<div style="border: 1px solid rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm); padding: 20px; background: rgba(8, 5, 26, 0.4);">
					<p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-body-text); font-weight: 600; margin-bottom: 8px;">
						{labels[metric.measurementType] ?? metric.measurementType}
					</p>
					<p style="font-size: 28px; font-weight: bold; color: white;">{metric.total}</p>
				</div>
			{/each}

			{#if !data.measurements || data.measurements.length === 0}
				<div style="grid-column: 1 / -1; padding: 32px; text-align: center; color: var(--color-muted); border: 1px dashed rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm);">
					No analytics data available for the current period.
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style> -->
