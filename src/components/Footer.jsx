import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-white">ViralShorts.AI</span> — Make every moment upload-ready.
        </div>
        <div className="flex items-center gap-4">
          <a href="#create" className="hover:text-white">Create</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">Shorts Tips</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
