import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('StoreId  is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    // 수정할 권한이 없음을 던져 준다.
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    // 성공시!
    return NextResponse.json(color);
  } catch (error) {
    // development에서는 console만 찍자. production에서는 sentry
    console.log('[COLORS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// 모든 빌보드 GET 하기
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('StoreId  is required', { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    // 성공시!
    return NextResponse.json(colors);
  } catch (error) {
    // development에서는 console만 찍자. production에서는 sentry
    console.log('[COLORS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
