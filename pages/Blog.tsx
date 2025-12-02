import React from 'react';
import { useData } from '../services/dataContext';
import { User, Calendar } from 'lucide-react';

const Blog: React.FC = () => {
  const { blogPosts } = useData();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-brand-blue mb-4">Blog & Insights</h1>
          <p className="text-slate-600">
            Artigos técnicos, opiniões e tendências sobre o universo da governança corporativa.
          </p>
        </div>

        <div className="space-y-12">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition">
              <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center space-x-4 text-xs text-slate-400 mb-4 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-brand-blue mb-4">{post.title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
                </p>
                <button className="text-brand-gold font-semibold hover:text-brand-blue transition">
                  Ler artigo completo
                </button>
              </div>
            </article>
          ))}
          
          {blogPosts.length === 0 && (
            <p className="text-center text-slate-500">Ainda não há publicações.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;