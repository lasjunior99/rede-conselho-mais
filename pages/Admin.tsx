
import React, { useState, useEffect } from 'react';
import { useData } from '../services/dataContext';
import { CATEGORIES, MetaConfig, Metric, Tool } from '../types';
import { Lock, Plus, Trash2, LayoutDashboard, FileText, Newspaper, Users, Globe, BarChart, Briefcase, Download, Link as LinkIcon, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Admin: React.FC = () => {
  const { 
    isAdmin, isSuperAdmin, login, loginSuperAdmin, logout, changePassword,
    members, addMember, removeMember,
    blogPosts, addBlogPost, removeBlogPost,
    newsItems, addNewsItem, removeNewsItem,
    tools, addTool, removeTool,
    metaTags, updateMetaTags,
    metrics, addMetric, removeMetric
  } = useData();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Tab State
  type AdminTab = 'MEMBERS' | 'BLOG' | 'NEWS' | 'TOOLS' | 'METRICS' | 'SEO' | 'SETTINGS';
  const [activeTab, setActiveTab] = useState<AdminTab>('MEMBERS');

  // Super Admin Login State (Local to the page)
  const [superAdminInput, setSuperAdminInput] = useState('');
  const [showSuperPassword, setShowSuperPassword] = useState(false);
  const [superError, setSuperError] = useState('');

  // Form States
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', specialization: CATEGORIES[0], photoUrl: '', linkedinUrl: '', email: '', profileUrl: '' });
  const [newPost, setNewPost] = useState({ title: '', author: '', content: '', excerpt: '', imageUrl: '' });
  const [newNews, setNewNews] = useState({ title: '', source: '', summary: '', link: '' });
  const [newTool, setNewTool] = useState<Tool>({ id: '', title: '', description: '', fileUrl: '', date: '' });
  const [newPassword, setNewPassword] = useState('');
  const [newMetric, setNewMetric] = useState<Metric>({ id: '', label: '', value: '' });
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleSuperLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginSuperAdmin(superAdminInput)) {
      setSuperError('');
      setSuperAdminInput('');
    } else {
      setSuperError('Senha de Administrador Geral incorreta.');
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

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    addTool({ ...newTool, id: Date.now().toString(), date: new Date().toISOString() });
    setNewTool({ id: '', title: '', description: '', fileUrl: '', date: '' });
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
       alert('Senha de Membro/Acesso Geral alterada com sucesso!');
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header Background
      doc.setFillColor(15, 46, 99); // Brand Blue
      doc.rect(0, 0, 210, 40, 'F');
      
      // Header Text
      doc.setTextColor(201, 160, 79); // Brand Gold
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("REDE CONSELHO+", 105, 25, { align: "center" });
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Somamos Valor com Governança", 105, 32, { align: "center" });

      // Title
      doc.setTextColor(15, 46, 99);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("MANUAL EDITORIAL", 105, 60, { align: "center" });

      // Content Setup
      let y = 80;
      const margin = 20;
      const pageWidth = 210;
      const contentWidth = pageWidth - (margin * 2);
      
      const addSectionTitle = (title: string) => {
        if (y > 270) { doc.addPage(); y = 30; }
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 46, 99);
        doc.text(title, margin, y);
        y += 8;
      };

      const addParagraph = (text: string) => {
        if (y > 270) { doc.addPage(); y = 30; }
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        const splitText = doc.splitTextToSize(text, contentWidth);
        doc.text(splitText, margin, y);
        y += (splitText.length * 6) + 6;
      };

      const addBullet = (text: string) => {
        if (y > 270) { doc.addPage(); y = 30; }
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        const splitText = doc.splitTextToSize(`• ${text}`, contentWidth);
        doc.text(splitText, margin, y);
        y += (splitText.length * 6) + 2;
      };

      // Content Injection
      addParagraph("Este documento estabelece as diretrizes para a comunicação institucional da Rede Conselho+, garantindo alinhamento estratégico, coerência narrativa e posicionamento corporativo consistente.");
      
      y += 5;
      addSectionTitle("1. Público-Alvo");
      addParagraph("A linha editorial é direcionada a executivos, conselheiros, profissionais de governança, líderes empresariais, investidores e organizações orientadas por boas práticas.");

      addSectionTitle("2. Tom e Estilo Editorial");
      addBullet("Profissional, direto e baseado em evidências.");
      addBullet("Linguagem clara, objetiva e orientada à ação.");
      addBullet("Ênfase em frameworks reconhecidos (IBGC, ISO, OECD).");
      y += 5;

      addSectionTitle("3. Pilares de Conteúdo");
      addBullet("Governança Prática: Aplicação direta dos princípios e modelos decisórios.");
      addBullet("Inovação e Sustentabilidade: Integração de ESG e transformação digital.");
      addBullet("Conselhos em Ação: Processos, rituais e melhores práticas.");
      addBullet("Compliance e Riscos: Gestão de integridade e conformidade.");
      y += 5;

      addSectionTitle("10. Identidade Visual");
      addParagraph("A identidade visual deve refletir sobriedade, autoridade e modernidade.");
      addBullet("Azul Escuro: #0F2E63");
      addBullet("Dourado: #C9A04F");
      addBullet("Cinza Neutro: #7A7A7A");
      addBullet("Fontes: Montserrat, Lato e Open Sans.");

      // Save
      doc.save("Manual_Editorial_Rede_Conselho.pdf");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar PDF.");
    }
  };

  // Determine if the current tab requires Super Admin access
  const isSuperAdminTab = ['METRICS', 'SEO', 'SETTINGS'].includes(activeTab);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 -mt-20"> 
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-blue p-3 rounded-full">
              <Lock className="text-white h-6 w-6" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-brand-blue mb-6">Acesso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha de Acesso</label>
              <input 
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 pr-10 focus:border-brand-blue focus:outline-none"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 text-slate-400 hover:text-brand-blue"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
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
                 <p className="text-xs text-slate-500">
                   {isSuperAdmin ? 'Acesso Total (Super Admin)' : 'Acesso de Membro'}
                 </p>
               </div>
             </div>
             
             <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 w-full md:w-auto overflow-x-auto">
               
               {/* Group 1: Members/Content Access */}
               <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                 <button onClick={() => setActiveTab('MEMBERS')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'MEMBERS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                   <Users className="h-3 w-3 mr-1" /> Membros
                 </button>
                 <button onClick={() => setActiveTab('BLOG')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'BLOG' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                   <FileText className="h-3 w-3 mr-1" /> Blog
                 </button>
                 <button onClick={() => setActiveTab('NEWS')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'NEWS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                   <Newspaper className="h-3 w-3 mr-1" /> Notícias
                 </button>
                 <button onClick={() => setActiveTab('TOOLS')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'TOOLS' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                   <Briefcase className="h-3 w-3 mr-1" /> Ferramentas
                 </button>
               </nav>

               {/* Group 2: Admin Exclusive */}
               <nav className="flex space-x-1 bg-brand-blue/5 p-1 rounded-lg border border-brand-blue/10">
                 <button onClick={() => setActiveTab('METRICS')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'METRICS' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue hover:bg-brand-blue/10'}`}>
                   <BarChart className="h-3 w-3 mr-1" /> Métricas
                 </button>
                 <button onClick={() => setActiveTab('SEO')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'SEO' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue hover:bg-brand-blue/10'}`}>
                   <Globe className="h-3 w-3 mr-1" /> SEO
                 </button>
                 <button onClick={() => setActiveTab('SETTINGS')} className={`px-3 py-2 rounded-md text-xs font-bold transition flex items-center ${activeTab === 'SETTINGS' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue hover:bg-brand-blue/10'}`}>
                   <Lock className="h-3 w-3 mr-1" /> Senha
                 </button>
               </nav>

             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SUPER ADMIN GUARD - Check if tab requires super admin and user is not super admin */}
        {isSuperAdminTab && !isSuperAdmin ? (
           <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg border border-red-100 text-center animate-fadeIn">
              <div className="flex justify-center mb-4">
                <div className="bg-red-50 p-4 rounded-full">
                   <ShieldAlert className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Área Restrita (Admin Geral)</h3>
              <p className="text-slate-500 text-sm mb-6">Esta área contém configurações sensíveis do site e requer credenciais de nível superior.</p>
              
              <form onSubmit={handleSuperLogin} className="space-y-4">
                <div className="relative text-left">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Senha de Super Admin</label>
                  <input 
                    type={showSuperPassword ? "text" : "password"}
                    value={superAdminInput}
                    onChange={(e) => setSuperAdminInput(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 pr-10 focus:border-red-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowSuperPassword(!showSuperPassword)}
                    className="absolute right-2 top-8 text-slate-400 hover:text-slate-600"
                  >
                    {showSuperPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {superError && <p className="text-red-500 text-xs text-left">{superError}</p>}
                <button type="submit" className="w-full bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-900 transition">
                  Liberar Acesso
                </button>
              </form>
           </div>
        ) : (
          /* Render content if allowed */
          <>
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

             {/* TOOLS TAB (Dynamic now) */}
            {activeTab === 'TOOLS' && (
              <div className="animate-fadeIn">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
                  <h3 className="text-lg font-semibold mb-6 text-brand-blue border-b pb-2 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-brand-gold" /> Adicionar Ferramenta / Manual
                  </h3>
                  
                  <form onSubmit={handleAddTool} className="grid grid-cols-1 gap-4 mb-8">
                    <input 
                      placeholder="Título do Documento (ex: Manual de Conduta)" 
                      className="border p-2 rounded focus:outline-none focus:border-brand-gold" 
                      value={newTool.title} 
                      onChange={e => setNewTool({...newTool, title: e.target.value})} 
                      required 
                    />
                    <textarea 
                      placeholder="Breve descrição" 
                      className="border p-2 rounded h-20 focus:outline-none focus:border-brand-gold" 
                      value={newTool.description} 
                      onChange={e => setNewTool({...newTool, description: e.target.value})} 
                      required 
                    />
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">URL do Arquivo PDF</label>
                      <input 
                        placeholder="https://..." 
                        className="w-full border p-2 rounded focus:outline-none focus:border-brand-gold" 
                        value={newTool.fileUrl} 
                        onChange={e => setNewTool({...newTool, fileUrl: e.target.value})} 
                        required 
                      />
                      <p className="text-xs text-slate-400 mt-1">Insira o link direto para o arquivo hospedado (Google Drive, Dropbox, Servidor, etc).</p>
                    </div>
                    <button type="submit" className="bg-brand-gold text-white font-bold py-3 rounded hover:bg-yellow-600 transition flex justify-center items-center shadow-sm">
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Ferramenta
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tools.map(tool => (
                      <div key={tool.id} className="border border-slate-200 rounded-lg p-0 flex flex-col hover:shadow-lg transition-shadow bg-slate-50 relative group">
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                           <button onClick={() => removeTool(tool.id)} className="bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition">
                             <Trash2 className="h-4 w-4" />
                           </button>
                        </div>

                        <div className="bg-white p-8 flex flex-col items-center justify-center border-b border-slate-100">
                          <div className="w-16 h-16 bg-brand-blue/5 rounded-full flex items-center justify-center mb-4">
                            <FileText className="h-8 w-8 text-brand-blue" />
                          </div>
                          <h4 className="text-xl font-serif font-bold text-brand-blue text-center uppercase">{tool.title}</h4>
                          <p className="text-brand-gold text-sm font-semibold uppercase tracking-wider mt-1">Rede Conselho+</p>
                        </div>
                        
                        <div className="p-6 flex-grow">
                          <h5 className="font-bold text-slate-700 mb-2">Sobre este documento</h5>
                          <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            {tool.description}
                          </p>
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200 rounded-b-lg flex space-x-3">
                          {tool.isGenerated ? (
                             <button 
                               className="flex-1 bg-brand-blue text-white text-sm font-bold py-2 px-4 rounded hover:bg-slate-800 transition flex items-center justify-center cursor-pointer"
                               onClick={() => generatePDF()}
                             >
                               <Download className="h-4 w-4 mr-2" /> Baixar PDF
                             </button>
                          ) : (
                            <a 
                              href={tool.fileUrl} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-brand-blue text-white text-sm font-bold py-2 px-4 rounded hover:bg-slate-800 transition flex items-center justify-center cursor-pointer"
                            >
                              <Download className="h-4 w-4 mr-2" /> Acessar PDF
                            </a>
                          )}
                          
                          <button 
                            className="flex-1 border border-brand-blue text-brand-blue text-sm font-bold py-2 px-4 rounded hover:bg-slate-50 transition flex items-center justify-center relative"
                            onClick={() => handleCopyLink(tool.isGenerated ? 'https://www.conselhomais.com.br/assets/docs/Manual_Editorial.pdf' : tool.fileUrl)}
                          >
                            {copiedLink ? (
                              <>Copiado!</>
                            ) : (
                              <><LinkIcon className="h-4 w-4 mr-2" /> Copiar Link</>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {tools.length === 0 && (
                    <p className="text-center text-slate-500 py-8">Nenhuma ferramenta cadastrada.</p>
                  )}
                </div>
              </div>
            )}

            {/* METRICS TAB (Super Admin Only) */}
            {activeTab === 'METRICS' && (
              <div className="animate-fadeIn">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100 border-t-4 border-brand-blue">
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

            {/* SEO TAB (Super Admin Only) */}
            {activeTab === 'SEO' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Form Side */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 border-t-4 border-brand-blue">
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

            {/* SETTINGS TAB (Super Admin Only) */}
            {activeTab === 'SETTINGS' && (
              <div className="max-w-xl mx-auto animate-fadeIn">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 border-t-4 border-brand-blue">
                  <h3 className="text-lg font-semibold mb-6 text-brand-blue flex items-center">
                    <Lock className="mr-2 h-5 w-5" /> Alterar Senha de Acesso Geral
                  </h3>
                  <div className="bg-yellow-50 p-4 rounded mb-6 text-sm text-yellow-800 border border-yellow-200">
                     Atenção: Esta alteração muda a senha para o acesso de "Membros". A senha de Super Admin (RC2025+) é fixa e não pode ser alterada aqui.
                  </div>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nova Senha Geral</label>
                        <input 
                          type="password" 
                          className="w-full border p-3 rounded focus:outline-none focus:border-brand-blue" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Digite a nova senha (min. 4 caracteres)"
                        />
                    </div>
                    <button type="submit" className="w-full bg-brand-blue text-white px-4 py-3 rounded font-bold hover:bg-slate-800 transition shadow-lg">
                      Atualizar Senha Geral
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Admin;
