import { Button } from '@/components/ui/button';
import { IconUserPlus } from '@tabler/icons-react';

export function PageHeader() {
    return (
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    User Management
                </h1>
                <p className="text-sm text-muted-foreground">
                    Manage team members, roles, and permissions
                </p>
            </div>

            <div className="flex items-center gap-2">
                <Button>
                    <IconUserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>
        </div>
    );
}
