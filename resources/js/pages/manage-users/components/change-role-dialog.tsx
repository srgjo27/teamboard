import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { IconShield } from '@tabler/icons-react';
import { useEffect } from 'react';

interface ChangeRoleDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    availableRoles: Array<{ id: number; name: string; display_name: string }>;
}

export function ChangeRoleDialog({
    user,
    open,
    onOpenChange,
    availableRoles,
}: ChangeRoleDialogProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        role_id: user?.role?.id || '',
    });

    // Update form when user changes
    useEffect(() => {
        if (user) {
            setData('role_id', user.role?.id || '');
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        put(`/manage-users/${user.id}/role`, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <IconShield className="h-5 w-5" />
                        Change User Role
                    </DialogTitle>
                    <DialogDescription>
                        Update the role for{' '}
                        <span className="font-semibold">{user?.name}</span>.
                        This will change their access permissions.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="role">Current Role</Label>
                            <div className="text-sm text-muted-foreground">
                                {user?.role?.display_name || 'No Role Assigned'}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role">New Role</Label>
                            <Select
                                value={data.role_id.toString()}
                                onValueChange={(value) =>
                                    setData('role_id', parseInt(value))
                                }
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableRoles.map((role) => (
                                        <SelectItem
                                            key={role.id}
                                            value={role.id.toString()}
                                        >
                                            {role.display_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role_id && (
                                <p className="text-sm text-destructive">
                                    {errors.role_id}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Role'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
