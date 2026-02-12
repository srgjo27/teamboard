import { User } from '@/types/user';
import { useMemo } from 'react';

export function useUserStats(
    users: User[],
    roles: Array<{ id: number; name: string; display_name: string }>,
) {
    return useMemo(() => {
        return {
            total: users.length,
            admins: users.filter((u) => u.role?.name === 'admin').length,
            roles: roles.length,
        };
    }, [users, roles]);
}
