import { PropsWithChildren } from 'react'

interface ListWrapper extends PropsWithChildren {}

const ListWrapper = ({ children }: ListWrapper) => {
  return <li className="h-full w-[272px] shrink-0 select-none">{children}</li>
}

export default ListWrapper
