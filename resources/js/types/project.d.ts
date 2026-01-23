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
