import React, { useState } from 'react';
import { useData } from '../services/dataContext';
import { CATEGORIES } from '../types';
import { Lock, Plus, Trash2, Edit2, LogOut, LayoutDashboard, FileText, Newspaper, Users } from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    isAdmin, login, logout, changePassword,
    members, addMember, removeMember,
    blogPosts, addBlogPost, removeBlogPost,
    newsItems, addNewsItem, removeNewsItem 
  } = useData();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'BLOG' | 'NEWS' | 'SETTINGS'>('MEMBERS');
  const [error, setError] = useState('');

  // Form States
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', specialization: CATEGORIES[0], photoUrl: '', linkedinUrl: '', email: '', profileUrl: '' });
  const [newPost, setNewPost] = useState({ title: '', author: '', content: '', excerpt: '', imageUrl: '' });
  const [newNews, setNewNews] = useState({ title: '', source: '', summary: '', link: '' });
  const [newPassword, setNewPassword] = useState('');

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
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-brand-blue w-full md:w-64 flex-shrink-0 md:min-h-screen text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-widest mb-1">ADMIN</h2>
          <p className="text-xs text-brand-gold opacity-80">Painel de Controle</p>
        </div>
        <nav className="mt-4">
          <button 
            onClick={() => setActiveTab('MEMBERS')}
            className={`w-full text-left px-6 py-4 flex items-center hover:bg-white/10 ${activeTab === 'MEMBERS' ? 'bg-white/10 border-l-4 border-brand-gold' : ''}`}
          >
            <Users className="h-5 w-5 mr-3" /> Membros
          </button>
          <button 
            onClick={() => setActiveTab('BLOG')}
            className={`w-full text-left px-6 py-4 flex items-center hover:bg-white/10 ${activeTab === 'BLOG' ? 'bg-white/10 border-l-4 border-brand-gold' : ''}`}
          >
            <FileText className="h-5 w-5 mr-3" /> Blog
          </button>
          <button 
            onClick={() => setActiveTab('NEWS')}
            className={`w-full text-left px-6 py-4 flex items-center hover:bg-white/10 ${activeTab === 'NEWS' ? 'bg-white/10 border-l-4 border-brand-gold' : ''}`}
          >
            <Newspaper className="h-5 w-5 mr-3" /> Notícias
          </button>
          <button 
            onClick={() => setActiveTab('SETTINGS')}
            className={`w-full text-left px-6 py-4 flex items-center hover:bg-white/10 ${activeTab === 'SETTINGS' ? 'bg-white/10 border-l-4 border-brand-gold' : ''}`}
          >
             <LayoutDashboard className="h-5 w-5 mr-3" /> Configurações
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <button onClick={logout} className="flex items-center text-red-300 hover:text-white transition">
            <LogOut className="h-5 w-5 mr-2" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* MEMBERS TAB */}
        {activeTab === 'MEMBERS' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Users className="mr-2 text-brand-blue" /> Gerenciar Membros
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue">Adicionar Novo Membro</h3>
              <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Nome Completo" className="border p-2 rounded" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                <input placeholder="Cargo / Atuação" className="border p-2 rounded" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required />
                <select className="border p-2 rounded" value={newMember.specialization} onChange={e => setNewMember({...newMember, specialization: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="URL da Foto (https://...)" className="border p-2 rounded" value={newMember.photoUrl} onChange={e => setNewMember({...newMember, photoUrl: e.target.value})} required />
                <div className="col-span-1 md:col-span-2 text-xs text-slate-500 -mt-2 mb-2">
                  * Utilize um link direto de imagem.
                </div>
                
                <input placeholder="E-mail (opcional - visível apenas admin)" className="border p-2 rounded" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} />
                <input placeholder="URL Perfil LinkedIn (opcional)" className="border p-2 rounded" value={newMember.linkedinUrl} onChange={e => setNewMember({...newMember, linkedinUrl: e.target.value})} />
                <input placeholder="URL Perfil Externo/Portfólio (opcional)" className="border p-2 rounded col-span-1 md:col-span-2" value={newMember.profileUrl} onChange={e => setNewMember({...newMember, profileUrl: e.target.value})} />
                
                <textarea placeholder="Mini Bio (max 80 palavras)" className="border p-2 rounded col-span-1 md:col-span-2 h-24" value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} required />
                
                <button type="submit" className="col-span-1 md:col-span-2 bg-brand-gold text-white font-bold py-2 rounded hover:bg-yellow-600 transition flex justify-center items-center">
                  <Plus className="h-4 w-4 mr-2" /> Cadastrar Membro
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 border-b font-medium text-slate-600">Nome</th>
                    <th className="p-4 border-b font-medium text-slate-600">Cargo</th>
                    <th className="p-4 border-b font-medium text-slate-600 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="p-4 flex items-center">
                        <img src={m.photoUrl} alt="" className="w-8 h-8 rounded-full mr-3 object-cover bg-slate-200" />
                        <div>
                          <div className="font-semibold text-slate-700">{m.name}</div>
                          <div className="text-xs text-slate-400">{m.email || 'Sem e-mail'}</div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{m.role}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => removeMember(m.id)} className="text-red-400 hover:text-red-600 p-2">
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
           <div className="max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <FileText className="mr-2 text-brand-blue" /> Gerenciar Blog
            </h2>
             <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue">Novo Artigo</h3>
              <form onSubmit={handleAddPost} className="grid grid-cols-1 gap-4">
                <input placeholder="Título do Artigo" className="border p-2 rounded" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Autor" className="border p-2 rounded" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} required />
                  <input placeholder="URL da Imagem de Capa" className="border p-2 rounded" value={newPost.imageUrl} onChange={e => setNewPost({...newPost, imageUrl: e.target.value})} required />
                </div>
                <input placeholder="Resumo (Excerpt)" className="border p-2 rounded" value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} required />
                <textarea placeholder="Conteúdo completo" className="border p-2 rounded h-40" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required />
                <button type="submit" className="bg-brand-gold text-white font-bold py-2 rounded hover:bg-yellow-600 transition flex justify-center items-center">
                  <Plus className="h-4 w-4 mr-2" /> Publicar Artigo
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border-l-4 border-brand-blue">
                  <div>
                    <h4 className="font-bold text-slate-800">{post.title}</h4>
                    <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString()} por {post.author}</p>
                  </div>
                  <button onClick={() => removeBlogPost(post.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'NEWS' && (
           <div className="max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Newspaper className="mr-2 text-brand-blue" /> Gerenciar Notícias
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue">Nova Notícia</h3>
              <form onSubmit={handleAddNews} className="grid grid-cols-1 gap-4">
                <input placeholder="Título da Notícia" className="border p-2 rounded" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Fonte (ex: Mercado, IBGC)" className="border p-2 rounded" value={newNews.source} onChange={e => setNewNews({...newNews, source: e.target.value})} required />
                  <input placeholder="Link Externo (opcional)" className="border p-2 rounded" value={newNews.link} onChange={e => setNewNews({...newNews, link: e.target.value})} />
                </div>
                <textarea placeholder="Resumo da notícia" className="border p-2 rounded h-24" value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} required />
                <button type="submit" className="bg-brand-gold text-white font-bold py-2 rounded hover:bg-yellow-600 transition flex justify-center items-center">
                  <Plus className="h-4 w-4 mr-2" /> Publicar Notícia
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {newsItems.map(news => (
                <div key={news.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border-l-4 border-brand-gold">
                   <div>
                    <h4 className="font-bold text-slate-800">{news.title}</h4>
                    <p className="text-xs text-slate-500">{news.source} • {new Date(news.date).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => removeNewsItem(news.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'SETTINGS' && (
          <div className="max-w-2xl mx-auto animate-fadeIn">
             <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <LayoutDashboard className="mr-2 text-brand-blue" /> Configurações da Conta
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-brand-blue">Alterar Senha de Administrador</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                 <div>
                    <label className="block text-sm text-slate-600 mb-1">Nova Senha</label>
                    <input 
                      type="password" 
                      className="w-full border p-2 rounded" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                    />
                 </div>
                 <button type="submit" className="bg-brand-blue text-white px-4 py-2 rounded hover:bg-slate-800 transition">
                   Atualizar Senha
                 </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;