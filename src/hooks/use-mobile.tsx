import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}

export function isNativeMobile(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for Capacitor
  if (window.navigator.userAgent.includes('Capacitor')) {
    return true;
  }

  // Check for Capacitor global object
  if (typeof (window as any).Capacitor !== 'undefined') {
    return true;
  }

  // Check for Capacitor plugins
  if (typeof (window as any).CapacitorHttp !== 'undefined') {
    return true;
  }

  // Check if we're running in a WebView (common mobile app detection)
  const isWebView = /(iPhone|iPod|iPad|Android|BlackBerry|IEMobile|Opera Mini)/i.test(window.navigator.userAgent) &&
                   /Mobile|Tablet/i.test(window.navigator.userAgent) &&
                   !/Safari/i.test(window.navigator.userAgent);

  // Additional check for mobile viewport
  const isMobileViewport = window.innerWidth <= 768;

  return isWebView && isMobileViewport;
}