import { IconEdit } from '@tabler/icons-react';
import {
    AlertCircle,
    CheckCircle2,
    Circle,
    Clock,
    Layers,
    ListTodo,
    Target,
} from 'lucide-react';

export const TICKET_STATUSES = [
    { id: 'backlog', label: 'Backlog', icon: Layers, color: 'bg-gray-500' },
    { id: 'todo', label: 'To Do', icon: ListTodo, color: 'bg-slate-500' },
    { id: 'pending', label: 'Pending', icon: Clock, color: 'bg-yellow-500' },
    {
        id: 'inprogress',
        label: 'In Progress',
        icon: Circle,
        color: 'bg-blue-500',
    },
    {
        id: 'qa-ready',
        label: 'QA Ready',
        icon: Target,
        color: 'bg-purple-500',
    },
    {
        id: 'qa-test',
        label: 'QA Test',
        icon: AlertCircle,
        color: 'bg-orange-500',
    },
    { id: 'review', label: 'Review', icon: IconEdit, color: 'bg-indigo-500' },
    { id: 'done', label: 'Done', icon: CheckCircle2, color: 'bg-green-500' },
] as const;

export type TicketStatusId = (typeof TICKET_STATUSES)[number]['id'];
