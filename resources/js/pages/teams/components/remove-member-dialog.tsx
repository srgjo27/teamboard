import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { CircleMinus } from 'lucide-react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface RemoveMemberDialogProps {
    teamId: number;
    userId: number;
    userName: string;
    trigger?: ReactNode;
}

export default function RemoveMemberDialog({
    teamId,
    userId,
    userName,
    trigger,
}: RemoveMemberDialogProps) {
    const [open, setOpen] = useState(false);

    const { delete: destroy, processing } = useForm({});

    const handleRemove: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(`/teams/${teamId}/members/${userId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <Button variant="ghost" size="sm">
                        <CircleMinus className="h-4 w-4 text-destructive" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Remove Team Member</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove this member from the
                        team?
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">
                        <span className="font-medium">{userName}</span> will be
                        removed from this team and will no longer have access to
                        team resources.
                    </p>
                </div>
                
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleRemove}
                        disabled={processing}
                    >
                        {processing ? 'Removing...' : 'Remove Member'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
