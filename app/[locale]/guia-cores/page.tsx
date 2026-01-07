'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function GuiaCoresPage() {
  const t = useTranslations('colorGuide');

  const indexItems = [
    { href: '#introducao', label: t('section1Title') },
    { href: '#roda-cores', label: t('section2Title') },
    { href: '#harmonias', label: t('section3Title') },
    { href: '#temperatura', label: t('section4Title') },
    { href: '#psicologia', label: t('section5Title') },
    { href: '#contraste', label: t('section6Title') },
    { href: '#aplicacao', label: t('section7Title') },
    { href: '#ferramentas', label: t('section8Title') },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-400 dark:to-amber-500">
            {t('pageTitle')}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-500 rounded-full mx-auto" />
          <p className="text-black dark:text-white/60 text-lg mt-4">
            {t('pageSubtitle')}
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 dark:from-amber-500 dark:to-amber-500" />
        </header>

        {/* Índice */}
        <nav className="mb-16 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t('index')}</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {indexItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Seção 1: Introdução */}
        <section id="introducao" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section1Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('introP1')}
            </p>
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('introP2')}
            </p>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('fundamentalConcepts')}</h4>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li><strong className="text-gray-800 dark:text-white">{t('hue')}:</strong> {t('hueDesc')}</li>
                <li><strong className="text-gray-800 dark:text-white">{t('saturation')}:</strong> {t('saturationDesc')}</li>
                <li><strong className="text-gray-800 dark:text-white">{t('lightness')}:</strong> {t('lightnessDesc')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seção 2: Roda de Cores */}
        <section id="roda-cores" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section2Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('colorWheelP1')}
            </p>

            {/* Cores Primárias, Secundárias e Terciárias */}
            <div className="grid md:grid-cols-3 gap-4 my-8">
              {/* Primárias */}
              <div className="p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">{t('primaryColors')}</h4>
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#EF4444' }} title="Vermelho" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#FACC15' }} title="Amarelo" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#3B82F6' }} title="Azul" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {t('primaryColorsDesc')}
                </p>
              </div>

              {/* Secundárias */}
              <div className="p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">{t('secondaryColors')}</h4>
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#F97316' }} title="Laranja" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#22C55E' }} title="Verde" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#A855F7' }} title="Roxo" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {t('secondaryColorsDesc')}
                </p>
              </div>

              {/* Terciárias */}
              <div className="p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">{t('tertiaryColors')}</h4>
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#F87171' }} title="Vermelho-Laranja" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#84CC16' }} title="Amarelo-Verde" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#6366F1' }} title="Azul-Roxo" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {t('tertiaryColorsDesc')}
                </p>
              </div>
            </div>

            {/* Roda Visual */}
            <div className="flex justify-center my-8">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {[
                    { color: '#FF0000', rotate: 0 },
                    { color: '#FF8000', rotate: 30 },
                    { color: '#FFFF00', rotate: 60 },
                    { color: '#80FF00', rotate: 90 },
                    { color: '#00FF00', rotate: 120 },
                    { color: '#00FF80', rotate: 150 },
                    { color: '#00FFFF', rotate: 180 },
                    { color: '#0080FF', rotate: 210 },
                    { color: '#0000FF', rotate: 240 },
                    { color: '#8000FF', rotate: 270 },
                    { color: '#FF00FF', rotate: 300 },
                    { color: '#FF0080', rotate: 330 },
                  ].map((segment, i) => (
                    <path
                      key={i}
                      d="M100,100 L100,20 A80,80 0 0,1 169.28,60 Z"
                      fill={segment.color}
                      transform={`rotate(${segment.rotate} 100 100)`}
                    />
                  ))}
                  <circle cx="100" cy="100" r="30" fill="white" className="dark:fill-[#060010]" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Harmonias */}
        <section id="harmonias" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section3Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('harmoniesP1')}
            </p>

            <div className="grid gap-6 mt-8">
              {/* Complementar */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#3B82F6' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#F97316' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{t('complementary')}</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      {t('complementaryDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Análoga */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#3B82F6' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#06B6D4' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#14B8A6' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{t('analogous')}</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      {t('analogousDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Triádica */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#EF4444' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#FACC15' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#3B82F6' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{t('triadic')}</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      {t('triadicDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Split-Complementar */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#3B82F6' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#EAB308' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#EF4444' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{t('splitComplementary')}</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      {t('splitComplementaryDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tetrádica */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#A855F7' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#F97316' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#14B8A6' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#FACC15' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{t('tetradic')}</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      {t('tetradicDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monocromática */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#1E3A8A' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#2563EB' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#60A5FA' }} />
                    <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: '#BFDBFE' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{t('monochromatic')}</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      {t('monochromaticDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 4: Temperatura */}
        <section id="temperatura" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section4Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('temperatureP1')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Cores Quentes */}
              <div className="p-6 bg-gradient-to-br from-red-500/10 to-yellow-500/10 dark:from-red-500/20 dark:to-yellow-500/20 border border-red-200 dark:border-red-500/30 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">{t('warmColors')}</h4>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#EF4444' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#F97316' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#FACC15' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#EC4899' }} />
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-white/70 text-sm">
                  <li><strong>{t('warmSensations')}:</strong> {t('warmSensationsText')}</li>
                  <li><strong>{t('warmUse')}:</strong> {t('warmUseText')}</li>
                  <li><strong>{t('warmEffect')}:</strong> {t('warmEffectText')}</li>
                </ul>
              </div>

              {/* Cores Frias */}
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-500/20 dark:to-green-500/20 border border-blue-200 dark:border-blue-500/30 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">{t('coolColors')}</h4>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#3B82F6' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#06B6D4' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#22C55E' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#A855F7' }} />
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-white/70 text-sm">
                  <li><strong>{t('coolSensations')}:</strong> {t('coolSensationsText')}</li>
                  <li><strong>{t('coolUse')}:</strong> {t('coolUseText')}</li>
                  <li><strong>{t('coolEffect')}:</strong> {t('coolEffectText')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 5: Psicologia */}
        <section id="psicologia" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section5Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('psychologyP1')}
            </p>

            <div className="grid gap-4 mt-8">
              {[
                { color: '#EF4444', name: t('red'), emotions: t('redEmotions'), brands: t('redBrands'), use: t('redUse') },
                { color: '#F97316', name: t('orange'), emotions: t('orangeEmotions'), brands: t('orangeBrands'), use: t('orangeUse') },
                { color: '#FACC15', name: t('yellow'), emotions: t('yellowEmotions'), brands: t('yellowBrands'), use: t('yellowUse') },
                { color: '#22C55E', name: t('green'), emotions: t('greenEmotions'), brands: t('greenBrands'), use: t('greenUse') },
                { color: '#3B82F6', name: t('blue'), emotions: t('blueEmotions'), brands: t('blueBrands'), use: t('blueUse') },
                { color: '#A855F7', name: t('purple'), emotions: t('purpleEmotions'), brands: t('purpleBrands'), use: t('purpleUse') },
                { color: '#EC4899', name: t('pink'), emotions: t('pinkEmotions'), brands: t('pinkBrands'), use: t('pinkUse') },
                { color: '#1F2937', name: t('black'), emotions: t('blackEmotions'), brands: t('blackBrands'), use: t('blackUse') },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-4 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60 mt-1">
                      <strong>{t('emotions')}:</strong> {item.emotions}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      <strong>{t('brands')}:</strong> {item.brands}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      <strong>{t('idealUse')}:</strong> {item.use}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 6: Contraste e Acessibilidade */}
        <section id="contraste" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section6Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('contrastP1')}
            </p>

            <div className="mt-8 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
              <h4 className="font-bold text-gray-800 dark:text-white mb-4">{t('wcagLevels')}</h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">AA</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('levelAA')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {t('levelAADesc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">AAA</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('levelAAA')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {t('levelAAADesc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white text-black rounded-lg border-2 border-green-500">
                  <p className="font-semibold">{t('goodContrast')}</p>
                  <p className="text-sm">{t('goodContrastDesc')}</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-red-500" style={{ backgroundColor: '#FEF08A', color: '#CA8A04' }}>
                  <p className="font-semibold">{t('badContrast')}</p>
                  <p className="text-sm">{t('badContrastDesc')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 rounded-xl">
              <p className="text-gray-700 dark:text-white/80">
                <strong>{t('contrastTip')}:</strong> {t('contrastTipText')}{' '}
                <Link href="/tools/contrast-checker" className="text-amber-600 dark:text-amber-400 underline hover:no-underline">
                  Contrast Checker
                </Link>{' '}
                {t('contrastTipText2')}
              </p>
            </div>
          </div>
        </section>

        {/* Seção 7: Aplicação Prática */}
        <section id="aplicacao" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section7Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('applicationP1')}
            </p>

            <div className="mt-8 space-y-6">
              {/* Regra 60-30-10 */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">
                  {t('rule603010')}
                </h4>
                <div className="flex gap-2 mb-4">
                  <div className="flex-[6] h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600 dark:text-white/60">60%</span>
                  </div>
                  <div className="flex-[3] h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3B82F6' }}>
                    <span className="text-sm font-semibold text-white">30%</span>
                  </div>
                  <div className="flex-1 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F97316' }}>
                    <span className="text-xs font-semibold text-white">10%</span>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-white/70">
                  <li><strong className="text-gray-800 dark:text-white">{t('dominantColor')}:</strong> {t('dominantColorDesc')}</li>
                  <li><strong className="text-gray-800 dark:text-white">{t('secondaryColor')}:</strong> {t('secondaryColorDesc')}</li>
                  <li><strong className="text-gray-800 dark:text-white">{t('accentColor')}:</strong> {t('accentColorDesc')}</li>
                </ul>
              </div>

              {/* Dicas Práticas */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">
                  {t('practicalTips')}
                </h4>
                <ul className="space-y-3 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>{t('tip1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>{t('tip2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>{t('tip3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>{t('tip4')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>{t('tip5')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="ferramentas" className="mb-8">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t('section8Title')}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              {t('toolsP1')}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Link 
                href="/tools#color-wheel"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black dark:hover:border-black transition-all"
              >
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black dark:group-hover:text-black transition-colors">
                  Color Wheel
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  {t('colorWheelToolDesc')}
                </p>
              </Link>

              <Link 
                href="/tools#image-picker"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black dark:hover:border-black transition-all"
              >
                <div className="text-3xl mb-3">🖼️</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black dark:group-hover:text-black transition-colors">
                  Image Color Picker
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  {t('imagePickerToolDesc')}
                </p>
              </Link>

              <Link 
                href="/tools/contrast-checker"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black dark:hover:border-black transition-all"
              >
                <div className="text-3xl mb-3">🔍</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black dark:group-hover:text-black transition-colors">
                  Contrast Checker
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  {t('contrastCheckerToolDesc')}
                </p>
              </Link>

              <Link 
                href="/tools/gradient-generator"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black dark:hover:border-black transition-all"
              >
                <div className="text-3xl mb-3">🌈</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black dark:group-hover:text-black transition-colors">
                  Gradient Generator
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  {t('gradientGeneratorToolDesc')}
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="text-center p-8 bg-gradient-to-r from-amber-500/10 to-amber-500/10 dark:from-amber-500/20 dark:to-amber-500/20 border border-amber-200 dark:border-amber-500/30 rounded-2xl mt-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('readyToCreate')}
          </h3>
          <p className="text-gray-600 dark:text-white/60 mb-6 max-w-lg mx-auto">
            {t('readyToCreateDesc')}
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 hover:from-gray-800 hover:to-black dark:hover:from-amber-600 dark:hover:to-amber-600 transition-all"
          >
            {t('exploreTools')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>

      </div>
    </main>
  );
}
