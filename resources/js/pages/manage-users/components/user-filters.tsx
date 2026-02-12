import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IconSearch } from '@tabler/icons-react';

interface UserFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedRole: string;
    onRoleChange: (value: string) => void;
    roles: Array<{ id: number; name: string; display_name: string }>;
}

export function UserFilters({
    searchQuery,
    onSearchChange,
    selectedRole,
    onRoleChange,
    roles,
}: UserFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
                <IconSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    className="w-[250px] pl-9"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Role Filter */}
            <Select value={selectedRole} onValueChange={onRoleChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                            {role.display_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
