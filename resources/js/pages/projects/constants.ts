export const statusColors: Record<
    string,
    { label: string; color: string; bgColor: string }
> = {
    planning: {
        label: 'Planning',
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
    },
    in_progress: {
        label: 'In Progress',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
    },
    on_hold: {
        label: 'On Hold',
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
    },
    completed: {
        label: 'Completed',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
    },
};

export const statusDescriptions: Record<string, string> = {
    planning: 'Project setup phase',
    in_progress: 'Active development',
    on_hold: 'Temporarily paused',
    completed: 'Successfully delivered',
    cancelled: 'Project cancelled',
};
