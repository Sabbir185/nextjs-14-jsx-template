"use client";
import { createContext, useContext } from "react";
import { useI18n } from "./i18n";
const SiteContext = createContext({});

const SiteProvider = ({ children, site }) => {
  const i18n = useI18n()

  const siteSettingsData = {
    ...site,
    currency_code: i18n?.direction === "rtl" ? site?.currency_symbol : site?.currency_code
  };

  return (
    <SiteContext.Provider value={siteSettingsData}>
      {children}
    </SiteContext.Provider>
  );
};
export const useSite = () => useContext(SiteContext);
export default SiteProvider;
