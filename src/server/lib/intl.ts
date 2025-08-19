import enUS from '@/i18n/en.json';
import ukUA from '@/i18n/uk.json';

const locales = {
  'en-US': enUS,
  'uk-UA': ukUA,
};

export default async function getIntl(locale?: string) {
  const safeLocale = Object.keys(locales).includes(locale ?? '')
    ? (locale as keyof typeof locales)
    : 'en-US';

  return { locale: safeLocale, messages: locales[safeLocale] };
}
