import type { UserRole } from '@/src/domain/users/types';

export type ModuleKey = 'rotativo' | 'planos_mensais' | 'administracao';

const permissions: Record<UserRole, readonly ModuleKey[]> = {
  attendance: ['rotativo', 'planos_mensais'],
  operation: ['rotativo', 'planos_mensais'],
  administration: ['rotativo', 'planos_mensais', 'administracao'],
};

export function canAccessModule(role: UserRole, module: ModuleKey) {
  return permissions[role].includes(module);
}

export function modulesForRole(role: UserRole) {
  return permissions[role];
}
