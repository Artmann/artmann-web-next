interface Window {
  analytics: {
    funnel: (event: string) => void
    track: (event: string, properties?: Record<string, unknown>) => void
    pageview: (properties?: Record<string, unknown>) => void
    init: (key: string) => void
  }
  gtag?: (...args: unknown[]) => void
}
