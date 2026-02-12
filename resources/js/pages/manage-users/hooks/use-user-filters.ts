import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function useUserFilters(initialSearch = '', initialRole = 'all') {
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedRole, setSelectedRole] = useState<string>(initialRole);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                '/manage-users',
                {
                    search: searchQuery || undefined,
                    role: selectedRole !== 'all' ? selectedRole : undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['users'],
                }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedRole]);

    return {
        searchQuery,
        setSearchQuery,
        selectedRole,
        setSelectedRole,
    };
}
