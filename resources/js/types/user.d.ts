export interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    } | null;
    created_at: string;
}
