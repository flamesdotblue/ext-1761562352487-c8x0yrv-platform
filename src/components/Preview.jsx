import React from 'react';
import { Download, Star, Copy, Share2 } from 'lucide-react';

export default function Preview({ data }) {
  if (!data) {
    return (
      <section id="preview" className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
          Your generated Short will appear here. Paste a link and click Generate.
        </div>
      </section>
    );
  }

  const scoreColor = data.viralScore > 85 ? 'text-emerald-300' : data.viralScore > 70 ? 'text-yellow-300' : 'text-orange-300';
  const barColor = data.viralScore > 85 ? 'bg-emerald-400' : data.viralScore > 70 ? 'bg-yellow-400' : 'bg-orange-400';

  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'viralshorts-ai-project.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyTitle = async () => {
    try { await navigator.clipboard.writeText(data.seo.title); } catch {}
  };
  const copyDesc = async () => {
    try { await navigator.clipboard.writeText(data.seo.description); } catch {}
  };

  return (
    <section id="preview" className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <div className="aspect-[9/16] w-full rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-fuchsia-500/30 to-pink-500/20 mix-blend-screen" />
          <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded bg-black/40 border border-white/10">{data.aspect} • ~{data.duration}s</div>
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="space-y-2">
              <div className="text-xs tracking-widest text-white/60 uppercase">Auto-subtitle preview</div>
              <div className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow">“This is where your most hype moment pops off 🔥💥”</div>
              <div className="text-white/70 text-sm">Music: {labelize(data.music)} · Emojis: {data.emojis ? 'On' : 'Off'} · Avatar: {data.avatar ? niceName(data.avatar) : 'None'}</div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className={`${barColor} h-full`} style={{ width: `${data.viralScore}%` }} />
            </div>
            <div className={`mt-2 text-sm font-semibold ${scoreColor}`}>Viral Potential: {data.viralScore}/100</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button onClick={download} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-white/90">
            <Download className="h-4 w-4" /> Export HD
          </button>
          <a href={data.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-medium hover:bg-white/5">
            <Share2 className="h-4 w-4" /> Source
          </a>
          <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-medium text-white/70">
            <Star className="h-4 w-4 text-yellow-300" /> AI Highlights
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-wider text-white/60 mb-2">AI SEO</div>
          <div className="flex items-start gap-2">
            <div className="font-semibold">Title:</div>
            <div className="flex-1">{data.seo.title}</div>
            <button onClick={copyTitle} className="text-white/70 hover:text-white"><Copy className="h-4 w-4" /></button>
          </div>
          <div className="mt-3">
            <div className="font-semibold mb-1">Description</div>
            <pre className="whitespace-pre-wrap text-white/80 text-sm bg-black/20 rounded p-3 border border-white/10 max-h-56 overflow-auto">{data.seo.description}</pre>
            <div className="mt-2 flex gap-2">
              <button onClick={copyDesc} className="text-xs rounded-md border border-white/15 px-2 py-1 text-white/80 hover:bg-white/5">Copy description</button>
              <span className="text-xs text-white/50">Optimized for Shorts SEO</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-wider text-white/60 mb-2">Thumbnail</div>
          <div className="flex items-center gap-4">
            <div className="h-24 w-16 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500 relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 grid place-items-center text-[10px] text-white/90 font-semibold rotate-[-8deg]">
                {data.thumbnail.text}
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm">Auto-picked: {data.thumbnail.note}</div>
              <div className="text-xs text-white/60">Source: {data.thumbnail.from}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function labelize(id) {
  const map = { trending: 'Trending Mix', phonk: 'Phonk Beats', lofi: 'Lo-Fi Chill', none: 'No Music' };
  return map[id] || id;
}

function niceName(id) {
  const map = { stewie: 'Stewie Griffin', speed: 'iShowSpeed', ronaldo: 'Ronaldo', custom: 'Custom Voice' };
  return map[id] || 'AI Voice';
}
