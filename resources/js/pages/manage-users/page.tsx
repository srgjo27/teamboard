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
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { AddUserDialog } from './components/add-user-dialog';
import { ChangeRoleDialog } from './components/change-role-dialog';
import { DeleteUserDialog } from './components/delete-user-dialog';
import { EditUserDialog } from './components/edit-user-dialog';
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
    roles: Array<{ id: number; name: string; display_name: string }>;
}

export default function ManageUsers({ users, roles }: ManageUsersProps) {
    const { auth } = usePage().props as any;
    const currentUserId = auth?.user?.id;

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [addUserOpen, setAddUserOpen] = useState(false);
    const [changeRoleOpen, setChangeRoleOpen] = useState(false);
    const [deleteUserOpen, setDeleteUserOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);

    const {
        searchQuery,
        setSearchQuery,
        selectedRole,
        setSelectedRole,
        filteredUsers,
        uniqueRoles,
    } = useUserFilters(users);

    const stats = useUserStats(users, uniqueRoles);

    const handleAddUser = () => {
        setAddUserOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setEditUserOpen(true);
    };

    const handleChangeRole = (user: User) => {
        setSelectedUser(user);
        setChangeRoleOpen(true);
    };

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setDeleteUserOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />

            <div className="p-6">
                <PageHeader onAddUser={handleAddUser} />

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
                        <UserTable
                            users={filteredUsers}
                            currentUserId={currentUserId}
                            onEditUser={handleEditUser}
                            onChangeRole={handleChangeRole}
                            onDeleteUser={handleDeleteUser}
                        />
                    </CardContent>
                </Card>

                <AddUserDialog
                    open={addUserOpen}
                    onOpenChange={setAddUserOpen}
                    availableRoles={roles}
                />

                <EditUserDialog
                    user={selectedUser}
                    open={editUserOpen}
                    onOpenChange={setEditUserOpen}
                />

                <ChangeRoleDialog
                    user={selectedUser}
                    open={changeRoleOpen}
                    onOpenChange={setChangeRoleOpen}
                    availableRoles={roles}
                />

                <DeleteUserDialog
                    user={selectedUser}
                    open={deleteUserOpen}
                    onOpenChange={setDeleteUserOpen}
                />
            </div>
        </AppLayout>
    );
}
