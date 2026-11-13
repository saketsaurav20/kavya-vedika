import { useState, lazy, Suspense } from 'react';
import type { Shloka } from './types/canon';
import type { ForumThread } from './types/forum';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { HeroScrollStage } from './components/HeroScrollStage';
import { CanonExplorer } from './components/CanonExplorer';
import { SabhaForum } from './components/SabhaForum';
import { Footer } from './components/Footer';
import { ShlokaModal } from './components/ShlokaModal';
import { SearchModal } from './components/SearchModal';
import { ThreadDetailModal } from './components/ThreadDetailModal';

const BookshelfModal = lazy(() =>
  import('./components/bookshelf/BookshelfModal').then(module => ({ default: module.BookshelfModal }))
);

function AppContent() {
  const [selectedShloka, setSelectedShloka] = useState<Shloka | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookshelfOpen, setIsBookshelfOpen] = useState(false);
  const [activeThreadDetail, setActiveThreadDetail] = useState<ForumThread | null>(null);

  // Citation to pass to the Sabha forum composer when "Discuss in Sabha" is clicked
  const [sabhaInitialCitation, setSabhaInitialCitation] = useState<{
    shlokaId?: string;
    text: string;
    source: string;
  } | null>(null);

  const handleExploreCanon = () => {
    const el = document.getElementById('canon-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterSabha = () => {
    const el = document.getElementById('sabha-forum');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscussShlokaInSabha = (shloka: Shloka) => {
    setSabhaInitialCitation({
      shlokaId: shloka.id,
      text: shloka.devanagari[0],
      source: `${shloka.source} (${shloka.chapterOrHymn})`
    });
    handleEnterSabha();
  };

  return (
    <div className="min-h-screen bg-[#0b0a08] text-[#fbf8ee] selection:bg-[#e6c387]/30 selection:text-[#fbf8ee]">
      {/* Fixed Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookshelf={() => setIsBookshelfOpen(true)}
        activeSection="top"
      />

      {/* Main Content */}
      <main>
        {/* CheaperInference-style Scroll-Engine Hero with Pinned Artwork & Changing Typography */}
        <HeroScrollStage
          onExploreCanon={handleExploreCanon}
          onEnterSabha={handleEnterSabha}
          onOpenBookshelf={() => setIsBookshelfOpen(true)}
        />

        {/* Canonical Scriptures & Poets Explorer */}
        <CanonExplorer
          onSelectShloka={(shloka) => setSelectedShloka(shloka)}
        />

        {/* The Sabha (Interactive Scholarly Discussion Board) */}
        <SabhaForum
          initialCitationForNewThread={sabhaInitialCitation}
          onClearInitialCitation={() => setSabhaInitialCitation(null)}
        />
      </main>

      {/* Footer with Universal Shanti Inscription */}
      <Footer />

      {/* Shloka Verse Deep-Dive Modal */}
      <ShlokaModal
        shloka={selectedShloka}
        onClose={() => setSelectedShloka(null)}
        onDiscussInSabha={handleDiscussShlokaInSabha}
      />

      {/* Global Spotlight Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectShloka={(shloka) => setSelectedShloka(shloka)}
        onSelectThread={(thread) => setActiveThreadDetail(thread)}
      />

      {/* Thread Reader Modal (when opened from Search) */}
      <ThreadDetailModal
        thread={activeThreadDetail}
        onClose={() => setActiveThreadDetail(null)}
        onUpdateThread={(updated) => setActiveThreadDetail(updated)}
      />

      {/* 3D Interactive Bookshelf & Book Folio Sanctum */}
      {isBookshelfOpen && (
        <Suspense fallback={null}>
          <BookshelfModal
            isOpen={isBookshelfOpen}
            onClose={() => setIsBookshelfOpen(false)}
            onDiscussInSabha={(text, source) => {
              setIsBookshelfOpen(false);
              setSabhaInitialCitation({ text, source });
              handleEnterSabha();
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
