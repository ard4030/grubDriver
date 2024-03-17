import AllCont from '@/components/dashboard/AllCont'
import React from 'react'
import TranslationsProvider from "@/components/global/TranslationsProvider";
import initTranslations from '@/app/i18n';

const i18nNamespace = ['Login'];

const page = async ({params : { locale }}) => {
  const { resources } = await initTranslations(locale,i18nNamespace);
  return (
    <TranslationsProvider namespaces={i18nNamespace} locale={locale} resources={resources}>
        <AllCont />
      </TranslationsProvider>
  )
}

export default page