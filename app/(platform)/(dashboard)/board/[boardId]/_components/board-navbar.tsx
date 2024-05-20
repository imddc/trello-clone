import { Board } from 'prisma/prisma-client'
import BoardTitleForm from './board-title-form'

interface BoardNavBarProps {
  data: Board
}

const BoardNavBar = ({ data }: BoardNavBarProps) => {
  return (
    <div className="fixed top-14 z-40 flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <BoardTitleForm data={data} />
    </div>
  )
}

export default BoardNavBar
