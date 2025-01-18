import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import { CSSTransition } from "react-transition-group";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next"; // i18n hook
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";
import { CookieCategories } from "../../../utils/types/cookieCategory";
import getCookieCategories from "../../../configs/cookieCategories";


type PrivacyPolicyProps = {
  enabled: boolean;
};


const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ enabled }) => {
  const { t } = useTranslation(); // useTranslation hook for translations
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false); // Privacy Policy modal kontrolü
  const [cookieCategories, setCookieCategories] = useState<CookieCategories>({});
  const [cookiePreferences, setCookiePreferences] = useState<Record<string, boolean>>({});
  const [showCookieBanner, setShowCookieBanner] = useState(true); // Cookie banner görünürlüğü
  const [showWidgetIcon, setShowWidgetIcon] = useState(false); // Widget icon görünürlüğü
  const navigate = useNavigate();

  if (!enabled) {
    return null;
  }

  const navigateToFullPage = () => {
    setShowPrivacyPolicy(false); // Close the modal
    navigate("/privacy-policy"); // Navigate to the privacy policy page
  };

  const setInitialPreferences = (categories: CookieCategories) => {
    const initialPreferences: Record<string, boolean> = {};
    Object.keys(categories).forEach((category) => {
      const savedPreference = Cookies.get(`${category}Consent`);
      initialPreferences[category] = savedPreference ? savedPreference === "true" : categories[category].defaultValue || false;
    });
    setCookiePreferences(initialPreferences);

  }

  useEffect(() => {
    const consentAccepted = Cookies.get("CookieConsent") !== undefined
    setShowWidgetIcon(consentAccepted);
  }, []);

  useEffect(() => {
    const fetchCategoriesFromGTM = (event: any) => {
      if (event.data?.event === "cookie_categories_sent") {
        const categories: CookieCategories = event.data.categories;
        setCookieCategories(categories);
        setInitialPreferences(categories)

      }
    };

    const isEnable = import.meta.env.VITE_GTM_ENABLED;
    if (isEnable === "true") {
      window.addEventListener("message", fetchCategoriesFromGTM);

      return () => {
        window.removeEventListener("message", fetchCategoriesFromGTM);
      };
    } else {
      const categories: CookieCategories = getCookieCategories();

  
      const activeCategories: CookieCategories = Object.fromEntries(
        Object.entries(categories).filter(([_, category]) => category.isActive)
      );
      

      setCookieCategories(activeCategories);
      setInitialPreferences(categories)
    }
  }, []);

  const saveCookiePreferences = () => {
    Object.keys(cookiePreferences).forEach((category) => {
      Cookies.set(`${category}Consent`, cookiePreferences[category].toString(), { expires: 365 });
    });
    Cookies.set(`CookieConsent`, "true", { expires: 365 });

    setIsCookieSettingsOpen(false);
    setShowCookieBanner(false); // Cookie banner'ı kapat
    setShowWidgetIcon(true); // Widget iconu göster
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <>
      {/* Cookie Banner */}
      {showCookieBanner && (
        <CookieConsent
          location="bottom"
          buttonText={t("accept")}
          declineButtonText={t("decline")}
          enableDeclineButton
          style={{ background: "#2B373B", color: "#FFF" }}
          buttonStyle={{
            background: "#4CAF50",
            color: "#FFF",
            fontSize: "14px",
          }}
          declineButtonStyle={{
            background: "#d9534f",
            color: "#FFF",
            fontSize: "14px",
          }}
          onAccept={() => {
            const updatedPreferences: Record<string, boolean> = {};
            Object.keys(cookieCategories).forEach((category) => {
              updatedPreferences[category] = true;
              Cookies.set(`${category}Consent`, "true", { expires: 365 });
            });
            setCookiePreferences(updatedPreferences);
            setShowCookieBanner(false); // Cookie banner'ı kapat
            setShowWidgetIcon(true); // Widget iconu göster
          }}
          onDecline={() => {
            const updatedPreferences: Record<string, boolean> = {};
            Object.keys(cookieCategories).forEach((category) => {
              updatedPreferences[category] = false;
              Cookies.set(`${category}Consent`, "false", { expires: 365 });
            });
            setCookiePreferences(updatedPreferences);
            setShowCookieBanner(false); // Cookie banner'ı kapat
            setShowWidgetIcon(false);
          }}
        >
          {t("cookieBanner.text")}{" "}
          <button
            onClick={() => setShowPrivacyPolicy(true)}
            style={{ textDecoration: "underline", border: "none", background: "none", color: "#fff" }}
          >
            {t("cookieBanner.readPrivacyPolicy")}
          </button>
          {" | "}
          <button onClick={() => setIsCookieSettingsOpen(true)} style={{ textDecoration: "underline", border: "none", background: "none", color: "#fff" }}>
            {t("cookieBanner.manageSettings")}
          </button>
        </CookieConsent>
      )}

      {/* Widget Icon */}
      {showWidgetIcon && (
        <div
          className="privacy-widget"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => { setIsCookieSettingsOpen(true) }}
        >
          <i className="pi pi-shield" style={{ color: "#fff", fontSize: "24px" }} />
        </div>
      )}

      {/* Privacy Policy Modal */}
      <Dialog
        header={
          <div className="flex align-items-center gap-2">
            <i className="pi pi-lock text-primary text-2xl"></i>
            <span>{t("privacyPolicy.title")}</span>
          </div>
        }
        visible={showPrivacyPolicy}
        style={{ width: "50vw", borderRadius: "12px" }}
        onHide={() => setShowPrivacyPolicy(false)}

        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="Close" icon="pi pi-times" className="p-button-secondary p-button-text" onClick={() => setShowPrivacyPolicy(false)} />
            <Button label="View Full Page" icon="pi pi-external-link" className="p-button p-button-outlined" onClick={navigateToFullPage} />
          </div>
        }
      >
        <div className="p-4">
          <Tag className="mb-3" value={t("privacyPolicy.updatedTag")} severity="info" />
          <p className="text-lg line-height-3">{t("privacyPolicy.description")}</p>
          <h3>{t("privacyPolicy.yourRightsTitle")}</h3>
          <ul className="list-none pl-3">
            <li className="mb-2">✔ {t("privacyPolicy.rights.accessData")}</li>
            <li className="mb-2">✔ {t("privacyPolicy.rights.correctData")}</li>
            <li className="mb-2">✔ {t("privacyPolicy.rights.deleteData")}</li>
          </ul>
        </div>
      </Dialog>

      {/* Cookie Settings Modal */}
      <Dialog
        header={t("manageCookiePreferences")}
        visible={isCookieSettingsOpen}
        style={{ width: "40vw", borderRadius: "12px" }}
        onHide={() => setIsCookieSettingsOpen(false)}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label={t("cancel")} icon="pi pi-times" className="p-button-secondary" onClick={() => setIsCookieSettingsOpen(false)} />
            <Button label={t("savePreferences")} icon="pi pi-check" className="p-button-success" onClick={saveCookiePreferences} />
          </div>
        }
      >
        <div className="p-4">
          {Object.keys(cookieCategories).map((category, index) => (
            <React.Fragment key={index}>
              <Card className="mb-4">
                <div className="flex justify-content-between align-items-center">
                  <div className="flex align-items-center gap-2">
                    <i className={`pi pi-${category === "analytics" ? "chart-line" : category === "marketing" ? "bullhorn" : "cog"} text-primary`}></i>
                    <span className="font-medium">{t(cookieCategories[category].title)}</span>
                    <Badge value={cookieCategories[category].cookies.length} severity="info" />
                  </div>
                  <InputSwitch
                    checked={cookiePreferences[category]}
                    onChange={(e) => setCookiePreferences({ ...cookiePreferences, [category]: e.value ?? false })}
                    disabled={cookieCategories[category].readOnly}
                  />
                </div>
                <p className="mt-2">{t(cookieCategories[category].descriptionKey)}</p>
                <Button
                  label={expandedCategory === category ? t("hideDetails") : t("showDetails")}
                  className="p-button-text mt-2"
                  onClick={() => toggleCategory(category)}
                />
                <CSSTransition in={expandedCategory === category} timeout={300} classNames="fade" unmountOnExit>
                  <ul className="pl-4 mt-2">
                    {cookieCategories[category].cookies.map((cookie, idx) => (
                      <li key={idx} className="mb-2">
                        <strong>{cookie.name}:</strong> {t(cookie.descriptionKey)}
                      </li>
                    ))}
                  </ul>
                </CSSTransition>
              </Card>
              {index < Object.keys(cookieCategories).length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default PrivacyPolicy;
