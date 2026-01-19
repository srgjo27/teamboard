import { User } from '@/types/user';
import { useMemo } from 'react';

export function useUserStats(
    users: User[],
    uniqueRoles: (string | undefined)[],
) {
    return useMemo(() => {
        return {
            total: users.length,
            admins: users.filter((u) => u.role?.name === 'admin').length,
            roles: uniqueRoles.length,
        };
    }, [users, uniqueRoles]);
}
