import InputText from "../../components/basic/ktnTextInput";
import Button from "../../components/basic/ktnButton";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../services/auth/login/index.api";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { handleLoginMutated } from "./constant";
import { useHttp } from "../../hooks/useHttp";
import { useNotifyContext } from "../../contexts/notify";
import Captcha from "../../components/orginizim/captcha";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RECAPTCHA_CONFIG, RecaptchaType } from "../../configs/captcha";
import { useAnalytics } from "../../contexts/analyticsContext";
import { getCaptchaConfig } from "../../services/captcha/index.api";

type LoginFormInputs = {
  email: string;
  password: string;
  recaptchaV2Token: string;
  recaptchaV3Token: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const http = useHttp("sso-api");
  const { showNotification } = useNotifyContext();
  const loginMutation: any = useMutation(useLogin);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { logEvent } = useAnalytics();
  const [v3Token, setV3Token] = useState<string | null>(null);
  const [showV2, setShowV2] = useState<boolean | null>(null);
  const [captchaScenario, setCaptchaScenario] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Fetch CAPTCHA Scenario
  useEffect(() => {
    const fetchCaptchaConfig = async () => {
      try {
        const config = await getCaptchaConfig(http);
        setCaptchaScenario(config); // 'v3', 'v2', or 'v2_and_v3'
      } catch (error) {
        showNotification({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch captcha configuration",
        });
      }
    };
    if (RECAPTCHA_CONFIG.ENABLED) fetchCaptchaConfig();
  }, []);

  const onSubmit = (data: LoginFormInputs) => {
    if (!RECAPTCHA_CONFIG.ENABLED) {
      loginMutation.mutate({ ...data, http });
      return;
    }
  
    const handleCaptchaError = (message: string) => {
      showNotification({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    };
  
    if (captchaScenario === RecaptchaType.V3) {
      if (v3Token) {
        logEvent("Login", "captcha_success", "CAPTCHA v3 completed successfully");
        loginMutation.mutate({ ...data, http, recaptchaV3Token: v3Token });
      } else {
        handleCaptchaError("Captcha V3 Required");
      }
    } else if (captchaScenario === RecaptchaType.V2) {
      const v2Token = recaptchaRef.current?.getValue();
      if (v2Token) {
        logEvent("Login", "captcha_success", "CAPTCHA v2 completed successfully");
        loginMutation.mutate({ ...data, http, recaptchaV2Token: v2Token });
        recaptchaRef.current?.reset();
      } else {
        handleCaptchaError("Captcha V2 Required");
      }
    } else if (captchaScenario === RecaptchaType.V2_AND_V3) {
      if (v3Token) {
        logEvent("Login", "captcha_success", "CAPTCHA v3 completed successfully");
        loginMutation.mutate({ ...data, http, recaptchaV3Token: v3Token });
      } else {
        const v2Token = recaptchaRef.current?.getValue();
        if (v2Token) {
          logEvent("Login", "captcha_success", "CAPTCHA v2 completed successfully");
          loginMutation.mutate({ ...data, http, recaptchaV2Token: v2Token });
          recaptchaRef.current?.reset();
        } else {
          handleCaptchaError("Captcha V2 Required");
        }
      }
    }
  };
  

  useEffect(() => {
    handleLoginMutated(loginMutation, i18n, showNotification, navigate);
  }, [loginMutation.status, i18n, showNotification, navigate]);



  return (<>
    {RECAPTCHA_CONFIG.ENABLED && (captchaScenario === RecaptchaType.V3 || captchaScenario === RecaptchaType.V2_AND_V3) ? (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_CONFIG.SITE_KEY_V3}>
        <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          recaptchaRef={recaptchaRef}
          setV3Token={setV3Token}
          http={http}
          i18n={i18n}
          captchaScenario={captchaScenario}
        />
      </GoogleReCaptchaProvider>

    ) : (
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        recaptchaRef={recaptchaRef}
        setV3Token={setV3Token}
        http={http}
        i18n={i18n}
        captchaScenario={captchaScenario}
      />
    )}
  </>
  );
};

const LoginForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  recaptchaRef,

  setV3Token,
  http,
  i18n,

  captchaScenario,
}: any) => (
  <div className="pages-body login-page flex flex-column">
    <div className="align-self-center mt-auto mb-auto">
      <div className="pages-panel card flex flex-column">
        <h4>{i18n.t("Login.Welcome")}</h4>
        <div className="pages-detail mb-6 px-6">{i18n.t("Login.Title")}</div>

        <form className="space-f-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-panel flex flex-column px-3">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="text"
                  id="email"
                  defaultValue={"emilys"}
                  {...register("email", {
                    required: true,
                  })}
                />
                <label htmlFor="email">{i18n.t("Login.Username")}</label>
              </span>
            </div>
            {errors.email && errors.email.type === "required" && (
              <label className="p-error left-0 flex">
                {i18n.t("Login.Errors.EnterEmail")}
              </label>
            )}

            <div className="p-inputgroup mt-3">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="password"
                  id="password"
                  defaultValue={"emilyspass"}
                  {...register("password", { required: true })}
                />
                <label htmlFor="password">{i18n.t("Login.Password")}</label>
              </span>
            </div>
            {errors.password && errors.password.type === "required" && (
              <label className="p-error flex">
                {i18n.t("Login.Errors.Password")}
              </label>
            )}

            {/* reCAPTCHA Component */}
            {RECAPTCHA_CONFIG.ENABLED && (
              <Captcha
                siteKeyV2={RECAPTCHA_CONFIG.SITE_KEY_V2}
                size={RECAPTCHA_CONFIG.SIZE}
                ref={recaptchaRef}
                action="login_action"
                onChange={(token) => setV3Token(token)}
                threshold={0.5}
                http={http}
                captchaScenario={captchaScenario}
              />
            )}
          </div>
          <Button
            className="login-button mt-5 mb-5"
            icon="pi pi-arrow-right"
            label="Login"
            loading={false}
          />
        </form>
      </div>
    </div>
  </div>
);

export default Login;
