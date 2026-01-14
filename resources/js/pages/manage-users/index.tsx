import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head } from '@inertiajs/react';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconDotsVertical,
    IconPlus,
} from '@tabler/icons-react';
import { Search } from 'lucide-react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Manage Users
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage all users in your organization.
                    </p>
                </div>

                <div className="flex w-full items-center justify-between gap-2">
                    <InputGroup className="max-w-sm">
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            {users.length} results
                        </InputGroupAddon>
                    </InputGroup>

                    <Button>
                        <IconPlus />
                        <span className="hidden lg:inline">New User</span>
                    </Button>
                </div>
            </div>

            <div className="px-6">
                <div className="overflow-hidden rounded-xl border bg-background">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40px] text-center">
                                    #
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Name
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="w-[100px]">
                                    Joined
                                </TableHead>
                                <TableHead className="w-[50px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-24 text-center"
                                    >
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="w-[40px] text-center font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.role?.display_name ??
                                                'No Role'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8 text-muted-foreground data-[state=open]:bg-muted"
                                                    >
                                                        <IconDotsVertical />
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-32"
                                                >
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Change Role
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                        Showing {users.length}{' '}
                        {users.length === 1 ? 'user' : 'users'}
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label
                                htmlFor="rows-per-page"
                                className="text-sm font-medium"
                            >
                                Rows per page
                            </Label>
                            <Select>
                                <SelectTrigger
                                    id="rows-per-page"
                                    className="w-20"
                                >
                                    <SelectValue
                                        defaultValue="10"
                                        placeholder="10"
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page 1 of 6
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden size-8 lg:flex"
                            >
                                <span className="sr-only">
                                    Go to first page
                                </span>
                                <IconChevronsLeft />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                            >
                                <span className="sr-only">
                                    Go to previous page
                                </span>
                                <IconChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                            >
                                <span className="sr-only">Go to next page</span>
                                <IconChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden size-8 lg:flex"
                            >
                                <span className="sr-only">Go to last page</span>
                                <IconChevronsRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
