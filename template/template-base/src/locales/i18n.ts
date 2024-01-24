import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import _ from "lodash";
export const TranslationFile = {
  COMMON: "common",
};
// export const TranslationPage = {
//   BASE: "base",
// };
const nsFile: string[] = _.values(TranslationFile);
// const nsPage: string[] = _.values(TranslationPage);
const supportedLngs: string[] = ["vi", "end"];
i18next
  .use(initReactI18next)
  .use(I18nextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .init({
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
    },
    fallbackLng: "vi",
    lng: "vi",
    defaultNS: TranslationFile.COMMON,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs,
    // ns: [...nsFile, ...nsPage],
    ns: [...nsFile],
  });
//   supportedLngs.forEach((lang:string)=>{
//     nsFile.forEach((n:string)=>{
//         i18next.addResourceBundle(lang,n, require(`./${lang}/${n}.json`))
//     })
//     nsPage.forEach((n:string)=>{
//         i18next.addResourceBundle(lang,n)
//     })
//   })

export default i18next;
