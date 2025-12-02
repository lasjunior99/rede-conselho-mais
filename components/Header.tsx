import React, { useState } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../services/dataContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useData();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-gold font-semibold' : 'text-slate-300 hover:text-brand-gold transition-colors';

  const NavLink = ({ to, label }: { to: string, label: string }) => (
    <Link 
      to={to} 
      className={`text-sm tracking-wide uppercase ${isActive(to)}`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-brand-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Hexagon className="h-10 w-10 text-brand-gold stroke-2" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-2 w-2 bg-brand-gold rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest leading-none">CONSELHO<span className="text-brand-gold">+</span></span>
              <span className="text-[0.6rem] text-brand-gray tracking-wider uppercase opacity-80">Somamos Valor com Governança</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" label="Home" />
            <NavLink to="/identidade" label="A Rede" />
            <NavLink to="/membros" label="Quem é Quem" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/noticias" label="Notícias" />
            <NavLink to="/contato" label="Contato" />
            
            <div className="border-l border-slate-600 h-6 mx-2"></div>
            
            {isAdmin ? (
               <div className="flex items-center gap-4">
                 <NavLink to="/admin" label="Painel Admin" />
                 <button onClick={logout} className="text-xs border border-red-400 text-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition-all">Sair</button>
               </div>
            ) : (
              <Link to="/admin" className="text-xs text-brand-gold border border-brand-gold px-3 py-1 rounded hover:bg-brand-gold hover:text-brand-blue transition-all">
                Área Restrita
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-brand-gold focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-blue border-t border-slate-700 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavLink to="/" label="Home" />
            <NavLink to="/identidade" label="A Rede" />
            <NavLink to="/membros" label="Quem é Quem" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/noticias" label="Notícias" />
            <NavLink to="/contato" label="Contato" />
             {isAdmin ? (
               <NavLink to="/admin" label="Painel Admin" />
            ) : (
              <NavLink to="/admin" label="Área Restrita" />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;