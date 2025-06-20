interface Window {
  analytics: {
    funnel: (event: string) => void;
    track: (event: string, properties?: any) => void;
    pageview: (properties?: any) => void;
    init: (key: string) => void;
  };
}