'import dynamic from 'next/dynamic';
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Portfolio() {
  return (
    <main className="relative w-full h-screen bg-[#0b0b0c] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 text-white">
        <header className="flex justify-between items-center pointer-events-auto">
          <h1 className="text-2xl font-serif tracking-widest text-[#f49ab2]">GO YOUN-JUNG</h1>
          <nav className="space-x-6 text-sm uppercase tracking-wider text-neutral-400">
            <a href="#gallery" className="hover:text-white transition">Gallery</a>
            <a href="#about" className="hover:text-white transition">About</a>
          </nav>
        </header>
        <div className="max-w-xl pointer-events-auto bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <h2 className="text-4xl font-serif mb-2 text-[#f49ab2]">Go Youn-Jung</h2>
          <p className="text-neutral-300 text-sm leading-relaxed mb-4">
            South Korean actress and model represented by MMA. Known for Alchemy of Souls, Moving, and Death's Game.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/goyounjung/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#f49ab2] text-black font-medium text-sm rounded-lg hover:bg-white transition">Instagram</a>
          </div>
        </div>
      </div>
    </main>
  );
}
