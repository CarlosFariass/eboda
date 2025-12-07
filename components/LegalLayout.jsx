'use client';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function LegalLayout({ title, content }) {
  // Função para remover o primeiro H1 do conteúdo
  const removeFirstH1 = (content) => {
    return content.replace(/^#\s+.*$/m, '').trim();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Título da Página */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600 mb-4">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>

        {/* Conteúdo em Markdown */}
        <div className="prose prose-invert max-w-none">
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={{
              // Headings
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold text-black dark:text-white/60 mt-8 mb-4 first:mt-0" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold text-black dark:text-white/60 mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mt-5 mb-2" {...props} />
              ),

              // Parágrafos
              p: ({ node, ...props }) => (
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4" {...props} />
              ),

              // Listas
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside text-gray-800 dark:text-slate-300 space-y-2 mb-4 ml-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside text-gray-800 dark:text-slate-300 space-y-2 mb-4 ml-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-800 dark:text-slate-300" {...props} />
              ),

              // Links
              a: ({ node, ...props }) => (
                <a
                  className="text-purple-400 hover:text-pink-400 underline transition-colors"
                  {...props}
                />
              ),

              // Blockquotes
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-purple-500 pl-4 italic text-slate-400 my-4"
                  {...props}
                />
              ),

              // Código
              code: ({ node, inline, ...props }) => {
                if (inline) {
                  return (
                    <code
                      className="bg-slate-900 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30"
                      {...props}
                    />
                  );
                }
                return (
                  <code
                    className="block bg-slate-900 text-slate-100 p-4 rounded font-mono text-sm overflow-x-auto mb-4 border border-purple-500/30"
                    {...props}
                  />
                );
              },

              // Tabelas
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-purple-500/20" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="border border-purple-500/30 px-4 py-2 text-left text-purple-300 font-semibold" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-purple-500/30 px-4 py-2 text-slate-300" {...props} />
              ),

              // Linhas horizontais
              hr: ({ node, ...props }) => (
                <hr className="border-purple-500/30 my-6" {...props} />
              ),
            }}
          >
            {removeFirstH1(content)}
          </Markdown>
        </div>
      </div>
    </div>
  );
}