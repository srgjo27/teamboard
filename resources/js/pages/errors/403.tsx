import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { IconShieldLock } from '@tabler/icons-react';

export default function Error403() {
    return (
        <AppLayout>
            <Head title="403 - Access Denied" />

            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                            <IconShieldLock className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl">
                            Access Denied
                        </CardTitle>
                        <CardDescription>
                            You don't have permission to access this page
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                            <p className="text-sm text-muted-foreground">
                                This page is restricted to administrators only.
                                If you believe you should have access, please
                                contact your system administrator.
                            </p>
                        </div>

                        <div className="flex justify-center gap-2">
                            <Button asChild>
                                <Link href={dashboard()}>
                                    Back to Dashboard
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
