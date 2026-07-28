<script lang="ts">
	import { Sun, Moon, Monitor } from 'lucide-svelte';
	import { themeStore, type ThemePreference } from '$lib/stores/theme.svelte';

	const nextThemeMap: Record<ThemePreference, ThemePreference> = {
		light: 'dark',
		dark: 'system',
		system: 'light'
	};

	const iconMap: Record<ThemePreference, any> = {
		light: Sun,
		dark: Moon,
		system: Monitor
	};

	const labelMap: Record<ThemePreference, string> = {
		light: 'Light Theme',
		dark: 'Dark Theme',
		system: 'System Theme'
	};

	function cycleTheme() {
		const next = nextThemeMap[themeStore.preference];
		themeStore.setPreference(next);
	}
</script>

<button
	class="theme-toggle-btn"
	onclick={cycleTheme}
	type="button"
	aria-label={`Theme: ${labelMap[themeStore.preference]} (click to switch)`}
	title={`Theme: ${labelMap[themeStore.preference]}`}
>
	<svelte:component this={iconMap[themeStore.preference]} size={18} />
</button>
