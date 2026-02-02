export interface Project {
    id: number;
    name: string;
    description: string;
    status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
    start_date: string | null;
    end_date: string | null;
    team: {
        id: number;
        name: string;
        color: string;
        members_count: number;
        members: Array<{ id: number; name: string }>;
    };
    project_manager: {
        id: number;
        name: string;
    };
    creator: string;
    created_at: string;
    updated_at?: string;
    file_path: string | null;
    file_name: string | null;
    image_path: string | null;
    image_name: string | null;
    tickets?: import('./ticket').Ticket[];
    timelines?: import('./timeline').Timeline[];
}

export interface Team {
    id: number;
    name: string;
    color: string;
    product_manager_id: number;
    productManager: {
        id: number;
        name: string;
    };
}

export interface ProjectsProps {
    projects: Project[];
    teams: Team[];
}
