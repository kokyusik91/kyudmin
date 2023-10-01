import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import SettingForm from './components/SettingForm';

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // store가 없으면 그냥 메인 페이지로 보낸다. 어차피 메인페이지에서 올바른 상점정보를 나타내줌
  if (!store) {
    redirect('/');
  }
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingForm initialData={store} />
      </div>
    </div>
  );
}
