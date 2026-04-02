import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Gamepad2 size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              UnblockedHub
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Popular</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">New</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Categories</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={closeGame}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <a
                    href={selectedGame.iframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <button
                    onClick={closeGame}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div 
                className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-500 ${
                  isFullscreen ? 'fixed inset-4 z-[100] m-0' : 'aspect-video w-full'
                }`}
              >
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  allow="autoplay; fullscreen; pointer-lock"
                  title={selectedGame.title}
                />
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/80 transition-colors"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedGame.title}</h2>
                  <p className="text-slate-400 mt-1">Category: <span className="text-indigo-400">{selectedGame.category}</span></p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-500/20">
                    Unblocked
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <header className="text-center space-y-4 py-12">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                  PLAY WITHOUT <span className="text-indigo-500">LIMITS</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Access a curated collection of the best unblocked games. No downloads, no installs, just pure gaming.
                </p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10"
                      onClick={() => handleGameClick(game)}
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 bg-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded text-white">
                            {game.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">
                          {game.title}
                        </h3>
                        <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-indigo-600 transition-colors">
                          <Gamepad2 size={16} />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <div className="inline-block p-4 bg-slate-900 rounded-full text-slate-500">
                      <Search size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300">No games found</h3>
                    <p className="text-slate-500">Try searching for something else or browse categories.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 size={20} className="text-indigo-500" />
            <span className="font-bold text-slate-300">UnblockedHub</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 UnblockedHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
