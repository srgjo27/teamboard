import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { User } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { IconUserPlus } from '@tabler/icons-react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface AddMemberDialogProps {
    teamId: number;
    availableUsers: User[];
    trigger?: ReactNode;
}

export default function AddMemberDialog({
    teamId,
    availableUsers,
    trigger,
}: AddMemberDialogProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/teams/${teamId}/members`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
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
                    <Button size="sm" className="w-full">
                        <IconUserPlus className="mr-2 h-4 w-4" />
                        Add Member
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                    <DialogDescription>
                        Select a user to add to this team
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="user-select">
                                Select User{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.user_id}
                                onValueChange={(value) =>
                                    setData('user_id', value)
                                }
                            >
                                <SelectTrigger
                                    id="user-select"
                                    className={
                                        errors.user_id
                                            ? 'border-destructive'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Choose a user...">
                                        {data.user_id
                                            ? availableUsers.find(
                                                (u) =>
                                                    u.id.toString() ===
                                                    data.user_id,
                                            )?.name
                                            : 'Choose a user...'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {availableUsers.length > 0 ? (
                                        availableUsers.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id.toString()}
                                            >
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">
                                                            {user.name}
                                                        </span>
                                                        {user.role
                                                            ?.display_name && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    {' '}
                                                                    {
                                                                        user.role
                                                                            .display_name
                                                                    }
                                                                </span>
                                                            )}
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-muted-foreground">
                                            All users are already members of
                                            this team
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.user_id && (
                                <p className="text-sm text-destructive">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || availableUsers.length === 0}
                        >
                            {processing ? 'Adding...' : 'Add Member'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
