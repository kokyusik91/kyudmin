'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  // 오직 클라이언트 컴포넌트에서만 실행됨
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Layout는 서버컴포넌트이기 때문에 하이드레이션 에러를 방지하기 위해서 isMounted 상태를 만듬. 서버사이드에서는 모달 안뜸.
  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image fill className='object-cover' alt='Image' src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='kypvpc3e'>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={onClick}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
