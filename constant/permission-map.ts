import { ROLES } from "./app-roles"

const ALL = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]
export const PERMISSION_MAP = [
  { key: '/', value: ALL },
  { key: '/profile', value: ALL },
  { key: '/admin', value: [ROLES.ADMIN] },
  { key: '/moderator', value: [ROLES.ADMIN, ROLES.MODERATOR] },
  { key: '/r/[subName]/[threadId]', value: ALL },
]