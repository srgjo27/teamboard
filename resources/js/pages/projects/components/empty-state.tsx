import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FolderRoot } from 'lucide-react';

interface EmptyStateProps {
    onCreateClick: () => void;
    canCreate?: boolean;
}

export function EmptyState({
    onCreateClick,
    canCreate = true,
}: EmptyStateProps) {
    return (
        <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
                <FolderRoot className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                    No projects found
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                    Try adjusting your filters
                    {canCreate ? ' or create a new project' : ''}
                </p>
                {canCreate && (
                    <Button onClick={onCreateClick}>
                        Create First Project
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
