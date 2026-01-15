import { TicketPriority } from './ticket-priorities';
import { TicketStatusId } from './ticket-statuses';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatusId;
    priority: TicketPriority;
    assignee: string | null;
    qaAssignee?: string;
    storyPoints: number;
    project: string;
    projectId: string;
}

export const MOCK_TICKETS: Ticket[] = [
    {
        id: 'ALPHA-106',
        title: 'Implement search functionality',
        description: 'Add full-text search with filters and sorting',
        status: 'backlog',
        priority: 'medium',
        assignee: null,
        storyPoints: 8,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'ALPHA-107',
        title: 'Email notification system',
        description: 'Setup email templates and notification triggers',
        status: 'backlog',
        priority: 'low',
        assignee: null,
        storyPoints: 5,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'BETA-205',
        title: 'Dark mode implementation',
        description: 'Add dark theme support across the mobile app',
        status: 'backlog',
        priority: 'low',
        assignee: null,
        storyPoints: 8,
        project: 'Project Beta',
        projectId: 'beta',
    },
    {
        id: 'ALPHA-101',
        title: 'Implement user authentication',
        description: 'Add JWT-based authentication for secure login',
        status: 'inprogress',
        priority: 'highest',
        assignee: 'David Wilson',
        storyPoints: 8,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'ALPHA-102',
        title: 'Design dashboard UI mockups',
        description:
            'Create wireframes and high-fidelity mockups for dashboard',
        status: 'review',
        priority: 'high',
        assignee: 'Frank Miller',
        storyPoints: 5,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'ALPHA-103',
        title: 'Setup PostgreSQL database',
        description: 'Configure database and create initial schema',
        status: 'done',
        priority: 'high',
        assignee: 'Emma Davis',
        storyPoints: 3,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'ALPHA-104',
        title: 'API endpoint for user profile',
        description: 'Create RESTful API for user profile management',
        status: 'qa-ready',
        priority: 'medium',
        assignee: 'Emma Davis',
        qaAssignee: 'Bob Smith',
        storyPoints: 5,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'ALPHA-105',
        title: 'Implement file upload feature',
        description: 'Allow users to upload profile pictures and documents',
        status: 'todo',
        priority: 'medium',
        assignee: null,
        storyPoints: 8,
        project: 'Project Alpha',
        projectId: 'alpha',
    },
    {
        id: 'BETA-201',
        title: 'Mobile app navigation structure',
        description: 'Design and implement bottom tab navigation',
        status: 'inprogress',
        priority: 'highest',
        assignee: 'Henry Wang',
        storyPoints: 5,
        project: 'Project Beta',
        projectId: 'beta',
    },
    {
        id: 'BETA-202',
        title: 'Push notification integration',
        description:
            'Integrate Firebase Cloud Messaging for push notifications',
        status: 'todo',
        priority: 'high',
        assignee: 'Isabel Chen',
        storyPoints: 8,
        project: 'Project Beta',
        projectId: 'beta',
    },
    {
        id: 'BETA-203',
        title: 'Offline data synchronization',
        description: 'Implement local storage and sync when online',
        status: 'pending',
        priority: 'medium',
        assignee: 'Henry Wang',
        storyPoints: 13,
        project: 'Project Beta',
        projectId: 'beta',
    },
    {
        id: 'BETA-204',
        title: 'UI component library setup',
        description: 'Setup reusable component library with React Native',
        status: 'qa-test',
        priority: 'medium',
        assignee: 'Jack Taylor',
        qaAssignee: 'Charlie Brown',
        storyPoints: 5,
        project: 'Project Beta',
        projectId: 'beta',
    },
];
