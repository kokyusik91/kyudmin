'use client';

import { Button } from '@/components/ui/button';
import { ProductColumn } from './columns';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import AlertModal from '@/components/modals/alert-modal';

interface CellActionProps {
  data: ProductColumn;
}

export default function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Product Id copied to the clipboard. id : ${id}`);
  };

  // billboard Form과는 조금 다른 onDelete 함수
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      router.refresh();
      // 리다이렉트 필요없음...
      // router.push('/');
      toast.success('Product Deleted');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClonse={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'></span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/products/${data.id}`)
            }
          >
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
