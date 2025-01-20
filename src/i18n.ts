import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18nData/en.json';
import fr from './i18nData/fr.json';
import tel from './i18nData/tel.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    tel: { translation: tel },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
