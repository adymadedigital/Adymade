// ─── Theme Store (Svelte 5 Runes) ──────────────────────────────────────
// Manages 'light' | 'dark' | 'system' theme with localStorage persistence.
// Uses $state/$derived runes — no writable stores.

const STORAGE_KEY = 'theme-preference';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

function getSystemTheme(): ResolvedTheme {
	if (typeof window === 'undefined') return 'dark';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeToDOM(resolved: ResolvedTheme) {
	if (typeof document === 'undefined') return;
	const html = document.documentElement;
	if (resolved === 'dark') {
		html.classList.add('dark');
	} else {
		html.classList.remove('dark');
	}
}

class ThemeStore {
	preference = $state<ThemePreference>('system');
	#systemTheme = $state<ResolvedTheme>(typeof window !== 'undefined' ? getSystemTheme() : 'dark');

	resolved = $derived<ResolvedTheme>(
		this.preference === 'system' ? this.#systemTheme : this.preference
	);

	#mediaQuery: MediaQueryList | null = null;
	#initialized = false;

	/** Call once in root +layout.svelte to hydrate from localStorage & start listeners */
	init() {
		if (this.#initialized || typeof window === 'undefined') return;
		this.#initialized = true;

		// Read persisted preference
		const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
		if (stored === 'light' || stored === 'dark' || stored === 'system') {
			this.preference = stored;
		}

		// Apply to DOM immediately
		applyThemeToDOM(this.resolved);

		// Listen for OS theme changes (for 'system' mode)
		this.#mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e: MediaQueryListEvent) => {
			this.#systemTheme = e.matches ? 'dark' : 'light';
			if (this.preference === 'system') {
				applyThemeToDOM(this.#systemTheme);
			}
		};
		this.#mediaQuery.addEventListener('change', handler);
	}

	/** Set the theme preference — persists to localStorage and applies to DOM */
	setPreference(pref: ThemePreference) {
		this.preference = pref;
		localStorage.setItem(STORAGE_KEY, pref);
		applyThemeToDOM(this.resolved);
	}
}

export const themeStore = new ThemeStore();
