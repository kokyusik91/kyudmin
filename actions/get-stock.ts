import prismadb from '@/lib/prismadb';

export const getStock = async (storeId: string) => {
  const stockCout = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCout;
};
