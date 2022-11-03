import { ROLES } from "./app-roles"

const ALL = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]

export interface PageData {
  path: string
  name: string
  roles: string[]
  auth: boolean
}

export const PERMISSION_MAP: PageData[] = [
  { path: '/', name: 'Home', roles: ALL, auth: false },
  { path: '/profile', name: 'Profile', roles: ALL, auth: true },
  { path: '/admin', name: 'Admin', roles: [ROLES.ADMIN], auth: true },
  { path: '/moderator', name: 'Moderator', roles: [ROLES.ADMIN, ROLES.MODERATOR], auth: true },
  { path: '/r/[subName]/[threadId]', name: '', roles: ALL, auth: false },
]