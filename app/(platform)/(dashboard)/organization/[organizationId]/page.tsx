import React from 'react'
import { db } from '~/lib/db'
import OrganizationForm from './form'

interface OrganizationIdPageProps {
  params: { organizationId: string }
}

const OrganizationIdPage = async ({
  params: { organizationId }
}: OrganizationIdPageProps) => {
  const boards = await db.board.findMany({
    orderBy: {
      createAt: 'desc'
    }
  })

  return (
    <div className="w-full">
      <OrganizationForm />

      {boards.map((item) => (
        <div key={item.id}>title: {item.title}</div>
      ))}
    </div>
  )
}

export default OrganizationIdPage
