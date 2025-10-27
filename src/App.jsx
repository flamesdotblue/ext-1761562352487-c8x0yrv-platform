import React, { useState } from 'react';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Preview from './components/Preview';
import Footer from './components/Footer';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <main id="create" className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Generator onGenerate={setResult} />
          <Preview data={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
