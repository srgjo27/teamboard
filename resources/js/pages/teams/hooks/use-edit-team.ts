import { Team } from '@/types/team';
import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';

export function useEditTeam(team: Team) {
    const [open, setOpen] = useState(false);
    const { allUsers } = usePage<{ allUsers: User[] }>().props;

    const productManagers = useMemo(
        () => allUsers.filter((user) => user.role?.name === 'product_manager'),
        [allUsers],
    );

    const { data, setData, put, processing, errors, reset } = useForm({
        name: team.name,
        description: team.description || '',
        color: team.color,
        product_manager_id: team.product_manager?.id?.toString() || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/teams/${team.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    return {
        open,
        setOpen,
        productManagers,
        data,
        setData,
        processing,
        errors,
        handleSubmit,
        handleClose,
    };
}
