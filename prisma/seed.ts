import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
 await prisma.profile.deleteMany(); await prisma.work.deleteMany(); await prisma.photo.deleteMany();
 await prisma.profile.create({data:{name:'Go Youn-jung',role:'Actor · Artist · Muse',bio:'Korean actor known for nuanced performances, magnetic presence, and a quietly modern point of view.',born:'April 22, 1996 · Seoul, Korea',agency:'MMA Entertainment',awards:'Blue Dragon Series Awards · Rising Star'}});
 await prisma.work.createMany({data:[{title:'Resident Playbook',year:'2025',kind:'Drama',role:'Oh Yi-young',poster:'/images/img4.jpg'},{title:'Moving',year:'2023',kind:'Disney+ Series',role:'Jang Hui-soo',poster:'/images/img3.jpg'},{title:'Alchemy of Souls',year:'2022',kind:'Drama',role:'Naksu / Jin Bu-yeon',poster:'/images/img2.jpg'}]});
 await prisma.photo.createMany({data:[{src:'/images/img1.jpg',caption:'Daisy Tulle · Editorial',order:1},{src:'/images/img2.jpg',caption:'Period Frame · Drama',order:2},{src:'/images/img3.jpg',caption:'Studio Study · Portrait',order:3},{src:'/images/img4.jpg',caption:'Daylight · Preppy',order:4},{src:'/images/img5.jpg',caption:'Archive · Frame 05',order:5},{src:'/images/img6.jpg',caption:'Archive · Frame 06',order:6},{src:'/images/img7.jpg',caption:'Archive · Frame 07',order:7}]});
}
main().finally(() => prisma.$disconnect());
