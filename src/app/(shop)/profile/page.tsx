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

            <pre>{JSON.stringify(session.user, null, 2)}</pre>
            <h3 className="text-3xl font-bold mb-10">{session.user.role}</h3>
            <h3 className="text-3xl font-bold mb-10">{session.user.email}</h3>
            <h3 className="text-3xl font-bold mb-10">{session.user.name}</h3>
            {/* <h3 className="text-3xl font-bold mb-10">{session.user.image}</h3> */}
            <h3 className="text-3xl font-bold mb-10">{session.user.emailVerified}</h3>
        </div>
    )
}