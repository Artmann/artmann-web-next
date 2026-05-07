interface EventProps {
  action: string
  category: string
  label: string
  value: number
}

export const trackingId = process.env.TRACKING_ID || ''

export function pageView(url: string): void {
  if (window.gtag) {
    window.gtag('config', trackingId, {
      page_path: url
    })
  }
}

export function event({ action, category, label, value }: EventProps): void {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}
