export interface Ticket {
    id: number;
    project_id: number;
    timeline_id: number | null;
    reporter_id: number;
    assigned_to: number | null;
    qa_assigned_to: number | null;
    title: string;
    description: string | null;
    ticket_number: string;
    type: 'bug' | 'feature' | 'task' | 'improvement' | 'documentation';
    priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
    status:
        | 'backlog'
        | 'todo'
        | 'pending'
        | 'inprogress'
        | 'qa-ready'
        | 'qa-test'
        | 'review'
        | 'done';
    due_date: string | null;
    estimated_hours: number | null;
    actual_hours: number | null;
    tags: string[] | null;
    attachments: string[] | null;
    story_points: number | null;
    resolved_at: string | null;
    closed_at: string | null;
    created_at: string;
    updated_at: string;
    project: {
        id: number;
        name: string;
        status: string;
    };
    timeline: {
        id: number;
        title: string;
        type: string;
    } | null;
    reporter: {
        id: number;
        name: string;
    };
    assigned_user: {
        id: number;
        name: string;
    } | null;
    qa_assigned_user: {
        id: number;
        name: string;
    } | null;
}

export interface Project {
    id: number;
    name: string;
    status: string;
    team_id: number;
    team: {
        users: {
            id: number;
            name: string;
        }[];
    };
}

export interface Timeline {
    id: number;
    project_id: number;
    title: string;
    type: string;
    status: string;
}

export interface TicketPageProps {
    tickets: Ticket[];
    projects: Project[];
    timelines: Timeline[];
}

export interface TicketFormData {
    project_id: string;
    timeline_id: string;
    title: string;
    description: string;
    type: Ticket['type'];
    priority: Ticket['priority'];
    status: Ticket['status'];
    assigned_to: string;
    due_date: string;
    estimated_hours: string;
    story_points: string;
    tags: string[];
}
