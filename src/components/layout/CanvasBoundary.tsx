import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Rendered instead of `children` if the WebGL layer fails to initialise. */
  fallback?: ReactNode;
};

type State = { failed: boolean };

/**
 * Decorative WebGL components (Aurora and friends) throw during init when a
 * GL context is unavailable — headless browsers, GPU blocklists, WebGL turned
 * off, some VMs. Without a boundary that error unmounts the whole page, so the
 * visitor gets a blank screen instead of a portfolio. Contain it here and fall
 * back to a static gradient.
 */
export default class CanvasBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn('[CanvasBoundary] WebGL layer disabled:', error.message, info.componentStack);
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
