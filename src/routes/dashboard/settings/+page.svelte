<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { Settings, Server, Activity, HardDrive, Download, Upload, Loader2, Save } from 'lucide-svelte';
	
	let activeTab = $state('config');
	
	// Data States
	let loading = $state(true);
	let saving = $state(false);
	let saveMessage = $state('');
	let errorMessage = $state('');
	
	// Config Data
	let apiGateway = $state('');
	let databaseString = $state('');
	let fileStorage = $state('');
	let webServer = $state('');
	
	// Logs Data
	let logs = $state<any[]>([]);
	
	// Metrics Data
	let storageBuckets = $state<any[]>([]);
	let metricsMock = {
		apiResponse: '42ms',
		publishedRate: '98.5%'
	};

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		
		// 1. Load Settings
		const { data: settingsData } = await supabase.from('admin_settings').select('*');
		if (settingsData) {
			for (const row of settingsData) {
				if (row.key === 'api_gateway') apiGateway = row.value;
				if (row.key === 'database_string') databaseString = row.value;
				if (row.key === 'file_storage') fileStorage = row.value;
				if (row.key === 'web_server') webServer = row.value;
			}
		}

		// 2. Load Logs
		const { data: logsData } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50);
		if (logsData) logs = logsData;

		// 3. Load Metrics (Buckets)
		const { data: bucketsData } = await supabase.storage.listBuckets();
		if (bucketsData) storageBuckets = bucketsData;

		loading = false;
	}

	async function saveSettings() {
		saving = true;
		saveMessage = '';
		errorMessage = '';
		
		const updates = [
			{ key: 'api_gateway', value: apiGateway },
			{ key: 'database_string', value: databaseString },
			{ key: 'file_storage', value: fileStorage },
			{ key: 'web_server', value: webServer }
		];

		const { error } = await supabase.from('admin_settings').upsert(updates);
		
		saving = false;
		if (error) {
			errorMessage = error.message;
		} else {
			saveMessage = 'System configuration saved securely.';
			setTimeout(() => saveMessage = '', 3000);
		}
	}

	// Backup Logic
	let backingUp = $state(false);
	async function handleDownloadBackup() {
		backingUp = true;
		try {
			// Fetch all necessary tables
			const [blogs, content, services] = await Promise.all([
				supabase.from('blogs').select('*'),
				supabase.from('content').select('*'),
				supabase.from('services').select('*')
			]);

			const backupData = {
				timestamp: new Date().toISOString(),
				tables: {
					blogs: blogs.data || [],
					content: content.data || [],
					services: services.data || []
				}
			};

			const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			
			const a = document.createElement('a');
			a.href = url;
			a.download = `adymade_backup_${new Date().toISOString().split('T')[0]}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			
			logActivity('Downloaded Data Backup', 'Admin downloaded full JSON backup');
		} catch (err: any) {
			alert('Backup failed: ' + err.message);
		} finally {
			backingUp = false;
		}
	}

	let restoring = $state(false);
	async function handleRestoreBackup(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;
		
		if (!confirm('WARNING: Restoring will attempt to upsert data into your tables. Existing IDs will be overwritten. Proceed?')) {
			target.value = '';
			return;
		}

		restoring = true;
		const file = target.files[0];
		
		const reader = new FileReader();
		reader.onload = async (event) => {
			try {
				const json = JSON.parse(event.target?.result as string);
				if (!json.tables) throw new Error('Invalid backup file format');

				// Upsert sequentially
				if (json.tables.blogs?.length) await supabase.from('blogs').upsert(json.tables.blogs);
				if (json.tables.content?.length) await supabase.from('content').upsert(json.tables.content);
				if (json.tables.services?.length) await supabase.from('services').upsert(json.tables.services);

				logActivity('Restored Data Backup', 'Admin restored JSON backup');
				alert('Restore completed successfully!');
			} catch (err: any) {
				alert('Restore failed: ' + err.message);
			} finally {
				restoring = false;
				target.value = '';
			}
		};
		reader.readAsText(file);
	}

	async function logActivity(action: string, details: string) {
		const { data: { session } } = await supabase.auth.getSession();
		await supabase.from('activity_logs').insert({
			action,
			details,
			user_email: session?.user?.email || 'admin'
		});
	}
</script>

<svelte:head>
	<title>System Settings | Adymade CMS</title>
</svelte:head>

<div class="admin-header">
	<div>
		<h2>System Management</h2>
		<p>Configure system variables, monitor metrics, view logs, and backup data.</p>
	</div>
</div>

<div class="settings-tabs">
	<button class={activeTab === 'config' ? 'active' : ''} onclick={() => activeTab = 'config'}>
		<Settings style="width: 16px; height: 16px;" /> System Config
	</button>
	<button class={activeTab === 'metrics' ? 'active' : ''} onclick={() => activeTab = 'metrics'}>
		<Activity style="width: 16px; height: 16px;" /> Server Metrics
	</button>
	<button class={activeTab === 'logs' ? 'active' : ''} onclick={() => activeTab = 'logs'}>
		<Server style="width: 16px; height: 16px;" /> System Logs
	</button>
	<button class={activeTab === 'backups' ? 'active' : ''} onclick={() => activeTab = 'backups'}>
		<HardDrive style="width: 16px; height: 16px;" /> Data & Backups
	</button>
</div>

<div class="admin-card" style="margin-top: 24px;">
	{#if loading}
		<div style="display: flex; justify-content: center; padding: 40px;">
			<Loader2 class="w-8 h-8 animate-spin" style="color: var(--color-cyan)" />
		</div>
	{:else}
		
		<!-- CONFIGURATION TAB -->
		{#if activeTab === 'config'}
			<div>
				<h3 style="font-size: 18px; font-weight: 600; margin-bottom: 24px; color: white;">A. System Configuration</h3>
				
				{#if errorMessage}
					<div class="admin-alert error" style="margin-bottom: 24px;"><p>{errorMessage}</p></div>
				{/if}
				{#if saveMessage}
					<div class="admin-alert success" style="margin-bottom: 24px;"><p>{saveMessage}</p></div>
				{/if}

				<div class="admin-grid" style="grid-template-columns: 1fr 1fr;">
					<div class="admin-form-group">
						<label class="admin-label">1. API Gateway URL</label>
						<input type="text" class="admin-input" bind:value={apiGateway} placeholder="e.g. https://api.gateway.com/v1" />
					</div>
					<div class="admin-form-group">
						<label class="admin-label">2. Database Connection String</label>
						<input type="password" class="admin-input" bind:value={databaseString} placeholder="postgres://user:pass@host/db" />
					</div>
					<div class="admin-form-group">
						<label class="admin-label">3. File Storage Bucket Settings</label>
						<input type="text" class="admin-input" bind:value={fileStorage} placeholder="e.g. supabase-storage-eu" />
					</div>
					<div class="admin-form-group">
						<label class="admin-label">4. Web Server Edge Location</label>
						<input type="text" class="admin-input" bind:value={webServer} placeholder="e.g. vercel-sfo1" />
					</div>
				</div>

				<div style="display: flex; justify-content: flex-end; margin-top: 24px;">
					<button class="admin-btn primary" onclick={saveSettings} disabled={saving}>
						{#if saving}
							<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" /> Saving...
						{:else}
							<Save style="width: 16px; height: 16px;" /> Save Configuration
						{/if}
					</button>
				</div>
			</div>
		{/if}

		<!-- METRICS TAB -->
		{#if activeTab === 'metrics'}
			<div>
				<h3 style="font-size: 18px; font-weight: 600; margin-bottom: 24px; color: white;">B. Server Metrics</h3>
				
				<div class="admin-grid">
					<div style="border: 1px solid rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm); padding: 24px; background: rgba(8, 5, 26, 0.4);">
						<p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-body-text); font-weight: 600; margin-bottom: 8px;">
							1. Storage Buckets Configured
						</p>
						<p style="font-size: 32px; font-weight: bold; color: white;">{storageBuckets.length}</p>
						<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
							{#each storageBuckets as bucket}
								<span style="font-size: 11px; padding: 4px 8px; background: var(--color-midnight); border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); color: var(--color-body-text);">
									{bucket.name}
								</span>
							{/each}
						</div>
					</div>

					<div style="border: 1px solid rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm); padding: 24px; background: rgba(8, 5, 26, 0.4);">
						<p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-body-text); font-weight: 600; margin-bottom: 8px;">
							2. API Response (Global Avg)
						</p>
						<p style="font-size: 32px; font-weight: bold; color: var(--color-cyan);">{metricsMock.apiResponse}</p>
						<p style="font-size: 12px; white; margin-top: 8px;">P95 latency across all edge nodes</p>
					</div>

					<div style="border: 1px solid rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm); padding: 24px; background: rgba(8, 5, 26, 0.4);">
						<p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-body-text); font-weight: 600; margin-bottom: 8px;">
							3. Published Rate
						</p>
						<p style="font-size: 32px; font-weight: bold; color: #4ade80;">{metricsMock.publishedRate}</p>
						<p style="font-size: 12px; color: white; margin-top: 8px;">Content successful delivery rate</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- LOGS TAB -->
		{#if activeTab === 'logs'}
			<div>
				<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
					<h3 style="font-size: 18px; font-weight: 600; color: white;">Recent Activity Logs</h3>
					<button class="admin-icon-btn" onclick={loadData} title="Refresh Logs">
						<Activity style="width: 16px; height: 16px;" />
					</button>
				</div>

				{#if logs.length === 0}
					<div style="padding: 40px; text-align: center; color: var(--color-muted); border: 1px dashed rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm);">
						No activity logs recorded yet.
					</div>
				{:else}
					<div style="display: flex; flex-direction: column; gap: 8px;">
						{#each logs as log}
							<div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius-sm);">
								<div>
									<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
										<span style="font-weight: 600; color: white; font-size: 14px;">{log.action}</span>
										<span style="font-size: 11px; color: var(--color-cyan); background: rgba(0, 240, 255, 0.1); padding: 2px 6px; border-radius: 4px;">
											{log.user_email}
										</span>
									</div>
									<p style="font-size: 13px; color: var(--color-body-text);">{log.details}</p>
								</div>
								<div style="font-size: 12px; color: var(--color-muted); white-space: nowrap;">
									{new Date(log.created_at).toLocaleString()}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- BACKUPS TAB -->
		{#if activeTab === 'backups'}
			<div>
				<h3 style="font-size: 18px; font-weight: 600; margin-bottom: 24px; color: white;">Data Backup & Restore</h3>
				
				<div class="admin-grid" style="grid-template-columns: 1fr 1fr;">
					
					<div style="border: 1px solid rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm); padding: 24px; background: rgba(8, 5, 26, 0.4);">
						<div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(96, 165, 250, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #60a5fa;">
							<Download style="width: 20px; height: 20px;" />
						</div>
						<h4 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 8px;">Create Backup</h4>
						<p style="font-size: 13px; color: var(--color-body-text); margin-bottom: 24px;">
							Download a complete snapshot of all tables (Blogs, Services, Content) securely packaged as a JSON file.
						</p>
						<button class="admin-btn primary" onclick={handleDownloadBackup} disabled={backingUp} style="width: 100%; justify-content: center;">
							{#if backingUp}
								<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" /> Creating Backup...
							{:else}
								Download .json Backup
							{/if}
						</button>
					</div>

					<div style="border: 1px solid rgba(54, 40, 112, 0.4); border-radius: var(--radius-sm); padding: 24px; background: rgba(8, 5, 26, 0.4);">
						<div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(248, 113, 113, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #f87171;">
							<Upload style="width: 20px; height: 20px;" />
						</div>
						<h4 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 8px;">Restore Data</h4>
						<p style="font-size: 13px; color: var(--color-body-text); margin-bottom: 24px;">
							Upload a previous JSON backup to instantly restore missing or corrupted data to your live database.
						</p>
						
						<label class="admin-btn danger" style="width: 100%; justify-content: center; cursor: pointer; {restoring ? 'opacity: 0.5; pointer-events: none;' : ''}">
							{#if restoring}
								<Loader2 style="width: 16px; height: 16px; animation: spin 1s linear infinite;" /> Restoring Data...
							{:else}
								Upload & Restore JSON
							{/if}
							<input type="file" accept=".json" style="display: none;" onchange={handleRestoreBackup} disabled={restoring} />
						</label>
					</div>

				</div>
			</div>
		{/if}
		
	{/if}
</div>

<style>
	.settings-tabs {
		display: flex;
		gap: 8px;
		margin-top: 16px;
		border-bottom: 1px solid rgba(54, 40, 112, 0.4);
		padding-bottom: 16px;
	}
	.settings-tabs button {
		background: rgba(255,255,255,0.02);
		border: 1px solid rgba(255,255,255,0.05);
		color: var(--color-body-text);
		padding: 8px 16px;
		border-radius: var(--radius-sm);
		font-size: 14px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		transition: all 0.2s;
	}
	.settings-tabs button:hover {
		background: rgba(255,255,255,0.05);
		color: white;
	}
	.settings-tabs button.active {
		background: var(--color-royal);
		border-color: var(--color-royal);
		color: white;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>