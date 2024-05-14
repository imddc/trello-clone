import React, { PropsWithChildren } from 'react'

import FooterBar from './_components/footer'
import NavBar from './_components/navbar'

interface MarketingLayoutProps extends PropsWithChildren {}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="h-full bg-slate-100">
      {/* navbar */}
      <NavBar />
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>

      {/* footer */}
      <FooterBar />
    </div>
  )
}

export default MarketingLayout
