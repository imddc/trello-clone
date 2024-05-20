interface BoardIdProsp {
  params: {
    BoardId: string
  }
}

const BoardIdPage = async ({}: BoardIdProsp) => {
  return <div>Board Id Page</div>
}

export default BoardIdPage
