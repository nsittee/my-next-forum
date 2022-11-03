import { ROLES } from "./app-roles"

const ALL = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]
export const PERMISSION_MAP = [
  { key: '/', name: 'Home', value: ALL },
  { key: '/profile', name: 'Profile', value: ALL },
  { key: '/admin', name: 'Admin', value: [ROLES.ADMIN] },
  { key: '/moderator', name: 'Moderator', value: [ROLES.ADMIN, ROLES.MODERATOR] },
  { key: '/r/[subName]/[threadId]', name: '', value: ALL },
]