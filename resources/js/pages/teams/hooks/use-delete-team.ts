import { Team } from '@/types/team';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export function useDeleteTeam(team: Team) {
    const [open, setOpen] = useState(false);

    const { delete: destroy, processing } = useForm({});

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(`/teams/${team.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        setOpen,
        processing,
        handleSubmit,
        handleClose,
    };
}
