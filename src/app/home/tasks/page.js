import AllCont from '@/components/tasks/AllCont'
import React from 'react'

const page = (props) => {
  console.log("111",props)
  return (
    <AllCont fromdt={props?.searchParams?.fromdt} todt={props?.searchParams?.todt} />
  )
}

export default page