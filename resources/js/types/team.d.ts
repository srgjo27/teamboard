interface TeamMember {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export interface Team {
    id: number;
    name: string;
    description: string;
    color: string;
    members_count: number;
    creator: string;
    product_manager: {
        id: number;
        name: string;
    } | null;
    members: TeamMember[];
    created_at: string;
}
