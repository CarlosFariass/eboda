import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guia de Cores - Teoria das Cores | EBODA',
  description: 'Aprenda teoria das cores, harmonias, psicologia das cores e como aplicar em seus projetos de design. Guia completo para designers e desenvolvedores.',
  keywords: 'teoria das cores, roda de cores, harmonias de cores, psicologia das cores, cores complementares, cores análogas, design de cores',
};

export default function GuiaCoresPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-400 dark:to-pink-500">
            Guia de Cores
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            Domine a teoria das cores e transforme seus projetos com paletas harmoniosas e impactantes
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 dark:from-purple-500 dark:to-pink-500" />
        </header>

        {/* Índice */}
        <nav className="mb-16 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Índice</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {[
              { href: '#introducao', label: '1. Introdução à Teoria das Cores' },
              { href: '#roda-cores', label: '2. A Roda de Cores' },
              { href: '#harmonias', label: '3. Harmonias de Cores' },
              { href: '#temperatura', label: '4. Temperatura das Cores' },
              { href: '#psicologia', label: '5. Psicologia das Cores' },
              { href: '#contraste', label: '6. Contraste e Acessibilidade' },
              { href: '#aplicacao', label: '7. Aplicação Prática' },
              { href: '#ferramentas', label: '8. Ferramentas Úteis' },
            ].map((item) => (
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
            1. Introdução à Teoria das Cores
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              A teoria das cores é um conjunto de princípios usados para criar combinações harmoniosas de cores. 
              Ela explica como os humanos percebem as cores e os efeitos visuais de como as cores se misturam, 
              combinam ou contrastam entre si.
            </p>
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              Compreender a teoria das cores é essencial para designers, artistas, desenvolvedores e qualquer 
              pessoa que trabalhe com comunicação visual. Uma boa escolha de cores pode transmitir emoções, 
              criar hierarquia visual e melhorar a experiência do usuário.
            </p>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Conceitos Fundamentais</h4>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li><strong className="text-gray-800 dark:text-white">Matiz (Hue):</strong> O nome da cor pura (vermelho, azul, amarelo)</li>
                <li><strong className="text-gray-800 dark:text-white">Saturação:</strong> A intensidade ou pureza da cor</li>
                <li><strong className="text-gray-800 dark:text-white">Luminosidade:</strong> O quão clara ou escura é a cor</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seção 2: Roda de Cores */}
        <section id="roda-cores" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            2. A Roda de Cores
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              A roda de cores é uma representação circular das cores baseada nas três cores primárias. 
              Foi desenvolvida por Isaac Newton em 1666 e é a base para entender as relações entre cores.
            </p>

            {/* Cores Primárias, Secundárias e Terciárias */}
            <div className="grid md:grid-cols-3 gap-4 my-8">
              {/* Primárias */}
              <div className="p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Cores Primárias</h4>
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#EF4444' }} title="Vermelho" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#FACC15' }} title="Amarelo" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#3B82F6' }} title="Azul" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Não podem ser criadas pela mistura de outras cores. São a base de todas as outras.
                </p>
              </div>

              {/* Secundárias */}
              <div className="p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Cores Secundárias</h4>
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#F97316' }} title="Laranja" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#22C55E' }} title="Verde" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#A855F7' }} title="Roxo" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Criadas pela mistura de duas cores primárias em partes iguais.
                </p>
              </div>

              {/* Terciárias */}
              <div className="p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Cores Terciárias</h4>
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#F87171' }} title="Vermelho-Laranja" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#84CC16' }} title="Amarelo-Verde" />
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#6366F1' }} title="Azul-Roxo" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Criadas pela mistura de uma cor primária com uma secundária adjacente.
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
            3. Harmonias de Cores
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              Harmonias de cores são combinações que funcionam bem juntas, criando equilíbrio visual 
              e uma estética agradável. Existem várias harmonias clássicas baseadas nas posições das 
              cores na roda de cores.
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
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">Complementar</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      Duas cores opostas na roda de cores. Cria alto contraste e energia visual. 
                      Ideal para destacar elementos importantes.
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
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">Análoga</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      Três cores adjacentes na roda de cores. Cria designs harmoniosos e serenos. 
                      Muito usada em paisagens e natureza.
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
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">Triádica</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      Três cores equidistantes na roda de cores (formando um triângulo). 
                      Vibrante e equilibrada, comum em designs infantis e lúdicos.
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
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">Split-Complementar</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      Uma cor base e as duas cores adjacentes à sua complementar. 
                      Oferece contraste com menos tensão que a complementar pura.
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
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">Tetrádica (Retângulo)</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      Quatro cores formando um retângulo na roda. Rica em possibilidades, 
                      mas requer equilíbrio cuidadoso entre cores quentes e frias.
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
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">Monocromática</h4>
                    <p className="text-gray-600 dark:text-white/60 mt-1">
                      Variações de uma única cor (diferentes saturações e luminosidades). 
                      Elegante, coesa e fácil de implementar. Ideal para designs minimalistas.
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
            4. Temperatura das Cores
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              As cores são classificadas como quentes ou frias com base nas sensações psicológicas 
              que evocam. Essa divisão é fundamental para criar atmosferas específicas em seus projetos.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Cores Quentes */}
              <div className="p-6 bg-gradient-to-br from-red-500/10 to-yellow-500/10 dark:from-red-500/20 dark:to-yellow-500/20 border border-red-200 dark:border-red-500/30 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">Cores Quentes</h4>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#EF4444' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#F97316' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#FACC15' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#EC4899' }} />
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-white/70 text-sm">
                  <li><strong>Sensações:</strong> Energia, paixão, urgência, calor</li>
                  <li><strong>Uso:</strong> CTAs, promoções, alimentação, entretenimento</li>
                  <li><strong>Efeito:</strong> Parecem avançar visualmente</li>
                </ul>
              </div>

              {/* Cores Frias */}
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-500/20 dark:to-green-500/20 border border-blue-200 dark:border-blue-500/30 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">Cores Frias</h4>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#3B82F6' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#06B6D4' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#22C55E' }} />
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#A855F7' }} />
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-white/70 text-sm">
                  <li><strong>Sensações:</strong> Calma, confiança, profissionalismo, frescor</li>
                  <li><strong>Uso:</strong> Corporativo, saúde, tecnologia, finanças</li>
                  <li><strong>Efeito:</strong> Parecem recuar visualmente</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 5: Psicologia */}
        <section id="psicologia" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            5. Psicologia das Cores
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              Cada cor evoca emoções e associações específicas. Entender a psicologia das cores 
              ajuda a transmitir a mensagem certa para seu público-alvo.
            </p>

            <div className="grid gap-4 mt-8">
              {[
                { color: '#EF4444', name: 'Vermelho', emotions: 'Paixão, energia, urgência, perigo', brands: 'Netflix, YouTube, Coca-Cola', use: 'CTAs, promoções, alertas' },
                { color: '#F97316', name: 'Laranja', emotions: 'Entusiasmo, criatividade, aventura', brands: 'Amazon, Fanta, Harley-Davidson', use: 'Botões, destaques, esportes' },
                { color: '#FACC15', name: 'Amarelo', emotions: 'Otimismo, felicidade, atenção', brands: "McDonald's, IKEA, Snapchat", use: 'Avisos, promoções, infantil' },
                { color: '#22C55E', name: 'Verde', emotions: 'Natureza, crescimento, saúde, dinheiro', brands: 'Spotify, Starbucks, WhatsApp', use: 'Eco-friendly, saúde, sucesso' },
                { color: '#3B82F6', name: 'Azul', emotions: 'Confiança, segurança, profissionalismo', brands: 'Facebook, LinkedIn, Samsung', use: 'Corporativo, tech, finanças' },
                { color: '#A855F7', name: 'Roxo', emotions: 'Luxo, criatividade, mistério, sabedoria', brands: 'Twitch, Nubank, Cadbury', use: 'Premium, beleza, espiritualidade' },
                { color: '#EC4899', name: 'Rosa', emotions: 'Romance, feminilidade, juventude', brands: 'Barbie, T-Mobile, Lyft', use: 'Moda, beleza, romântico' },
                { color: '#1F2937', name: 'Preto', emotions: 'Elegância, poder, sofisticação', brands: 'Apple, Nike, Chanel', use: 'Luxo, moda, minimalismo' },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-4 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60 mt-1">
                      <strong>Emoções:</strong> {item.emotions}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      <strong>Marcas:</strong> {item.brands}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      <strong>Uso ideal:</strong> {item.use}
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
            6. Contraste e Acessibilidade
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              O contraste de cores é crucial para a legibilidade e acessibilidade. As diretrizes 
              WCAG (Web Content Accessibility Guidelines) definem padrões mínimos de contraste.
            </p>

            <div className="mt-8 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
              <h4 className="font-bold text-gray-800 dark:text-white mb-4">Níveis de Conformidade WCAG</h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">AA</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Nível AA (Mínimo Recomendado)</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Texto normal: 4.5:1 | Texto grande: 3:1
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">AAA</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Nível AAA (Enhanced)</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Texto normal: 7:1 | Texto grande: 4.5:1
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white text-black rounded-lg border-2 border-green-500">
                  <p className="font-semibold">Bom Contraste</p>
                  <p className="text-sm">Preto sobre branco (21:1)</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-red-500" style={{ backgroundColor: '#FEF08A', color: '#CA8A04' }}>
                  <p className="font-semibold">Contraste Ruim</p>
                  <p className="text-sm">Cores similares (1.47:1)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 rounded-xl">
              <p className="text-gray-700 dark:text-white/80">
                <strong>Dica:</strong> Use nossa ferramenta{' '}
                <Link href="/tools/contrast-checker" className="text-purple-600 dark:text-purple-400 underline hover:no-underline">
                  Contrast Checker
                </Link>{' '}
                para verificar se suas combinações de cores atendem aos padrões WCAG.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 7: Aplicação Prática */}
        <section id="aplicacao" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            7. Aplicação Prática
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              Aplicar teoria das cores na prática requer equilíbrio. Aqui estão algumas regras 
              e dicas para criar paletas efetivas.
            </p>

            <div className="mt-8 space-y-6">
              {/* Regra 60-30-10 */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">
                  A Regra 60-30-10
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
                  <li><strong className="text-gray-800 dark:text-white">60% - Cor Dominante:</strong> Fundos, áreas grandes (geralmente neutra)</li>
                  <li><strong className="text-gray-800 dark:text-white">30% - Cor Secundária:</strong> Elementos de suporte, seções</li>
                  <li><strong className="text-gray-800 dark:text-white">10% - Cor de Destaque:</strong> CTAs, links, ícones importantes</li>
                </ul>
              </div>

              {/* Dicas Práticas */}
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-4">
                  Dicas Práticas
                </h4>
                <ul className="space-y-3 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Comece com 2-3 cores e adicione variações de saturação/luminosidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Use cores neutras (branco, preto, cinza) como base para dar descanso visual</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Teste suas cores em diferentes dispositivos e condições de luz</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Considere daltonismo: evite vermelho/verde como única diferenciação</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Mantenha consistência: use as mesmas cores para as mesmas funções</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 8: Ferramentas */}
        <section id="ferramentas" className="mb-16">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            8. Ferramentas Úteis
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white/70 leading-relaxed">
              Use nossas ferramentas gratuitas para aplicar a teoria das cores em seus projetos:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Link 
                href="/tools#color-wheel"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Color Wheel
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  Roda de cores interativa para explorar harmonias e criar paletas.
                </p>
              </Link>

              <Link 
                href="/tools#image-picker"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <div className="text-3xl mb-3">🖼️</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Image Color Picker
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  Extraia cores de qualquer imagem para criar paletas inspiradas.
                </p>
              </Link>

              <Link 
                href="/tools/contrast-checker"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <div className="text-3xl mb-3">🔍</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Contrast Checker
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  Verifique a acessibilidade das suas combinações de cores (WCAG).
                </p>
              </Link>

              <Link 
                href="/tools/gradient-generator"
                className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <div className="text-3xl mb-3">🌈</div>
                <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Gradient Generator
                </h4>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  Crie gradientes personalizados e exporte para CSS ou Tailwind.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Pronto para criar suas paletas?
          </h3>
          <p className="text-gray-600 dark:text-white/60 mb-6 max-w-lg mx-auto">
            Aplique o que você aprendeu e comece a criar combinações de cores incríveis para seus projetos.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-500 dark:to-pink-500 hover:from-gray-800 hover:to-black dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all"
          >
            Explorar Ferramentas
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>

      </div>
    </main>
  );
}
