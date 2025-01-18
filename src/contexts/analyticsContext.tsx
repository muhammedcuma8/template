import React, { createContext, useContext, useEffect } from "react";

interface AnalyticsContextType {
  logEvent: (category: string, action: string, label?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
  enabled: boolean;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children, enabled }) => {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (enabled && trackingId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function (...args: any[]) {
          window.dataLayer.push(args);
        };
        window.gtag("js", new Date());
        window.gtag("config", trackingId);
      };
    }
  }, [enabled]);

  const logEvent = (category: string, action: string, label?: string) => {
    if (enabled && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ logEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};