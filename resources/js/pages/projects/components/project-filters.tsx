import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IconPlus, IconSearch } from '@tabler/icons-react';

interface ProjectFiltersProps {
    searchQuery: string;
    selectedStatus: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onCreateClick: () => void;
    canCreate?: boolean;
}

export function ProjectFilters({
    searchQuery,
    selectedStatus,
    onSearchChange,
    onStatusChange,
    onCreateClick,
    canCreate = true,
}: ProjectFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative">
                <IconSearch className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search projects..."
                    className="w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {canCreate && (
                <Button onClick={onCreateClick}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Create Project
                </Button>
            )}
        </div>
    );
}
