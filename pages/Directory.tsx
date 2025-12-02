import React, { useState } from 'react';
import { Linkedin, Search, Filter } from 'lucide-react';
import { useData } from '../services/dataContext';
import { CATEGORIES, Member } from '../types';

const Directory: React.FC = () => {
  const { members } = useData();
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMembers = members.filter(member => {
    const matchesCategory = filterCategory === 'Todos' || member.specialization.includes(filterCategory);
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-brand-blue mb-4">Quem é Quem?</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Conheça os especialistas que formam a REDE CONSELHO+. Profissionais selecionados com vasta experiência em governança.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou cargo..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
             <Filter className="text-brand-gold h-5 w-5 shrink-0" />
             <select 
               className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
               value={filterCategory}
               onChange={(e) => setFilterCategory(e.target.value)}
             >
               <option value="Todos">Todas as Áreas</option>
               {CATEGORIES.map(cat => (
                 <option key={cat} value={cat}>{cat}</option>
               ))}
             </select>
          </div>
        </div>

        {/* Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member: Member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col">
                <div className="h-2 bg-brand-gold"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <img 
                      src={member.photoUrl} 
                      alt={member.name} 
                      className="h-20 w-20 rounded-full object-cover border-2 border-slate-100"
                    />
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-700 transition">
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-brand-blue">{member.name}</h3>
                    <p className="text-sm font-semibold text-brand-gold uppercase tracking-wide">{member.role}</p>
                  </div>
                  
                  <div className="mb-4 flex-grow">
                    <p className="text-sm text-slate-600 line-clamp-4 italic">
                      "{member.bio}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-xs font-semibold text-slate-600 mr-2 mb-2">
                      {member.specialization}
                    </span>
                    {member.profileUrl && (
                       <a href={member.profileUrl} target="_blank" className="text-xs text-brand-blue hover:underline block mt-2">
                         Ver Perfil Completo &rarr;
                       </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            Nenhum membro encontrado com os critérios selecionados.
          </div>
        )}

      </div>
    </div>
  );
};

export default Directory;