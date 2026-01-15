export const TICKET_PRIORITIES = {
    highest: { label: 'Highest', color: 'text-red-600', bgColor: 'bg-red-50' },
    high: { label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    medium: {
        label: 'Medium',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
    },
    low: { label: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' },
    lowest: { label: 'Lowest', color: 'text-gray-600', bgColor: 'bg-gray-50' },
} as const;

export type TicketPriority = keyof typeof TICKET_PRIORITIES;
