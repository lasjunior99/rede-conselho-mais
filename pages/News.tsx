import React from 'react';
import { useData } from '../services/dataContext';
import { ExternalLink } from 'lucide-react';

const News: React.FC = () => {
  const { newsItems } = useData();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-l-4 border-brand-gold pl-6">
          <h1 className="text-3xl font-serif font-bold text-brand-blue mb-2">Notícias de Governança</h1>
          <p className="text-slate-600">
            Acompanhe as atualizações regulatórias, movimentos de mercado e destaques do IBGC.
          </p>
        </div>

        <div className="grid gap-6">
          {newsItems.map(item => (
            <div key={item.id} className="border-b border-slate-200 pb-6 last:border-0 hover:bg-slate-50 p-4 rounded transition">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-brand-blue text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  {item.source}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                   {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 mb-3 text-sm">{item.summary}</p>
              {item.link && item.link !== '#' && (
                <a href={item.link} className="inline-flex items-center text-sm text-brand-gold hover:underline font-medium">
                  Ler na íntegra <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </div>
          ))}

          {newsItems.length === 0 && (
            <p className="text-center text-slate-500 py-10">Nenhuma notícia recente cadastrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;