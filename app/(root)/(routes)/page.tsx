'use client';

import { useEffect } from 'react';
import { useStoreModal } from '@/hooks/use-store-modal';

export default function SetupPage() {
  // 뭔가 redux의 useSelector 같은 느낌이랄까?!
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
