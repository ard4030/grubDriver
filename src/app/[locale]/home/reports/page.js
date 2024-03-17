
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/global/TranslationsProvider';
import AllCont from '@/components/reports/AllCont'
import React from 'react'
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