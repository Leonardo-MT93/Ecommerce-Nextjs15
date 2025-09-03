
import { getPaginatedUsers } from '@/actions';
import Title from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {

  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }




  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Title title="Manage Users" />

      <div className="mb-10 overflow-x-auto">
        <UsersTable users={users} />
      </div>
    </div>
  );
}