interface TeamMember {
    id: number;
    name: string;
    email: string;
}

export interface Team {
    id: number;
    name: string;
    description: string;
    color: string;
    members_count: number;
    creator: {
        id: number;
        name: string;
        email: string;
    };
    members: TeamMember[];
    created_at: string;
}
