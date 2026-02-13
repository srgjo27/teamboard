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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Team } from '@/types/team';
import { IconEdit } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useEditTeam } from '../hooks/use-edit-team';

interface EditTeamDialogProps {
    team: Team;
    trigger?: ReactNode;
}

export default function EditTeamDialog({ team, trigger }: EditTeamDialogProps) {
    const {
        open,
        setOpen,
        productManagers,
        data,
        setData,
        processing,
        errors,
        handleSubmit,
        handleClose,
    } = useEditTeam(team);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <Button variant="outline" size="sm">
                        <IconEdit className="mr-2 h-4 w-4" />
                        Edit Team
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Team</DialogTitle>
                    <DialogDescription>
                        Update team information
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-team-name">
                                Team Name{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="edit-team-name"
                                placeholder="e.g., Team Alpha"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={
                                    errors.name ? 'border-destructive' : ''
                                }
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-team-description">
                                Description
                            </Label>
                            <Textarea
                                id="edit-team-description"
                                placeholder="What does this team do?"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className={
                                    errors.description
                                        ? 'border-destructive'
                                        : ''
                                }
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-product-manager">
                                Product Manager{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.product_manager_id}
                                onValueChange={(value) =>
                                    setData('product_manager_id', value)
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.product_manager_id
                                            ? 'border-destructive'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select product manager" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productManagers.length > 0 ? (
                                        productManagers.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id.toString()}
                                            >
                                                {user.name} (
                                                {user.role?.display_name})
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-muted-foreground">
                                            No project managers available
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.product_manager_id && (
                                <p className="text-sm text-destructive">
                                    {errors.product_manager_id}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-team-color">Team Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="edit-team-color"
                                    type="color"
                                    value={data.color}
                                    onChange={(e) =>
                                        setData('color', e.target.value)
                                    }
                                    className="h-10 w-20"
                                />
                                <Input
                                    type="text"
                                    value={data.color}
                                    onChange={(e) =>
                                        setData('color', e.target.value)
                                    }
                                    placeholder="#3B82F6"
                                    className="flex-1"
                                />
                            </div>
                            {errors.color && (
                                <p className="text-sm text-destructive">
                                    {errors.color}
                                </p>
                            )}
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
