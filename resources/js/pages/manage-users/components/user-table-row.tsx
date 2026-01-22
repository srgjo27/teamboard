import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { User } from '@/types/user';
import {
    IconDotsVertical,
    IconEdit,
    IconMail,
    IconShield,
    IconTrash,
} from '@tabler/icons-react';
import { ROLE_COLORS } from '../constants';

interface UserTableRowProps {
    user: User;
    index: number;
    currentUserId?: number;
    onEditUser: (user: User) => void;
    onChangeRole: (user: User) => void;
    onDeleteUser: (user: User) => void;
}

export function UserTableRow({
    user,
    index,
    currentUserId,
    onEditUser,
    onChangeRole,
    onDeleteUser,
}: UserTableRowProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('');
    };

    const isCurrentUser = currentUserId === user.id;

    return (
        <TableRow>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{user.name}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconMail className="h-3 w-3" />
                    {user.email}
                </div>
            </TableCell>
            <TableCell>
                {user.role ? (
                    <Badge
                        variant="outline"
                        className={`${ROLE_COLORS[user.role.name]?.bg} ${ROLE_COLORS[user.role.name]?.text} border-0`}
                    >
                        <IconShield className="mr-1 h-3 w-3" />
                        {user.role.display_name}
                    </Badge>
                ) : (
                    <Badge variant="outline">No Role</Badge>
                )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
                {user.created_at}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <IconDotsVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditUser(user)}>
                            <IconEdit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onChangeRole(user)}>
                            <IconShield className="mr-2 h-4 w-4" />
                            Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            className="text-destructive"
                            onClick={() => onDeleteUser(user)}
                            disabled={isCurrentUser}
                        >
                            <IconTrash className="mr-2 h-4 w-4" />
                            {isCurrentUser ? 'Cannot Delete Self' : 'Delete'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
