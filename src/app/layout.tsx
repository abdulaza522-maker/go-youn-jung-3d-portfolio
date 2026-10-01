import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Go Youn-jung | Official Portfolio', description: 'A cinematic archive of Go Youn-jung.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="id"><body>{children}</body></html>; }
