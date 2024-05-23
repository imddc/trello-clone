'use client'

import React, { useEffect, useState } from 'react'
import CardModal from '~/components/modal/card-modal'

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <CardModal />
    </>
  )
}

export default ModalProvider
