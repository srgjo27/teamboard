import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head } from '@inertiajs/react';
import { PageHeader } from './components/page-header';
import { UserFilters } from './components/user-filters';
import { UserStatsCards } from './components/user-stats-cards';
import { UserTable } from './components/user-table';
import { useUserFilters } from './hooks/use-user-filters';
import { useUserStats } from './hooks/use-user-stats';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '#',
    },
];

interface ManageUsersProps {
    users: User[];
}

export default function ManageUsers({ users }: ManageUsersProps) {
    const {
        searchQuery,
        setSearchQuery,
        selectedRole,
        setSelectedRole,
        filteredUsers,
        uniqueRoles,
    } = useUserFilters(users);

    const stats = useUserStats(users, uniqueRoles);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />

            <div className="p-6">
                <PageHeader />

                <UserStatsCards stats={stats} />

                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle className="text-base">
                                    User Directory
                                </CardTitle>
                                <CardDescription>
                                    {filteredUsers.length} of {users.length}{' '}
                                    users
                                </CardDescription>
                            </div>

                            <UserFilters
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                selectedRole={selectedRole}
                                onRoleChange={setSelectedRole}
                                uniqueRoles={uniqueRoles}
                                users={users}
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <UserTable users={filteredUsers} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
