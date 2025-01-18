import { useEffect } from "react";
import TagManager from "react-gtm-module";

type UseGTMProps = {
  enabled: boolean;
  gtmId: string;
};

const useGTM = ({ enabled, gtmId }: UseGTMProps) => {
  useEffect(() => {
    if (enabled) {
      TagManager.initialize({ gtmId });
      console.log("Google Tag Manager initialized with ID:", gtmId);
    }
  }, [enabled, gtmId]);
};



export default useGTM;
