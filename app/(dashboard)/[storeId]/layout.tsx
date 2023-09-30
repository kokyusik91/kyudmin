import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // store 정보 가져오기
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // store 체크
  if (!store) {
    redirect('/');
  }

  return (
    <>
      <div>This will be a navBar</div>
      {children}
    </>
  );
}
