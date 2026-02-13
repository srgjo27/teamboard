import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Team } from '@/types/team';
import { ReactNode } from 'react';
import { useDeleteTeam } from '../hooks/use-delete-team';

interface DeleteTeamDialogProps {
    team: Team;
    trigger?: ReactNode;
}

export default function DeleteTeamDialog({
    team,
    trigger,
}: DeleteTeamDialogProps) {
    const { open, setOpen, processing, handleSubmit, handleClose } =
        useDeleteTeam(team);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Team</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-foreground">
                            {team.name}
                        </span>
                        ? This action cannot be undone. All members will be
                        removed from this team.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing} onClick={handleClose}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? 'Deleting...' : 'Delete Team'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
