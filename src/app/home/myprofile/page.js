import AllCont from '@/components/myprofile/AllCont'
import { ProfileWrapper } from '@/context/ProfileContext'
import React from 'react'

const page = () => {
  return (
    <ProfileWrapper>
      <AllCont />
    </ProfileWrapper>
  )
}

export default page