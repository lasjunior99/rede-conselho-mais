
import React, { useState, useEffect } from 'react';
import { useData } from '../services/dataContext';
import { CATEGORIES, MetaConfig, Metric } from '../types';
import { Lock, Plus, Trash2, Edit2, LogOut, LayoutDashboard, FileText, Newspaper, Users, Globe, BarChart } from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    isAdmin, login, logout, changePassword,
    members, addMember, removeMember,
    blogPosts, addBlogPost, removeBlogPost,
    newsItems, addNewsItem, removeNewsItem,
    metaTags, updateMetaTags,
    metrics, addMetric, removeMetric
  } = useData();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'BLOG' | 'NEWS' | 'SEO' | 'METRICS' | 'SETTINGS'>('MEMBERS');
  const [error, setError] = useState('');

  // Form States
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', specialization: CATEGORIES[0], photoUrl: '', linkedinUrl: '', email: '', profileUrl: '' });
  const [newPost, setNewPost] = useState({ title: '', author: '', content: '', excerpt: '', imageUrl: '' });
  const [newNews, setNewNews] = useState({ title: '', source: '', summary: '', link: '' });
  const [newPassword, setNewPassword] = useState('');
  const [newMetric, setNewMetric] = useState<Metric>({ id: '', label: '', value: '' });

  // SEO Form State
  const [seoForm, setSeoForm] = useState<MetaConfig>(metaTags);

  // Sync SEO form when metaTags change in context
  useEffect(() => {
    setSeoForm(metaTags);
  }, [metaTags]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(passwordInput)) {
      setError('');
    } else {
      setError('Senha incorreta.');
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({ ...newMember, id: Date.now().toString() });
    setNewMember({ name: '', role: '', bio: '', specialization: CATEGORIES[0], photoUrl: '', linkedinUrl: '', email: '', profileUrl: '' });
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost({ ...newPost, id: Date.now().toString(), date: new Date().toISOString() });
    setNewPost({ title: '', author: '', content: '', excerpt: '', imageUrl: '' });
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    addNewsItem({ ...newNews, id: Date.now().toString(), date: new Date().toISOString() });
    setNewNews({ title: '', source: '', summary: '', link: '' });
  };

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();
    addMetric({ ...newMetric, id: Date.now().toString() });
    setNewMetric({ id: '', label: '', value: '' });
  };

  const handleUpdateSEO = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetaTags(seoForm);
    alert('Meta Tags atualizadas e salvas com sucesso!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length >= 4) {
       changePassword(newPassword);
       setNewPassword('');
       alert('Senha alterada com sucesso!');
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 -mt-20"> {/* Offset for header height */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-blue p-3 rounded-full">
              <Lock className="text-white h-6 w-6" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-brand-blue mb-6">Acesso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha de Acesso</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 focus:border-brand-blue focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-2 rounded hover:bg-slate-800 transition">
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-full pb-20">
      
      {/* Admin Sub-Header / Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4">
             <div className="flex items-center mb-4 md:mb-0">
               <div className="bg-brand-blue text-white p-2 rounded mr-3">
                 <LayoutDashboard className="h-5 w-5" />
               </div>
               <div>
                 <h1 className="text-xl font-bold text-brand-blue">Painel de Controle</h1>
                 <p className="text-xs text-slate-500">Gerenciamento de conteúdo</p>
               </div>
             </div>
             
             <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full">
               <button 
                 onClick={() => setActiveTab('MEMBERS')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center ${activeTab === 'MEMBERS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <Users className="h-4 w-4 mr-2" /> Membros
               </button>
               <button 
                 onClick={() => setActiveTab('BLOG')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center ${activeTab === 'BLOG' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <FileText className="h-4 w-4 mr-2" /> Blog
               </button>
               <button 
                 onClick={() => setActiveTab('NEWS')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center ${activeTab === 'NEWS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <Newspaper className="h-4 w-4 mr-2" /> Notícias
               </button>
               <button 
                 onClick={() => setActiveTab('METRICS')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center ${activeTab === 'METRICS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <BarChart className="h-4 w-4 mr-2" /> Métricas
               </button>
               <button 
                 onClick={() => setActiveTab('SEO')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center ${activeTab === 'SEO' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <Globe className="h-4 w-4 mr-2" /> SEO
               </button>
               <button 
                 onClick={() => setActiveTab('SETTINGS')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center ${activeTab === 'SETTINGS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <Lock className="h-4 w-4 mr-2" /> Senha
               </button>
             </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* MEMBERS TAB */}
        {activeTab === 'MEMBERS' && (
          <div className="animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue border-b pb-2">Adicionar Novo Membro</h3>
              <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Nome Completo" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                <input placeholder="Cargo / Atuação" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required />
                <select className="border p-2 rounded focus:outline-none focus:border-brand-gold bg-white" value={newMember.specialization} onChange={e => setNewMember({...newMember, specialization: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="URL da Foto (https://...)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.photoUrl} onChange={e => setNewMember({...newMember, photoUrl: e.target.value})} required />
                <div className="col-span-1 md:col-span-2 text-xs text-slate-500 -mt-2 mb-2">
                  * Utilize um link direto de imagem.
                </div>
                
                <input placeholder="E-mail (visível apenas p/ admin)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} />
                <input placeholder="URL Perfil LinkedIn (opcional)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.linkedinUrl} onChange={e => setNewMember({...newMember, linkedinUrl: e.target.value})} />
                <input placeholder="URL Perfil Externo/Portfólio (opcional)" className="border p-2 rounded col-span-1 md:col-span-2 focus:outline-none focus:border-brand-gold" value={newMember.profileUrl} onChange={e => setNewMember({...newMember, profileUrl: e.target.value})} />
                
                <textarea placeholder="Mini Bio (max 80 palavras)" className="border p-2 rounded col-span-1 md:col-span-2 h-24 focus:outline-none focus:border-brand-gold" value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} required />
                
                <button type="submit" className="col-span-1 md:col-span-2 bg-brand-gold text-white font-bold py-3 rounded hover:bg-yellow-600 transition flex justify-center items-center shadow-sm">
                  <Plus className="h-4 w-4 mr-2" /> Cadastrar Membro
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 border-b font-medium text-slate-600 text-sm uppercase">Membro</th>
                    <th className="p-4 border-b font-medium text-slate-600 text-sm uppercase">Atuação</th>
                    <th className="p-4 border-b font-medium text-slate-600 text-right text-sm uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m.id} className="border-b last:border-0 hover:bg-slate-50 transition">
                      <td className="p-4 flex items-center">
                        <img src={m.photoUrl} alt="" className="w-10 h-10 rounded-full mr-3 object-cover bg-slate-200 border border-slate-200" />
                        <div>
                          <div className="font-semibold text-slate-800">{m.name}</div>
                          <div className="text-xs text-slate-500">{m.email || 'Sem e-mail'}</div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">{m.role}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => removeMember(m.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition" title="Excluir">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === 'BLOG' && (
           <div className="animate-fadeIn">
             <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue border-b pb-2">Novo Artigo</h3>
              <form onSubmit={handleAddPost} className="grid grid-cols-1 gap-4">
                <input placeholder="Título do Artigo" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Autor" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} required />
                  <input placeholder="URL da Imagem de Capa" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.imageUrl} onChange={e => setNewPost({...newPost, imageUrl: e.target.value})} required />
                </div>
                <input placeholder="Resumo (Excerpt)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} required />
                <textarea placeholder="Conteúdo completo" className="border p-2 rounded h-40 focus:outline-none focus:border-brand-gold" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required />
                <button type="submit" className="bg-brand-gold text-white font-bold py-3 rounded hover:bg-yellow-600 transition flex justify-center items-center shadow-sm">
                  <Plus className="h-4 w-4 mr-2" /> Publicar Artigo
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border-l-4 border-brand-blue border border-slate-100 hover:shadow-md transition">
                  <div>
                    <h4 className="font-bold text-slate-800">{post.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{new Date(post.date).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => removeBlogPost(post.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'NEWS' && (
           <div className="animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue border-b pb-2">Nova Notícia</h3>
              <form onSubmit={handleAddNews} className="grid grid-cols-1 gap-4">
                <input placeholder="Título da Notícia" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Fonte (ex: Mercado, IBGC)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newNews.source} onChange={e => setNewNews({...newNews, source: e.target.value})} required />
                  <input placeholder="Link Externo (opcional)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newNews.link} onChange={e => setNewNews({...newNews, link: e.target.value})} />
                </div>
                <textarea placeholder="Resumo da notícia" className="border p-2 rounded h-24 focus:outline-none focus:border-brand-gold" value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} required />
                <button type="submit" className="bg-brand-gold text-white font-bold py-3 rounded hover:bg-yellow-600 transition flex justify-center items-center shadow-sm">
                  <Plus className="h-4 w-4 mr-2" /> Publicar Notícia
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {newsItems.map(news => (
                <div key={news.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border-l-4 border-brand-gold border border-slate-100 hover:shadow-md transition">
                   <div>
                    <h4 className="font-bold text-slate-800">{news.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{news.source} • {new Date(news.date).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => removeNewsItem(news.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METRICS TAB */}
        {activeTab === 'METRICS' && (
           <div className="animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue border-b pb-2 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-brand-gold" /> Adicionar Métrica
              </h3>
              <form onSubmit={handleAddMetric} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  placeholder="Rótulo (ex: Membros)" 
                  className="border p-2 rounded focus:outline-none focus:border-brand-gold" 
                  value={newMetric.label} 
                  onChange={e => setNewMetric({...newMetric, label: e.target.value})} 
                  required 
                />
                <input 
                  placeholder="Valor (ex: 500+)" 
                  className="border p-2 rounded focus:outline-none focus:border-brand-gold" 
                  value={newMetric.value} 
                  onChange={e => setNewMetric({...newMetric, value: e.target.value})} 
                  required 
                />
                <button type="submit" className="bg-brand-gold text-white font-bold py-2 rounded hover:bg-yellow-600 transition flex justify-center items-center shadow-sm">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map(metric => (
                <div key={metric.id} className="bg-white p-6 rounded shadow-sm flex justify-between items-center border border-slate-100 relative group">
                   <div>
                    <span className="text-3xl font-bold text-brand-blue block">{metric.value}</span>
                    <span className="text-sm text-slate-500 uppercase tracking-wide">{metric.label}</span>
                  </div>
                  <button onClick={() => removeMetric(metric.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {metrics.length === 0 && <p className="text-slate-500 col-span-2 text-center">Nenhuma métrica cadastrada.</p>}
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'SEO' && (
           <div className="animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Form Side */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold mb-6 text-brand-blue border-b pb-2 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-brand-gold" /> Editar Meta Tags
                </h3>
                <form onSubmit={handleUpdateSEO} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Page Title</label>
                    <input 
                      className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold" 
                      value={seoForm.title} 
                      onChange={e => setSeoForm({...seoForm, title: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meta Description</label>
                    <textarea 
                      className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold h-24" 
                      value={seoForm.description} 
                      onChange={e => setSeoForm({...seoForm, description: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meta Keywords</label>
                    <input 
                      className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold" 
                      value={seoForm.keywords} 
                      onChange={e => setSeoForm({...seoForm, keywords: e.target.value})} 
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                     <h4 className="text-sm font-bold text-brand-blue mb-4">Open Graph (Social Media)</h4>
                     <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">OG:Title</label>
                          <input 
                            className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold bg-slate-50" 
                            value={seoForm.ogTitle} 
                            onChange={e => setSeoForm({...seoForm, ogTitle: e.target.value})} 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">OG:Description</label>
                          <input 
                            className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold bg-slate-50" 
                            value={seoForm.ogDescription} 
                            onChange={e => setSeoForm({...seoForm, ogDescription: e.target.value})} 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">OG:Image (URL)</label>
                          <input 
                            className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold bg-slate-50" 
                            value={seoForm.ogImage} 
                            onChange={e => setSeoForm({...seoForm, ogImage: e.target.value})} 
                          />
                        </div>
                         <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">OG:URL</label>
                          <input 
                            className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold bg-slate-50" 
                            value={seoForm.ogUrl} 
                            onChange={e => setSeoForm({...seoForm, ogUrl: e.target.value})} 
                          />
                        </div>
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-brand-gold text-white font-bold py-3 rounded hover:bg-yellow-600 transition shadow-sm mt-4">
                    Salvar Meta Tags
                  </button>
                </form>
              </div>

              {/* Preview Side - Visualizing current tags */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 mb-6">
                   <h3 className="text-lg font-semibold mb-4 text-brand-blue border-b pb-2">Tags Aplicadas (Visualização)</h3>
                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                       <thead className="bg-slate-50">
                         <tr>
                           <th className="p-2 border-b">Tag / Propriedade</th>
                           <th className="p-2 border-b">Conteúdo Atual</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         <tr><td className="p-2 font-mono text-xs text-slate-500">title</td><td className="p-2 truncate max-w-xs">{metaTags.title}</td></tr>
                         <tr><td className="p-2 font-mono text-xs text-slate-500">description</td><td className="p-2 truncate max-w-xs">{metaTags.description}</td></tr>
                         <tr><td className="p-2 font-mono text-xs text-slate-500">keywords</td><td className="p-2 truncate max-w-xs">{metaTags.keywords}</td></tr>
                         <tr><td className="p-2 font-mono text-xs text-slate-500">og:title</td><td className="p-2 truncate max-w-xs">{metaTags.ogTitle}</td></tr>
                         <tr><td className="p-2 font-mono text-xs text-slate-500">og:description</td><td className="p-2 truncate max-w-xs">{metaTags.ogDescription}</td></tr>
                         <tr><td className="p-2 font-mono text-xs text-slate-500">og:image</td><td className="p-2 truncate max-w-xs text-blue-500">{metaTags.ogImage}</td></tr>
                       </tbody>
                     </table>
                   </div>
                </div>

                {/* Social Card Preview */}
                <div className="bg-slate-100 p-6 rounded-lg border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-3">Prévia Visual (Compartilhamento)</p>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md max-w-sm mx-auto">
                    <div className="h-40 bg-slate-200 bg-cover bg-center relative" style={{backgroundImage: `url(${seoForm.ogImage})`}}>
                      {!seoForm.ogImage && <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">Sem Imagem</div>}
                    </div>
                    <div className="p-3 bg-slate-50 border-b border-slate-100">
                      <p className="text-xs text-slate-500 uppercase truncate">{seoForm.ogUrl.replace('https://', '')}</p>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-slate-800 leading-tight mb-1">{seoForm.ogTitle}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{seoForm.ogDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'SETTINGS' && (
          <div className="max-w-xl mx-auto animate-fadeIn">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold mb-6 text-brand-blue flex items-center">
                 <Lock className="mr-2 h-5 w-5" /> Alterar Senha de Administrador
              </h3>
              <form onSubmit={handlePasswordChange} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nova Senha</label>
                    <input 
                      type="password" 
                      className="w-full border p-3 rounded focus:outline-none focus:border-brand-blue" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite a nova senha (min. 4 caracteres)"
                    />
                 </div>
                 <button type="submit" className="w-full bg-brand-blue text-white px-4 py-3 rounded font-bold hover:bg-slate-800 transition shadow-lg">
                   Atualizar Senha
                 </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
