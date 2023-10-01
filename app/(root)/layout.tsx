import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // 유저 아이디만 가지고, 상점정보들중 첫번째 녀석을 가져옴
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  // 만약 유저가 로그인되있는 상태에서 루트에 접근하면, userId에 해당하는 store정보를 불러와서 리다이렉트 시킨다.
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
