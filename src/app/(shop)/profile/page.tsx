import { auth } from "@/auth.config";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if(!session?.user) {
        redirect('/auth/login');
    }
    return (
        <div>
            <Title title="Profile" />

            {
                session?.user && (
                    <div>
                        <h2>User</h2>
                        <p>{session.user.name}</p>
                        <p>{session.user.email}</p>
                    </div>
                )
            }
        </div>
    )
}