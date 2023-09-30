'use client';

import { useEffect, useState } from 'react';

import StoreModal from '@/components/modals/store-modal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  // 오직 클라이언트 컴포넌트에서만 실행됨
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Layout는 서버컴포넌트이기 때문에 하이드레이션 에러를 방지하기 위해서 isMounted 상태를 만듬. 서버사이드에서는 모달 안뜸.
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}
