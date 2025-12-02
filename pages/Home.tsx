
import React from 'react';
import { ArrowRight, ShieldCheck, Users, TrendingUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../services/dataContext';

const Home: React.FC = () => {
  const { blogPosts, newsItems, metrics } = useData();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-brand-blue text-white py-24 lg:py-32 overflow-hidden">
        {/* Decorative background image - kept as CSS background for performance, but handled gracefully */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 fade-in leading-tight">
            Somamos Valor com <br /> <span className="text-brand-gold">Governança</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 slide-up font-light">
            Uma rede que conecta pessoas, experiências e boas práticas de governança corporativa para transformar organizações.
          </p>
          <div className="flex justify-center space-x-4 slide-up">
            <Link to="/identidade" className="bg-brand-gold text-brand-blue px-8 py-3 rounded-sm font-semibold hover:bg-yellow-500 transition shadow-lg">
              Conheça a Rede
            </Link>
            <Link to="/contato" className="border border-white text-white px-8 py-3 rounded-sm font-semibold hover:bg-white hover:text-brand-blue transition">
              Junte-se a Nós
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Metrics Section */}
      {metrics.length > 0 && (
        <section className="bg-brand-gold py-8 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center md:justify-around gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-yellow-600/30">
              {metrics.map(metric => (
                <div key={metric.id} className="flex-1 min-w-[150px] pt-4 md:pt-0 first:pt-0">
                  <div className="text-3xl lg:text-4xl font-bold text-brand-blue mb-1">{metric.value}</div>
                  <div className="text-sm lg:text-base font-medium text-brand-blue/80 uppercase tracking-widest">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Purpose Icons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center p-6 rounded-lg hover:shadow-lg transition duration-300">
              <div className="bg-brand-blue/5 p-4 rounded-full mb-6">
                <Users className="h-10 w-10 text-brand-blue" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">Conexão</h3>
              <p className="text-slate-600 font-light">
                Unimos profissionais de elite para troca de experiências reais em conselhos e comitês.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:shadow-lg transition duration-300">
              <div className="bg-brand-blue/5 p-4 rounded-full mb-6">
                <ShieldCheck className="h-10 w-10 text-brand-gold" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">Governança Ética</h3>
              <p className="text-slate-600 font-light">
                Promovemos as melhores práticas de transparência, equidade e prestação de contas.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:shadow-lg transition duration-300">
              <div className="bg-brand-blue/5 p-4 rounded-full mb-6">
                <TrendingUp className="h-10 w-10 text-brand-blue" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">Visão de Futuro</h3>
              <p className="text-slate-600 font-light">
                Preparamos organizações para a longevidade com estratégias sustentáveis e inovadoras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & News */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Latest Blog Post */}
            <div>
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-2">
                <h2 className="text-2xl font-serif font-bold text-brand-blue">Destaque</h2>
                <Link to="/blog" className="text-brand-gold hover:text-brand-blue text-sm flex items-center">
                  Ver Blog <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              {blogPosts.length > 0 && (
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg mb-4 h-64">
                    {/* SEO Improvement: Enhanced ALT tag for content relevance */}
                    <img 
                      src={blogPosts[0].imageUrl} 
                      alt={`Imagem de capa do artigo: ${blogPosts[0].title}`} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center text-xs text-brand-gold mb-2 uppercase tracking-wide">
                    {new Date(blogPosts[0].date).toLocaleDateString()} • {blogPosts[0].author}
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3">
                    {blogPosts[0].excerpt}
                  </p>
                </div>
              )}
            </div>

            {/* News List */}
            <div>
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-2">
                <h2 className="text-2xl font-serif font-bold text-brand-blue">Notícias Recentes</h2>
                <Link to="/noticias" className="text-brand-gold hover:text-brand-blue text-sm flex items-center">
                  Mais Notícias <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-6">
                {newsItems.slice(0, 3).map(item => (
                  <div key={item.id} className="bg-white p-5 rounded border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold bg-brand-blue/10 text-brand-blue px-2 py-1 rounded">
                        {item.source}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white">Fortaleça sua Governança</h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
