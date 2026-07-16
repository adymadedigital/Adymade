export interface Toast {
	id: string;
	type: 'success' | 'warning' | 'error' | 'info';
	message: string;
	duration?: number;
}

export interface ConfirmOptions {
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	type?: 'danger' | 'warning' | 'info' | 'success';
}

class UIState {
	// Rune state for list of toasts
	toasts = $state<Toast[]>([]);

	// Rune state for confirmation dialog
	confirmDialog = $state<{
		show: boolean;
		title: string;
		message: string;
		confirmText: string;
		cancelText: string;
		type: 'danger' | 'warning' | 'info' | 'success';
		resolve: (value: boolean) => void;
	} | null>(null);

	// Add toast notification
	addToast(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info', duration = 4000) {
		const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
		const newToast: Toast = { id, type, message, duration };
		this.toasts = [...this.toasts, newToast];

		if (duration > 0) {
			setTimeout(() => {
				this.removeToast(id);
			}, duration);
		}
	}

	removeToast(id: string) {
		this.toasts = this.toasts.filter(t => t.id !== id);
	}

	// Toast convenience helpers
	success(message: string, duration?: number) {
		this.addToast(message, 'success', duration);
	}

	error(message: string, duration?: number) {
		this.addToast(message, 'error', duration);
	}

	warning(message: string, duration?: number) {
		this.addToast(message, 'warning', duration);
	}

	info(message: string, duration?: number) {
		this.addToast(message, 'info', duration);
	}

	// Trigger confirmation modal
	confirm(options: ConfirmOptions): Promise<boolean> {
		return new Promise((resolve) => {
			this.confirmDialog = {
				show: true,
				title: options.title,
				message: options.message,
				confirmText: options.confirmText || 'Confirm',
				cancelText: options.cancelText || 'Cancel',
				type: options.type || 'info',
				resolve: (val: boolean) => {
					resolve(val);
					this.confirmDialog = null;
				}
			};
		});
	}
}

export const uiState = new UIState();
