import Portfolio from '@/components/Portfolio';
import { prisma } from '@/lib/prisma';
export default async function Page() { const [profile, works, photos] = await Promise.all([prisma.profile.findFirst(), prisma.work.findMany({orderBy:{year:'desc'}}), prisma.photo.findMany({orderBy:{order:'asc'}})]); return <Portfolio profile={profile} works={works} photos={photos} />; }
