import TranslationsProvider from "@/components/global/TranslationsProvider";
import HomeComponents from "@/components/home/HomeComponents";
import initTranslations from "../i18n";

const i18nNamespace = ['Login'];

export default async function Home({params : { locale }}) {
  const { resources } = await initTranslations(locale,i18nNamespace);
  return (
    <main>
      <TranslationsProvider namespaces={i18nNamespace} locale={locale} resources={resources}>
        <HomeComponents />
      </TranslationsProvider>
    </main>
  );
}
