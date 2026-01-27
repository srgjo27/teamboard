import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { IconPlus } from '@tabler/icons-react';
import { FormEventHandler, useState } from 'react';

export default function CreateTeamDialog() {
    const [open, setOpen] = useState(false);
    const { allUsers } = usePage<{ allUsers: User[] }>().props;

    const productManagers = allUsers.filter(
        (user) => user.role?.name === 'product_manager',
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        color: '#3B82F6',
        product_manager_id: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/teams', {
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
                <Button>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Create Team
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                    <DialogDescription>
                        Set up a new team for your projects
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="team-name">
                                Team Name{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="team-name"
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
                            <Label htmlFor="team-description">
                                Description
                            </Label>
                            <Textarea
                                id="team-description"
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
                            <Label htmlFor="product-manager">
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
                            <Label htmlFor="team-color">Team Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="team-color"
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
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Team'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
