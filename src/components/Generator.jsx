import React, { useMemo, useState } from 'react';
import { Scissors, Music, Type, Wand2, Stars, Download, Film, User } from 'lucide-react';

const personalities = [
  { id: 'stewie', label: 'Stewie Griffin' },
  { id: 'speed', label: 'iShowSpeed' },
  { id: 'ronaldo', label: 'Ronaldo' },
  { id: 'custom', label: 'Custom Voice' },
];

const musicPacks = [
  { id: 'trending', label: 'Trending Mix' },
  { id: 'phonk', label: 'Phonk Beats' },
  { id: 'lofi', label: 'Lo-Fi Chill' },
  { id: 'none', label: 'No Music' },
];

export default function Generator({ onGenerate }) {
  const [url, setUrl] = useState('');
  const [personality, setPersonality] = useState('stewie');
  const [addAvatar, setAddAvatar] = useState(true);
  const [music, setMusic] = useState('trending');
  const [emojis, setEmojis] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [duration, setDuration] = useState(28);

  const valid = useMemo(() => url.trim().length > 0 && /(https?:\/\/)/.test(url), [url]);

  function simulateGenerate() {
    if (!valid || isProcessing) return;
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const baseSeed = url.length + (addAvatar ? 7 : 3) + (emojis ? 5 : 0) + (music === 'trending' ? 9 : music === 'phonk' ? 8 : 4);
      const random = (Math.sin(baseSeed) + 1) / 2; // 0..1
      const energy = Math.round(60 + random * 40); // 60..100

      const title = generateTitle(url, personality);
      const description = generateDescription(url, personality);

      const payload = {
        sourceUrl: url,
        aspect: '9:16',
        duration: Math.max(8, Math.min(60, duration)),
        captions: true,
        emojis,
        music,
        avatar: addAvatar ? personality : null,
        seo: { title, description },
        thumbnail: createThumbnailHint(url),
        viralScore: energy,
        timestamp: Date.now(),
      };

      onGenerate?.(payload);
      setIsProcessing(false);
      // Auto-scroll to preview
      const previewEl = document.getElementById('preview');
      if (previewEl) previewEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1400);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-white text-neutral-900 grid place-items-center">
          <Scissors className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Create your viral Short</h2>
          <p className="text-white/70 text-sm">Paste any YouTube, TikTok, Twitch or video URL. We auto-detect highlights, add captions, music, and avatars.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <label className="block text-sm font-medium text-white/80">Video URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none focus:ring-2 ring-white/20"
          />

          <div className="grid sm:grid-cols-3 gap-4 mt-2">
            <Field label="Music" icon={Music}>
              <select value={music} onChange={(e) => setMusic(e.target.value)} className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 ring-white/20">
                {musicPacks.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Personality" icon={User}>
              <select value={personality} onChange={(e) => setPersonality(e.target.value)} className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 ring-white/20">
                {personalities.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Length (sec)" icon={Film}>
              <input type="number" min={8} max={60} value={duration} onChange={(e) => setDuration(parseInt(e.target.value || '0'))} className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 ring-white/20" />
            </Field>
          </div>

          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            <Toggle checked={emojis} onChange={setEmojis} label="Match speech tone with emojis" icon={Type} />
            <Toggle checked={addAvatar} onChange={setAddAvatar} label="Add AI avatar/voice reaction" icon={Wand2} />
            <Toggle checked={true} disabled label="Auto-detect highlights & 9:16 crop" icon={Stars} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={simulateGenerate}
              disabled={!valid || isProcessing}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-medium hover:bg-white/90 transition disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-neutral-900 border-t-transparent animate-spin" /> Processing</span>
              ) : (
                <>
                  Generate Short
                </>
              )}
            </button>

            <a href="#preview" className="text-white/80 hover:text-white">Preview output</a>
          </div>
        </div>

        <div className="md:col-span-1 space-y-3">
          <HintCard icon={Type} title="Auto-subtitles + fonts" desc="Reads speech, adds word-by-word captions in viral fonts, and injects emojis based on sentiment." />
          <HintCard icon={Music} title="Trending music" desc="Auto-selects trending tracks and phonk beats with ducking around speech for clarity." />
          <HintCard icon={Scissors} title="Smart crop" desc="Reframes faces and action to perfect 9:16 composition with smooth transitions." />
          <HintCard icon={Download} title="HD exports" desc="One-click 1080x1920 export without watermarks. Ready for YouTube Shorts." />
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-white/70">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
          <Icon className="h-4 w-4" />
        </div>
        <div className="pl-8">{children}</div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, icon: Icon, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange?.(!checked)}
      className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left ${checked ? 'border-emerald-400/30 bg-emerald-400/10' : 'border-white/15 bg-white/5'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className={`h-5 w-5 rounded-full grid place-items-center ${checked ? 'bg-emerald-400 text-emerald-950' : 'bg-white/10 text-white/70'}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <span className="text-sm">{label}</span>
      <span className={`ml-auto text-xs ${checked ? 'text-emerald-300' : 'text-white/60'}`}>{checked ? 'On' : 'Off'}</span>
    </button>
  );
}

function HintCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-white text-neutral-900 grid place-items-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-white/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function generateTitle(url, persona) {
  const host = safeHost(url);
  const personaName = formatPersona(persona);
  return `Insane ${host} moment, narrated by ${personaName} | Viral Short`;
}

function generateDescription(url, persona) {
  const personaName = formatPersona(persona);
  return [
    `Highlights auto-detected and reframed to 9:16 with captions and music.`,
    `Narration/Reaction: ${personaName}.`,
    `Source: ${url}`,
    '',
    'Tags: #shorts #viral #ai #clips #trend',
  ].join('\n');
}

function createThumbnailHint(url) {
  return {
    text: 'Best Frame + Bold Overlay',
    note: 'Selected from peak emotion frame',
    from: safeHost(url)
  };
}

function safeHost(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return 'video'; }
}

function formatPersona(id) {
  const map = { stewie: 'Stewie Griffin', speed: 'iShowSpeed', ronaldo: 'Ronaldo', custom: 'Custom Voice' };
  return map[id] || 'AI Voice';
}
