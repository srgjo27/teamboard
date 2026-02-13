import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';

const DEFAULT_COLOR = '#3B82F6';

export function useCreateTeam() {
    const [open, setOpen] = useState(false);
    const { allUsers } = usePage<{ allUsers: User[] }>().props;

    const productManagers = useMemo(
        () => allUsers.filter((user) => user.role?.name === 'product_manager'),
        [allUsers],
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        color: DEFAULT_COLOR,
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

    const handleClose = () => {
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
