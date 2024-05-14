import React, { PropsWithChildren } from 'react'

interface MarketingLayoutProps extends PropsWithChildren {}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="h-full bg-slate-100">
      {/* navbar */}
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>

      {/* footer */}
      {/* <footer className="bg-slate-100"></footer> */}
    </div>
  )
}

export default MarketingLayout
