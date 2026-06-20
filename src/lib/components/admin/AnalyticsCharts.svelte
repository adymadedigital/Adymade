<script lang="ts">
	// Traffic Data (30 days)
	const trafficData = [
		120, 135, 142, 110, 150, 160, 180, 200, 195, 210, 
		220, 205, 230, 250, 245, 260, 280, 275, 290, 310, 
		305, 320, 340, 330, 350, 370, 360, 380, 400, 420
	];
	const maxTraffic = Math.max(...trafficData);
	
	// Create SVG path for line chart
	const width = 800;
	const height = 200;
	
	const points = trafficData.map((val, i) => {
		const x = (i / (trafficData.length - 1)) * width;
		const y = height - (val / maxTraffic) * height;
		return `${x},${y}`;
	}).join(' L ');
	
	const pathData = `M ${points}`;
	
	// Area path for gradient fill
	const areaPathData = `M 0,${height} L ${points} L ${width},${height} Z`;

	// Source Breakdown (Mock)
	const sources = [
		{ name: 'Organic Search', value: 45, color: '#34d399' },
		{ name: 'Direct Traffic', value: 25, color: '#60a5fa' },
		{ name: 'Social Media', value: 20, color: '#c084fc' },
		{ name: 'Referral', value: 10, color: '#fbbf24' }
	];
</script>

<div class="admin-grid" style="grid-template-columns: 2fr 1fr; margin-top: 32px;">
	
	<!-- Line Chart: Traffic Trends -->
	<div class="admin-card">
		<h3 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 24px;">Traffic Over Time (Last 30 Days)</h3>
		
		<div style="position: relative; width: 100%; height: {height}px; margin-top: 16px;">
			<svg width="100%" height="100%" viewBox="0 0 {width} {height}" preserveAspectRatio="none" style="overflow: visible;">
				<defs>
					<linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stop-color="#60a5fa" stop-opacity="0.3" />
						<stop offset="100%" stop-color="#60a5fa" stop-opacity="0" />
					</linearGradient>
				</defs>
				
				<!-- Grid lines -->
				{#each [0, 0.25, 0.5, 0.75, 1] as line}
					<line x1="0" y1={height * line} x2={width} y2={height * line} stroke="rgba(255,255,255,0.05)" stroke-width="1" />
				{/each}
				
				<!-- Area -->
				<path d={areaPathData} fill="url(#chartGradient)" />
				
				<!-- Line -->
				<path d={pathData} fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
				
				<!-- Data Points -->
				{#each trafficData as val, i}
					{#if i % 5 === 0 || i === trafficData.length - 1}
						<circle 
							cx={(i / (trafficData.length - 1)) * width} 
							cy={height - (val / maxTraffic) * height} 
							r="5" 
							fill="#08051a" 
							stroke="#60a5fa" 
							stroke-width="2" 
						/>
						
						<!-- Tooltip style label -->
						<text 
							x={(i / (trafficData.length - 1)) * width} 
							y={(height - (val / maxTraffic) * height) - 15} 
							fill="white" 
							font-size="11" 
							text-anchor="middle"
						>
							{val}
						</text>
					{/if}
				{/each}
			</svg>
		</div>
		<div style="display: flex; justify-content: space-between; margin-top: 24px; color: var(--color-muted); font-size: 11px;">
			<span>30 Days Ago</span>
			<span>15 Days Ago</span>
			<span>Today</span>
		</div>
	</div>

	<!-- Bar Chart: Traffic Sources -->
	<div class="admin-card">
		<h3 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 24px;">Traffic Sources</h3>
		
		<div style="display: flex; flex-direction: column; gap: 20px; margin-top: 16px;">
			{#each sources as source}
				<div>
					<div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px;">
						<span style="color: var(--color-body-text);">{source.name}</span>
						<span style="color: white; font-weight: 600;">{source.value}%</span>
					</div>
					<div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
						<div style="height: 100%; background: {source.color}; width: {source.value}%; border-radius: 4px;"></div>
					</div>
				</div>
			{/each}
		</div>
		
		<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);">
			<p style="font-size: 12px; color: var(--color-muted);">Aggregated end-to-end details from global edge nodes.</p>
		</div>
	</div>

</div>
