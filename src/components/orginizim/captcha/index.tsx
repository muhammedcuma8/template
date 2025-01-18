import React, { forwardRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { validateV3Token } from "../../../services/captcha/index.api";
import { AxiosInstance } from "axios";
import { RecaptchaType } from "../../../configs/captcha";

type CaptchaProps = {
  siteKeyV2: string;
  size?: "invisible" | "normal" | "compact"; // reCAPTCHA v2 size
  onChange?: (token: string | null) => void;
  action?: string;
  threshold?: number;
  http: AxiosInstance;
  captchaScenario: "v3" | "v2" | "v2_and_v3";
};

const Captcha = forwardRef<ReCAPTCHA, CaptchaProps>(
  (
    {
      siteKeyV2,
      size = "normal",
      onChange,
      action = "submit",
      threshold = 0.5,
      http,
      captchaScenario,
    },
    ref
  ) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [showRecaptchaV2, setShowRecaptchaV2] = useState(false);

    useEffect(() => {
      const handleV3TokenValidation = async () => {
        if (!executeRecaptcha) return;

        try {
          const token = await executeRecaptcha(action);
          if (captchaScenario === RecaptchaType.V3) {
            onChange?.(token);
            return;
          }
          const response = await validateV3Token({ token }, http);

          if (response.success && response.result.score >= threshold) {
            // If v3 score is valid, pass the token
            onChange?.(token);
          } else if (captchaScenario === RecaptchaType.V2_AND_V3) {
            // If score is low and v2 is allowed, show v2
            setShowRecaptchaV2(true);
          }
        } catch (error) {
          console.error("Error validating v3 token:", error);
          if (captchaScenario === RecaptchaType.V2_AND_V3) {
            setShowRecaptchaV2(true);
          }
        }
      };

      // Trigger V3 logic if the scenario includes it
      if (captchaScenario === RecaptchaType.V3 || captchaScenario === RecaptchaType.V2_AND_V3) {
        handleV3TokenValidation();
      }
    }, [executeRecaptcha, captchaScenario]);

    return (
      <>
        {/* Render V2 if scenario is v2 or v2_and_v3 */}
        {(captchaScenario === RecaptchaType.V2 || showRecaptchaV2) && (
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey={siteKeyV2}
              size={size}
              ref={ref}
              onChange={(token) => {
                onChange?.(token);
              }}
            />
          </div>
        )}
      </>
    );
  }
);

export default Captcha;
