import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/global/TranslationsProvider';
import AllCont from '@/components/tasks/AllCont'
import React from 'react'
const i18nNamespace = ['Login'];

const page = async (props) => {
  const { resources } = await initTranslations(props.params.locale,i18nNamespace);

  return (
    <TranslationsProvider namespaces={i18nNamespace} locale={props.params.locale} resources={resources}>
      <AllCont fromdt={props?.searchParams?.fromdt} todt={props?.searchParams?.todt} />
    </TranslationsProvider>
  )
}

export default page