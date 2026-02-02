import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IconSearch } from '@tabler/icons-react';

interface ArchiveFiltersProps {
    searchQuery: string;
    selectedStatus: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export function ArchiveFilters({
    searchQuery,
    selectedStatus,
    onSearchChange,
    onStatusChange,
}: ArchiveFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative">
                <IconSearch className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search archived projects..."
                    className="w-[250px] pl-8"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
}
