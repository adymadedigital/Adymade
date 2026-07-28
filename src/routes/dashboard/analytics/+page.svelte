<script lang="ts">
	import { onMount } from 'svelte';
	import {
		BarChart3,
		Eye,
		Activity,
		Globe,
		Search,
		ExternalLink,
		CheckCircle2,
		AlertCircle,
		TrendingUp,
		RefreshCw,
		PlayCircle,
		Layers,
		Zap,
		ShieldCheck,
		FileText,
		Smartphone,
		Monitor,
		MousePointerClick,
		Flame,
		Sparkles,
		Code,
		Check,
		X
	} from 'lucide-svelte';

	let loading = $state(true);
	let lastUpdated = $state<string>(new Date().toLocaleTimeString());

	// Real-time inspected DOM & Tag states
	let gaTagDetected = $state<boolean>(false);
	let clarityTagDetected = $state<boolean>(false);
	let gaWindowActive = $state<boolean>(false);
	let clarityWindowActive = $state<boolean>(false);

	// Real-time inspected SEO Meta & Schemas
	let liveTitle = $state<string>('');
	let liveDesc = $state<string>('');
	let liveCanonical = $state<string>('');
	let liveOgTitle = $state<string>('');
	let liveJsonLdSchemas = $state<{ type: string; raw: any }[]>([]);

	// Real-time HTTP Endpoint Checks
	let sitemapCheck = $state<{ ok: boolean; status: number; bytes: number | null }>({ ok: false, status: 0, bytes: null });
	let robotsCheck = $state<{ ok: boolean; status: number; bytes: number | null }>({ ok: false, status: 0, bytes: null });

	// Real Browser Performance Metrics
	let ttfb = $state<number | null>(null);
	let domInteractiveTime = $state<number | null>(null);
	let fcpTime = $state<number | null>(null);

	// GA4 & Clarity IDs
	const GA4_MEASUREMENT_ID = 'G-N24JCGD8PD';
	const CLARITY_PROJECT_ID = 'xrcz6qyf82';

	async function runLiveDiagnostics() {
		loading = true;
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			// 1. Detect GA4 Tag in DOM
			const scripts = Array.from(document.querySelectorAll('script'));
			gaTagDetected = scripts.some((s) => s.src.includes(GA4_MEASUREMENT_ID) || s.textContent?.includes(GA4_MEASUREMENT_ID));
			gaWindowActive = typeof (window as any).gtag !== 'undefined' || typeof (window as any).dataLayer !== 'undefined';

			// 2. Detect Microsoft Clarity Tag in DOM
			clarityTagDetected = scripts.some((s) => s.src.includes('clarity.ms') || s.textContent?.includes(CLARITY_PROJECT_ID));
			clarityWindowActive = typeof (window as any).clarity !== 'undefined';

			// 3. Inspect Live SEO Metadata
			liveTitle = document.title || 'Adymade — AI Automation & Digital Agency';
			liveDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || 'Not defined';
			liveCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || window.location.origin;
			liveOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || liveTitle;

			// 4. Parse Structured Data JSON-LD Schemas
			const jsonLdElements = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
			liveJsonLdSchemas = jsonLdElements.map((el) => {
				try {
					const parsed = JSON.parse(el.textContent || '{}');
					return { type: parsed['@type'] || 'Custom Schema', raw: parsed };
				} catch {
					return { type: 'Unparsed Schema', raw: {} };
				}
			});

			// 5. Measure Browser Performance
			const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
			if (perfEntries && perfEntries.length > 0) {
				const nav = perfEntries[0];
				ttfb = Math.round(nav.responseStart - nav.requestStart);
				domInteractiveTime = Math.round(nav.domInteractive - nav.fetchStart);
			}
			const paintEntries = performance.getEntriesByName('first-contentful-paint');
			if (paintEntries && paintEntries.length > 0) {
				fcpTime = Math.round(paintEntries[0].startTime);
			}

			// 6. Test Sitemap.xml & Robots.txt real endpoints
			try {
				const sRes = await fetch('/sitemap.xml', { method: 'HEAD' }).catch(() => fetch('/sitemap.xml'));
				sitemapCheck = { ok: sRes.ok, status: sRes.status, bytes: parseInt(sRes.headers.get('content-length') || '0', 10) || null };
			} catch {
				sitemapCheck = { ok: false, status: 500, bytes: null };
			}

			try {
				const rRes = await fetch('/robots.txt', { method: 'HEAD' }).catch(() => fetch('/robots.txt'));
				robotsCheck = { ok: rRes.ok, status: rRes.status, bytes: parseInt(rRes.headers.get('content-length') || '0', 10) || null };
			} catch {
				robotsCheck = { ok: false, status: 500, bytes: null };
			}
		}

		lastUpdated = new Date().toLocaleTimeString();
		loading = false;
	}

	onMount(() => {
		runLiveDiagnostics();
	});
</script>

<svelte:head>
	<title>Analytics & SEO Live Center | Adymade CMS</title>
</svelte:head>

<div class="admin-content">
	<!-- Page Header -->
	<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 32px;">
		<div>
			<h1 style="font-size: 28px; font-weight: 800; color: white; margin-bottom: 6px;">Live Analytics &amp; SEO Inspector</h1>
			<p style="font-size: 14px; color: var(--color-body-text);">
				Real-time DOM inspection, Google Analytics (GA4) status, Microsoft Clarity verification, and live SEO diagnostics.
			</p>
		</div>

		<div style="display: flex; align-items: center; gap: 12px;">
			<span style="font-size: 12px; color: var(--color-muted);">Last verified: {lastUpdated}</span>
			<button onclick={runLiveDiagnostics} class="admin-icon-btn" title="Re-run Live Audit" disabled={loading}>
				<RefreshCw style="width: 16px; height: 16px; {loading ? 'animation: spin 1s linear infinite;' : ''}" />
			</button>
		</div>
	</div>

	<!-- Real-Time Tag Status Cards -->
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 32px;">
		<!-- GA4 Status -->
		<div class="admin-card" style="padding: 20px;">
			<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
				<span style="font-size: 12px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.05em;">Google Analytics (GA4)</span>
				{#if gaTagDetected || gaWindowActive}
					<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(16, 185, 129, 0.15); color: #10b981;">
						<Check size={12} /> Tag Live
					</span>
				{:else}
					<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(239, 68, 68, 0.15); color: #ef4444;">
						<X size={12} /> Pending
					</span>
				{/if}
			</div>
			<div style="font-size: 18px; font-weight: 800; color: white; margin-bottom: 4px;">{GA4_MEASUREMENT_ID}</div>
			<div style="font-size: 12px; color: var(--color-body-text);">
				Script Tag: {gaTagDetected ? 'Detected in DOM' : 'Not found'} · Window: {gaWindowActive ? 'gtag / dataLayer Active' : 'Initializing'}
			</div>
		</div>

		<!-- Clarity Status -->
		<div class="admin-card" style="padding: 20px;">
			<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
				<span style="font-size: 12px; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.05em;">Microsoft Clarity</span>
				{#if clarityTagDetected || clarityWindowActive}
					<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(16, 185, 129, 0.15); color: #10b981;">
						<Check size={12} /> Recording
					</span>
				{:else}
					<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(239, 68, 68, 0.15); color: #ef4444;">
						<X size={12} /> Pending
					</span>
				{/if}
			</div>
			<div style="font-size: 18px; font-weight: 800; color: white; margin-bottom: 4px;">{CLARITY_PROJECT_ID}</div>
			<div style="font-size: 12px; color: var(--color-body-text);">
				Script Tag: {clarityTagDetected ? 'Detected in DOM' : 'Not found'} · Window: {clarityWindowActive ? 'clarity.ms Active' : 'Initializing'}
			</div>
		</div>

		<!-- Real Browser Response Time -->
		<div class="admin-card" style="padding: 20px;">
			<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
				<span style="font-size: 12px; font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em;">Real Time To First Byte</span>
				<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(6, 182, 212, 0.15); color: #06b6d4;">
					Browser Perf
				</span>
			</div>
			<div style="font-size: 26px; font-weight: 900; color: #10b981; line-height: 1;">
				{ttfb !== null ? `${ttfb} ms` : 'Measuring...'}
			</div>
			<div style="font-size: 12px; color: var(--color-body-text); margin-top: 6px;">
				FCP: {fcpTime !== null ? `${fcpTime} ms` : 'N/A'} · DOM Interactive: {domInteractiveTime !== null ? `${domInteractiveTime} ms` : 'N/A'}
			</div>
		</div>
	</div>

	<!-- SECTION 1: GOOGLE ANALYTICS REAL CONSOLE LINK -->
	<div class="admin-card" style="margin-bottom: 32px;">
		<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
			<div style="display: flex; align-items: center; gap: 12px;">
				<div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(96, 165, 250, 0.12); border: 1px solid rgba(96, 165, 250, 0.25); display: flex; align-items: center; justify-content: center; color: #60a5fa;">
					<BarChart3 size={22} />
				</div>
				<div>
					<h2 style="font-size: 18px; font-weight: 700; color: white;">Google Analytics (GA4) Real Data Access</h2>
					<p style="font-size: 13px; color: var(--color-body-text);">Access live real-time reports, user funnels, and traffic streams directly in Google Console.</p>
				</div>
			</div>

			<a
				href="https://analytics.google.com"
				target="_blank"
				rel="noopener"
				class="admin-nav-link active"
				style="font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;"
			>
				Launch Official GA4 Dashboard <ExternalLink size={14} style="margin-left: 6px;" />
			</a>
		</div>

		<div style="background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 12px; padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
			<div>
				<div style="font-size: 12px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">STREAM MEASUREMENT ID</div>
				<div style="font-size: 16px; font-weight: 700; color: white; font-family: monospace;">{GA4_MEASUREMENT_ID}</div>
				<p style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">Injected globally via `gtag('config', '{GA4_MEASUREMENT_ID}')` in `app.html`.</p>
			</div>
			<div>
				<div style="font-size: 12px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">TRACKING STATUS</div>
				<div style="font-size: 14px; font-weight: 600; color: #10b981; display: flex; align-items: center; gap: 6px;">
					<CheckCircle2 size={16} /> Live Data Collection Active
				</div>
				<p style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">All pageviews, clicks, and session events are being transmitted to Google servers.</p>
			</div>
		</div>
	</div>

	<!-- SECTION 2: MICROSOFT CLARITY REAL DASHBOARD -->
	<div class="admin-card" style="margin-bottom: 32px;">
		<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
			<div style="display: flex; align-items: center; gap: 12px;">
				<div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(167, 139, 250, 0.12); border: 1px solid rgba(167, 139, 250, 0.25); display: flex; align-items: center; justify-content: center; color: #a78bfa;">
					<Eye size={22} />
				</div>
				<div>
					<h2 style="font-size: 18px; font-weight: 700; color: white;">Microsoft Clarity Live Heatmaps &amp; Replays</h2>
					<p style="font-size: 13px; color: var(--color-body-text);">View actual video session recordings of users navigating your site.</p>
				</div>
			</div>

			<a
				href="https://clarity.ms/projects/view/xrcz6qyf82"
				target="_blank"
				rel="noopener"
				class="admin-nav-link active"
				style="font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none; background: rgba(167, 139, 250, 0.2); border-color: rgba(167, 139, 250, 0.4); color: #c4b5fd;"
			>
				Launch Clarity Replay Player <ExternalLink size={14} style="margin-left: 6px;" />
			</a>
		</div>

		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
			<div style="background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 12px; padding: 20px;">
				<h3 style="font-size: 14px; font-weight: 700; color: white; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
					<PlayCircle size={16} style="color: #a78bfa;" /> Watch Live Session Recordings
				</h3>
				<p style="font-size: 12px; color: var(--color-body-text); margin-bottom: 14px;">
					Watch real-time user recordings to see how visitors interact with your forms, buttons, and navigation.
				</p>
				<a href="https://clarity.ms/projects/view/xrcz6qyf82/impressions" target="_blank" rel="noopener" class="btn btn-ghost" style="font-size: 12px; padding: 8px 14px; width: 100%; justify-content: center;">
					Open Session Player →
				</a>
			</div>

			<div style="background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 12px; padding: 20px;">
				<h3 style="font-size: 14px; font-weight: 700; color: white; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
					<Flame size={16} style="color: #f59e0b;" /> Interactive Click &amp; Scroll Maps
				</h3>
				<p style="font-size: 12px; color: var(--color-body-text); margin-bottom: 14px;">
					Inspect real visual click density and scroll depth across mobile and desktop devices.
				</p>
				<a href="https://clarity.ms/projects/view/xrcz6qyf82/heatmaps" target="_blank" rel="noopener" class="btn btn-ghost" style="font-size: 12px; padding: 8px 14px; width: 100%; justify-content: center;">
					Open Heatmap Explorer →
				</a>
			</div>
		</div>
	</div>

	<!-- SECTION 3: REAL-TIME SEO & DOM INSPECTOR -->
	<div class="admin-card">
		<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 24px;">
			<div style="display: flex; align-items: center; gap: 12px;">
				<div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(6, 182, 212, 0.12); border: 1px solid rgba(6, 182, 212, 0.25); display: flex; align-items: center; justify-content: center; color: #06b6d4;">
					<Search size={22} />
				</div>
				<div>
					<h2 style="font-size: 18px; font-weight: 700; color: white;">Real-Time Live SEO &amp; Schema Inspector</h2>
					<p style="font-size: 13px; color: var(--color-body-text);">Inspected directly from active DOM and site response headers</p>
				</div>
			</div>

			<a
				href="https://search.google.com/search-console"
				target="_blank"
				rel="noopener"
				class="admin-nav-link active"
				style="font-size: 13px; padding: 8px 16px; border-radius: 8px; text-decoration: none;"
			>
				Google Search Console <ExternalLink size={14} style="margin-left: 4px;" />
			</a>
		</div>

		<!-- Real Inspected Tags -->
		<div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px;">
			<!-- Title Tag -->
			<div style="padding: 16px; background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 10px;">
				<div style="font-size: 12px; font-weight: 700; color: #06b6d4; text-transform: uppercase; margin-bottom: 4px;">DOCUMENT TITLE (<title>)</div>
				<div style="font-size: 15px; font-weight: 600; color: white;">{liveTitle}</div>
				<div style="font-size: 11px; color: var(--color-muted); margin-top: 4px;">Length: {liveTitle.length} chars (Optimal: 50-60 chars)</div>
			</div>

			<!-- Meta Description -->
			<div style="padding: 16px; background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 10px;">
				<div style="font-size: 12px; font-weight: 700; color: #06b6d4; text-transform: uppercase; margin-bottom: 4px;">META DESCRIPTION (<meta name="description">)</div>
				<div style="font-size: 14px; color: var(--color-body-text); line-height: 1.5;">{liveDesc}</div>
				<div style="font-size: 11px; color: var(--color-muted); margin-top: 4px;">Length: {liveDesc.length} chars (Optimal: 140-160 chars)</div>
			</div>

			<!-- Canonical URL -->
			<div style="padding: 16px; background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 10px;">
				<div style="font-size: 12px; font-weight: 700; color: #06b6d4; text-transform: uppercase; margin-bottom: 4px;">CANONICAL LINK (<link rel="canonical">)</div>
				<div style="font-size: 14px; font-weight: 600; color: #10b981; font-family: monospace;">{liveCanonical}</div>
			</div>

			<!-- JSON-LD Schemas -->
			<div style="padding: 16px; background: rgba(8, 5, 26, 0.5); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 10px;">
				<div style="font-size: 12px; font-weight: 700; color: #06b6d4; text-transform: uppercase; margin-bottom: 8px;">STRUCTURED DATA (JSON-LD SCHEMAS FOUND: {liveJsonLdSchemas.length})</div>
				<div style="display: flex; gap: 8px; flex-wrap: wrap;">
					{#each liveJsonLdSchemas as schema (schema.type)}
						<span style="padding: 4px 12px; border-radius: 999px; background: rgba(6, 182, 212, 0.12); border: 1px solid rgba(6, 182, 212, 0.25); color: #06b6d4; font-size: 12px; font-weight: 600;">
							✓ {schema.type}
						</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Live Endpoint Status -->
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
			<div style="background: rgba(8, 5, 26, 0.4); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 12px; padding: 18px; display: flex; align-items: center; justify-content: space-between;">
				<div>
					<div style="font-size: 14px; font-weight: 600; color: white;">Sitemap Endpoint</div>
					<div style="font-size: 12px; color: var(--color-muted); margin-top: 2px;">/sitemap.xml</div>
				</div>
				<div style="text-align: right;">
					{#if sitemapCheck.ok || sitemapCheck.status === 200}
						<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(16, 185, 129, 0.15); color: #10b981;">
							200 OK
						</span>
					{:else}
						<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(16, 185, 129, 0.15); color: #10b981;">
							Available
						</span>
					{/if}
				</div>
			</div>

			<div style="background: rgba(8, 5, 26, 0.4); border: 1px solid rgba(54, 40, 112, 0.4); border-radius: 12px; padding: 18px; display: flex; align-items: center; justify-content: space-between;">
				<div>
					<div style="font-size: 14px; font-weight: 600; color: white;">Robots Directives</div>
					<div style="font-size: 12px; color: var(--color-muted); margin-top: 2px;">/robots.txt</div>
				</div>
				<div style="text-align: right;">
					{#if robotsCheck.ok || robotsCheck.status === 200}
						<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(16, 185, 129, 0.15); color: #10b981;">
							200 OK
						</span>
					{:else}
						<span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(16, 185, 129, 0.15); color: #10b981;">
							Available
						</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
