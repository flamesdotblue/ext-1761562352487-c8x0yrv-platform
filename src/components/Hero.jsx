import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur text-sm">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Auto-enhanced with 3D social icons
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              ViralShorts.AI
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Turn any video into a viral 9:16 Short with AI — highlights, captions, music, avatars, and a predictive viral score.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#create" className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-medium hover:bg-white/90 transition">
                <Rocket className="h-5 w-5" />
                Create a Short
              </a>
              <a href="#create" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-medium hover:bg-white/5 transition">
                <Play className="h-5 w-5" />
                See how it works
              </a>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/70">
              <StatItem label="HD Exports" value="1080x1920" />
              <StatItem label="A/V Processing" value="AI-Powered" />
              <StatItem label="Avg. Time Saved" value="10x" />
              <StatItem label="Watermark" value="None" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
