
import React, { useState, useEffect } from 'react';
import { useData } from '../services/dataContext';
import { CATEGORIES, MetaConfig, Metric, Tool, Member, BlogPost, NewsItem } from '../types';
import { Lock, Plus, Trash2, Edit2, LayoutDashboard, FileText, Newspaper, Users, Globe, BarChart, Briefcase, Download, Link as LinkIcon, Eye, EyeOff, ShieldAlert, Upload, XCircle, Save } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Admin: React.FC = () => {
  const { 
    isAdmin, isSuperAdmin, login, loginSuperAdmin, logout, changePassword,
    members, addMember, updateMember, removeMember,
    blogPosts, addBlogPost, updateBlogPost, removeBlogPost,
    newsItems, addNewsItem, updateNewsItem, removeNewsItem,
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

  // Super Admin Login State
  const [superAdminInput, setSuperAdminInput] = useState('');
  const [showSuperPassword, setShowSuperPassword] = useState(false);
  const [superError, setSuperError] = useState('');

  // Editing States
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  // Form States
  const initialMemberState = { name: '', role: '', bio: '', specialization: CATEGORIES[0], photoUrl: '', cvUrl: '', linkedinUrl: '', email: '', profileUrl: '' };
  const [newMember, setNewMember] = useState(initialMemberState);
  
  const initialPostState = { title: '', author: '', content: '', excerpt: '', imageUrl: '' };
  const [newPost, setNewPost] = useState(initialPostState);
  
  const initialNewsState = { title: '', source: '', summary: '', link: '' };
  const [newNews, setNewNews] = useState(initialNewsState);
  
  const [newTool, setNewTool] = useState<Tool>({ id: '', title: '', description: '', fileUrl: '', date: '' });
  const [newPassword, setNewPassword] = useState('');
  const [newMetric, setNewMetric] = useState<Metric>({ id: '', label: '', value: '' });
  const [copiedLink, setCopiedLink] = useState(false);

  // SEO Form State
  const [seoForm, setSeoForm] = useState<MetaConfig>(metaTags);

  useEffect(() => {
    setSeoForm(metaTags);
  }, [metaTags]);

  // --- File Processing Utility ---
  const processFile = (file: File, type: 'IMAGE' | 'PDF'): Promise<string> => {
    return new Promise((resolve, reject) => {
      // 1. Validation
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("O arquivo excede o limite de 5MB.");
        reject("File too big");
        return;
      }

      if (type === 'IMAGE' && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert("Apenas imagens JPG, PNG ou WEBP são permitidas.");
        reject("Invalid type");
        return;
      }

      if (type === 'PDF' && file.type !== 'application/pdf') {
        alert("Apenas arquivos PDF são permitidos.");
        reject("Invalid type");
        return;
      }

      // 2. Read File (Simulating Upload by converting to Base64)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result); 
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleMemberPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await processFile(e.target.files[0], 'IMAGE');
        setNewMember(prev => ({ ...prev, photoUrl: base64 }));
      } catch (err) { console.error(err); }
    }
  };

  const handleMemberCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await processFile(e.target.files[0], 'PDF');
        setNewMember(prev => ({ ...prev, cvUrl: base64 }));
      } catch (err) { console.error(err); }
    }
  };

  const handlePostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await processFile(e.target.files[0], 'IMAGE');
        setNewPost(prev => ({ ...prev, imageUrl: base64 }));
      } catch (err) { console.error(err); }
    }
  };

  // --- Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(passwordInput)) setError('');
    else setError('Senha incorreta.');
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

  // MEMBER HANDLERS
  const handleEditMember = (member: Member) => {
    setEditingMemberId(member.id);
    setNewMember({ ...member, cvUrl: member.cvUrl || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditMember = () => {
    setEditingMemberId(null);
    setNewMember(initialMemberState);
  };

  const handleSubmitMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMemberId) {
      updateMember(editingMemberId, { ...newMember, id: editingMemberId });
      alert("Membro atualizado com sucesso!");
    } else {
      addMember({ ...newMember, id: Date.now().toString() });
      alert("Membro cadastrado com sucesso!");
    }
    handleCancelEditMember();
  };

  // BLOG HANDLERS
  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setNewPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditPost = () => {
    setEditingPostId(null);
    setNewPost(initialPostState);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { ...newPost, date: editingPostId ? newPost.date : new Date().toISOString() };
    
    if (editingPostId) {
      updateBlogPost(editingPostId, { ...postData, id: editingPostId });
      alert("Artigo atualizado com sucesso!");
    } else {
      addBlogPost({ ...postData, id: Date.now().toString() });
      alert("Artigo publicado com sucesso!");
    }
    handleCancelEditPost();
  };

  // NEWS HANDLERS
  const handleEditNews = (news: NewsItem) => {
    setEditingNewsId(news.id);
    setNewNews(news);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditNews = () => {
    setEditingNewsId(null);
    setNewNews(initialNewsState);
  };

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newsData = { ...newNews, date: editingNewsId ? newNews.date : new Date().toISOString() };

    if (editingNewsId) {
      updateNewsItem(editingNewsId, { ...newsData, id: editingNewsId });
      alert("Notícia atualizada com sucesso!");
    } else {
      addNewsItem({ ...newsData, id: Date.now().toString() });
      alert("Notícia publicada com sucesso!");
    }
    handleCancelEditNews();
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

  // PDF Generator (Same as before)
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(15, 46, 99);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(201, 160, 79);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("REDE CONSELHO+", 105, 25, { align: "center" });
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Somamos Valor com Governança", 105, 32, { align: "center" });
      doc.setTextColor(15, 46, 99);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("MANUAL EDITORIAL", 105, 60, { align: "center" });
      doc.save("Manual_Editorial_Rede_Conselho.pdf");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar PDF.");
    }
  };

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
        
        {/* SUPER ADMIN GUARD */}
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
          <>
            {/* MEMBERS TAB */}
            {activeTab === 'MEMBERS' && (
              <div className="animate-fadeIn">
                <div className={`bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100 ${editingMemberId ? 'ring-2 ring-brand-gold' : ''}`}>
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                     <h3 className="text-lg font-semibold text-brand-blue">
                       {editingMemberId ? 'Editar Membro' : 'Adicionar Novo Membro'}
                     </h3>
                     {editingMemberId && (
                       <button onClick={handleCancelEditMember} className="text-sm text-red-500 hover:underline flex items-center">
                         <XCircle className="h-4 w-4 mr-1" /> Cancelar Edição
                       </button>
                     )}
                  </div>

                  <form onSubmit={handleSubmitMember} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Nome Completo" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                    <input placeholder="Cargo / Atuação" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required />
                    <select className="border p-2 rounded focus:outline-none focus:border-brand-gold bg-white" value={newMember.specialization} onChange={e => setNewMember({...newMember, specialization: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    
                    {/* PHOTO UPLOAD */}
                    <div className="relative border border-slate-300 rounded p-2 bg-slate-50 flex items-center">
                      <div className="mr-3 text-slate-400">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Foto do Perfil (JPG, PNG)</label>
                        <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleMemberPhotoUpload} className="text-xs w-full" />
                      </div>
                      {newMember.photoUrl && <img src={newMember.photoUrl} alt="Preview" className="h-10 w-10 rounded-full object-cover ml-2 border" />}
                    </div>
                    
                    {/* CV PDF UPLOAD */}
                    <div className="relative border border-slate-300 rounded p-2 bg-slate-50 flex items-center">
                      <div className="mr-3 text-slate-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Currículo / Perfil (PDF)</label>
                        <input type="file" accept="application/pdf" onChange={handleMemberCVUpload} className="text-xs w-full" />
                      </div>
                      {newMember.cvUrl && <span className="text-xs text-green-600 font-bold ml-2">PDF OK</span>}
                    </div>

                    <input placeholder="E-mail (visível apenas p/ admin)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} />
                    <input placeholder="URL Perfil LinkedIn (opcional)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newMember.linkedinUrl} onChange={e => setNewMember({...newMember, linkedinUrl: e.target.value})} />
                    <input placeholder="URL Perfil Externo/Portfólio (opcional)" className="border p-2 rounded col-span-1 md:col-span-2 focus:outline-none focus:border-brand-gold" value={newMember.profileUrl} onChange={e => setNewMember({...newMember, profileUrl: e.target.value})} />
                    
                    <textarea placeholder="Mini Bio (max 80 palavras)" className="border p-2 rounded col-span-1 md:col-span-2 h-24 focus:outline-none focus:border-brand-gold" value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} required />
                    
                    <button type="submit" className={`col-span-1 md:col-span-2 text-white font-bold py-3 rounded transition flex justify-center items-center shadow-sm ${editingMemberId ? 'bg-brand-blue hover:bg-slate-800' : 'bg-brand-gold hover:bg-yellow-600'}`}>
                      {editingMemberId ? <><Save className="h-4 w-4 mr-2" /> Atualizar Membro</> : <><Plus className="h-4 w-4 mr-2" /> Cadastrar Membro</>}
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
                            <img src={m.photoUrl || "https://via.placeholder.com/40"} alt="" className="w-10 h-10 rounded-full mr-3 object-cover bg-slate-200 border border-slate-200" />
                            <div>
                              <div className="font-semibold text-slate-800">{m.name}</div>
                              <div className="text-xs text-slate-500">{m.email || 'Sem e-mail'}</div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 text-sm">{m.role}</td>
                          <td className="p-4 text-right flex justify-end space-x-2">
                             <button onClick={() => handleEditMember(m)} className="text-brand-blue hover:text-brand-gold p-2 hover:bg-blue-50 rounded transition" title="Editar">
                              <Edit2 className="h-4 w-4" />
                            </button>
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
                <div className={`bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100 ${editingPostId ? 'ring-2 ring-brand-gold' : ''}`}>
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                     <h3 className="text-lg font-semibold text-brand-blue">
                       {editingPostId ? 'Editar Artigo' : 'Novo Artigo'}
                     </h3>
                     {editingPostId && (
                       <button onClick={handleCancelEditPost} className="text-sm text-red-500 hover:underline flex items-center">
                         <XCircle className="h-4 w-4 mr-1" /> Cancelar Edição
                       </button>
                     )}
                  </div>
                  <form onSubmit={handleSubmitPost} className="grid grid-cols-1 gap-4">
                    <input placeholder="Título do Artigo" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="Autor" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} required />
                      
                       {/* BLOG IMAGE UPLOAD */}
                      <div className="relative border border-slate-300 rounded p-2 bg-slate-50 flex items-center">
                        <div className="mr-3 text-slate-400">
                          <Upload className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <label className="block text-xs font-bold text-slate-500 uppercase">Imagem de Capa (JPG, PNG)</label>
                          <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handlePostImageUpload} className="text-xs w-full" />
                        </div>
                        {newPost.imageUrl && <img src={newPost.imageUrl} alt="Preview" className="h-10 w-16 object-cover ml-2 border rounded" />}
                      </div>

                    </div>
                    <input placeholder="Resumo (Excerpt)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} required />
                    <textarea placeholder="Conteúdo completo" className="border p-2 rounded h-40 focus:outline-none focus:border-brand-gold" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required />
                    <button type="submit" className={`text-white font-bold py-3 rounded transition flex justify-center items-center shadow-sm ${editingPostId ? 'bg-brand-blue hover:bg-slate-800' : 'bg-brand-gold hover:bg-yellow-600'}`}>
                      {editingPostId ? <><Save className="h-4 w-4 mr-2" /> Atualizar Artigo</> : <><Plus className="h-4 w-4 mr-2" /> Publicar Artigo</>}
                    </button>
                  </form>
                </div>
                <div className="space-y-4">
                  {blogPosts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border-l-4 border-brand-blue border border-slate-100 hover:shadow-md transition">
                      <div className="flex items-center">
                        {post.imageUrl && <img src={post.imageUrl} alt="" className="h-12 w-12 object-cover rounded mr-4 bg-slate-100" />}
                        <div>
                          <h4 className="font-bold text-slate-800">{post.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{new Date(post.date).toLocaleDateString()} • {post.author}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditPost(post)} className="text-brand-blue hover:text-brand-gold p-2 hover:bg-blue-50 rounded transition" title="Editar">
                           <Edit2 className="h-5 w-5" />
                        </button>
                        <button onClick={() => removeBlogPost(post.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition" title="Excluir">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NEWS TAB */}
            {activeTab === 'NEWS' && (
              <div className="animate-fadeIn">
                <div className={`bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100 ${editingNewsId ? 'ring-2 ring-brand-gold' : ''}`}>
                   <div className="flex justify-between items-center mb-4 border-b pb-2">
                     <h3 className="text-lg font-semibold text-brand-blue">
                       {editingNewsId ? 'Editar Notícia' : 'Nova Notícia'}
                     </h3>
                     {editingNewsId && (
                       <button onClick={handleCancelEditNews} className="text-sm text-red-500 hover:underline flex items-center">
                         <XCircle className="h-4 w-4 mr-1" /> Cancelar Edição
                       </button>
                     )}
                  </div>
                  <form onSubmit={handleSubmitNews} className="grid grid-cols-1 gap-4">
                    <input placeholder="Título da Notícia" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} required />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Fonte (ex: Mercado, IBGC)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newNews.source} onChange={e => setNewNews({...newNews, source: e.target.value})} required />
                      <input placeholder="Link Externo (opcional)" className="border p-2 rounded focus:outline-none focus:border-brand-gold" value={newNews.link} onChange={e => setNewNews({...newNews, link: e.target.value})} />
                    </div>
                    <textarea placeholder="Resumo da notícia" className="border p-2 rounded h-24 focus:outline-none focus:border-brand-gold" value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} required />
                    <button type="submit" className={`text-white font-bold py-3 rounded transition flex justify-center items-center shadow-sm ${editingNewsId ? 'bg-brand-blue hover:bg-slate-800' : 'bg-brand-gold hover:bg-yellow-600'}`}>
                      {editingNewsId ? <><Save className="h-4 w-4 mr-2" /> Atualizar Notícia</> : <><Plus className="h-4 w-4 mr-2" /> Publicar Notícia</>}
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
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditNews(news)} className="text-brand-blue hover:text-brand-gold p-2 hover:bg-blue-50 rounded transition" title="Editar">
                           <Edit2 className="h-5 w-5" />
                        </button>
                        <button onClick={() => removeNewsItem(news.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition" title="Excluir">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* TOOLS, METRICS, SEO, SETTINGS tabs remain mostly unchanged but logic is preserved */}
            {activeTab === 'TOOLS' && (
              <div className="animate-fadeIn">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
                  <h3 className="text-lg font-semibold mb-6 text-brand-blue border-b pb-2 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-brand-gold" /> Adicionar Ferramenta / Manual
                  </h3>
                  
                  <form onSubmit={handleAddTool} className="grid grid-cols-1 gap-4 mb-8">
                    <input 
                      placeholder="Título do Documento" 
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
                        </div>
                        <div className="p-6 flex-grow">
                          <p className="text-sm text-slate-600 leading-relaxed">{tool.description}</p>
                        </div>
                        <div className="p-4 bg-white border-t border-slate-200 rounded-b-lg flex space-x-3">
                          {tool.isGenerated ? (
                             <button onClick={() => generatePDF()} className="flex-1 bg-brand-blue text-white text-sm font-bold py-2 px-4 rounded hover:bg-slate-800 transition flex items-center justify-center">
                               <Download className="h-4 w-4 mr-2" /> Baixar PDF
                             </button>
                          ) : (
                            <a href={tool.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-brand-blue text-white text-sm font-bold py-2 px-4 rounded hover:bg-slate-800 transition flex items-center justify-center">
                              <Download className="h-4 w-4 mr-2" /> Acessar PDF
                            </a>
                          )}
                          <button onClick={() => handleCopyLink(tool.isGenerated ? 'https://www.conselhomais.com.br/assets/docs/Manual_Editorial.pdf' : tool.fileUrl)} className="flex-1 border border-brand-blue text-brand-blue text-sm font-bold py-2 px-4 rounded hover:bg-slate-50 transition flex items-center justify-center">
                            {copiedLink ? <>Copiado!</> : <><LinkIcon className="h-4 w-4 mr-2" /> Copiar Link</>}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* ... Metrics, SEO, Settings components rendered if Super Admin ... */}
            {isSuperAdmin && activeTab === 'METRICS' && (
              <div className="animate-fadeIn">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100 border-t-4 border-brand-blue">
                   <h3 className="text-lg font-semibold mb-4 text-brand-blue border-b pb-2 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-brand-gold" /> Adicionar Métrica
                  </h3>
                   <form onSubmit={handleAddMetric} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input placeholder="Rótulo" className="border p-2 rounded" value={newMetric.label} onChange={e => setNewMetric({...newMetric, label: e.target.value})} required />
                    <input placeholder="Valor" className="border p-2 rounded" value={newMetric.value} onChange={e => setNewMetric({...newMetric, value: e.target.value})} required />
                    <button type="submit" className="bg-brand-gold text-white font-bold py-2 rounded">Adicionar</button>
                  </form>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metrics.map(metric => (
                    <div key={metric.id} className="bg-white p-6 rounded shadow-sm flex justify-between items-center border border-slate-100">
                       <div><span className="text-3xl font-bold text-brand-blue block">{metric.value}</span><span className="text-sm text-slate-500 uppercase">{metric.label}</span></div>
                       <button onClick={() => removeMetric(metric.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isSuperAdmin && activeTab === 'SEO' && (
               <div className="animate-fadeIn">
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 border-t-4 border-brand-blue">
                    <h3 className="text-lg font-semibold mb-6 text-brand-blue border-b pb-2">Editar Meta Tags</h3>
                    <form onSubmit={handleUpdateSEO} className="space-y-4">
                       <div><label className="block text-xs font-bold text-slate-500 uppercase">Title</label><input className="w-full border p-2 rounded" value={seoForm.title} onChange={e => setSeoForm({...seoForm, title: e.target.value})} /></div>
                       <div><label className="block text-xs font-bold text-slate-500 uppercase">Description</label><textarea className="w-full border p-2 rounded" value={seoForm.description} onChange={e => setSeoForm({...seoForm, description: e.target.value})} /></div>
                       <button type="submit" className="w-full bg-brand-gold text-white font-bold py-3 rounded">Salvar SEO</button>
                    </form>
                 </div>
               </div>
            )}
            
            {isSuperAdmin && activeTab === 'SETTINGS' && (
               <div className="max-w-xl mx-auto animate-fadeIn">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 border-t-4 border-brand-blue">
                   <h3 className="text-lg font-semibold mb-6 text-brand-blue">Alterar Senha Geral</h3>
                   <form onSubmit={handlePasswordChange} className="space-y-6">
                      <input type="password" className="w-full border p-3 rounded" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nova senha" />
                      <button type="submit" className="w-full bg-brand-blue text-white px-4 py-3 rounded font-bold">Atualizar</button>
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
