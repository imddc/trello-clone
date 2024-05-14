import React from 'react'
import { db } from '~/lib/db'

interface OrganizationIdPageProps {
  params: { organizationId: string }
}

const create = async (formData: FormData) => {
  'use server'

  const title = formData.get('title')
  const res = await db.board.findMany()
  console.log(title, res)
}

const OrganizationIdPage = ({
  params: { organizationId }
}: OrganizationIdPageProps) => {
  return (
    <div>
      OrganizationIdPage : {organizationId}
      <form action={create}>
        <label htmlFor="title">
          <input type="text" name="title" className="border" />
        </label>
      </form>
    </div>
  )
}

export default OrganizationIdPage
