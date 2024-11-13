'use client';

import { Button } from '@mui/material';
import type { User } from '@/models';
import { useUserStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserTable } from '@/components';

export default function User() {
    const router = useRouter();
    const userStore = useUserStore();
    useEffect(() => {
        userStore.loadUser();
    }, []);
    return (
        <div>
            <h1 className="text-6xl">This is /user</h1>
            <UserTable users={userStore.users} />
            <Button
                onClick={() => {
                    router.push('/');
                }}
                variant="outlined"
            >
                This is button
            </Button>
        </div>
    );
}
