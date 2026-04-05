declare global {
  interface Window {
    gtag: (...args: [string, string, Record<string, string | number>?]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}
