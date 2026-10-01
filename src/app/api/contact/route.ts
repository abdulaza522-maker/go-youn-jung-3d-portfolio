import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim(); const email = String(body.email || '').trim(); const content = String(body.content || '').trim();
  if (!name || !email || !content || !email.includes('@')) return NextResponse.json({ error: 'Lengkapi form dengan email valid.' }, { status: 400 });
  const message = await prisma.message.create({ data: { name, email, content } });
  return NextResponse.json({ ok: true, id: message.id });
}
