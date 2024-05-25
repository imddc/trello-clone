import { ACTION, AuditLog } from 'prisma/prisma-client'

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityType, entityTitle } = log

  switch (action) {
    case ACTION.CREATE: {
      return `create ${entityType.toLocaleLowerCase()} "${entityTitle}"`
    }
    case ACTION.UPDATE: {
      return `update ${entityType.toLocaleLowerCase()} "${entityTitle}"`
    }
    case ACTION.DELETE: {
      return `delete ${entityType.toLocaleLowerCase()} "${entityTitle}"`
    }
    default:
      return `unknow action ${entityType.toLocaleLowerCase()} "${entityTitle}"`
  }
}
