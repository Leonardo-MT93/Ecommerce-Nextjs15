import Title from '@/components/ui/title/Title';
import AddressForm from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { Country } from '@/interfaces';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AddressPage() {
  const countries: Country[] = await getCountries();
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login')
  }

  const userAddress = await getUserAddress(session.user.id) ?? undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Address" subtitle="Delivery address" />

        <AddressForm countries={countries} userStoreAddress={userAddress} />

      </div>




    </div>
  );
}