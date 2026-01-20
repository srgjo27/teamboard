export interface User {
    id: number;
    name: string;
    email: string;
    role: {
        id: number;
        name: string;
        display_name: string;
    } | null;
    created_at: string;
}
