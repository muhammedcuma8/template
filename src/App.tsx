import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Router from './routes';
import { NotifyContextProvider } from './contexts/notify';
import { PermissionsProvider } from './contexts/permissions';
import { AnalyticsProvider } from "./contexts/analyticsContext";
import PrivacyPolicy from "./components/orginizim/privacyPolicy";

import useGTM from './hooks/useGTM'; // GTM custom hook import

const App = () => {
  const isAnalyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
  const isPrivacyPolicyEnabled = import.meta.env.VITE_PRIVACY_POLICY_ENABLED === "true";
  const isGTMEnabled = import.meta.env.VITE_GTM_ENABLED === "true";
  const gtmId = import.meta.env.VITE_GTM_ID || "GTM-59V8D6V9";


  useGTM({ enabled: isGTMEnabled, gtmId });



  return (
    <PermissionsProvider>
      <NotifyContextProvider>
        <AnalyticsProvider enabled={isAnalyticsEnabled}>
          <Router />
          <PrivacyPolicy enabled={isPrivacyPolicyEnabled} />
        </AnalyticsProvider>
      </NotifyContextProvider>
    </PermissionsProvider>
  );
};

export default App;
