import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../services/dataContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useData();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-gold font-bold' : 'text-brand-blue hover:text-brand-gold transition-colors font-medium';

  const NavLink = ({ to, label }: { to: string, label: string }) => (
    <Link 
      to={to} 
      className={`text-sm tracking-wide uppercase ${isActive(to)}`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );

  // Custom Logo Icon matching the provided image (Pentagonal Network)
  const LogoIcon = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold">
      {/* Outer Pentagon Nodes */}
      <circle cx="50" cy="15" r="4" fill="currentColor" />
      <circle cx="85" cy="40" r="4" fill="currentColor" />
      <circle cx="72" cy="80" r="4" fill="currentColor" />
      <circle cx="28" cy="80" r="4" fill="currentColor" />
      <circle cx="15" cy="40" r="4" fill="currentColor" />

      {/* Inner Pentagon Nodes (Rotated) */}
      <circle cx="50" cy="75" r="3.5" fill="currentColor" />
      <circle cx="25" cy="55" r="3.5" fill="currentColor" />
      <circle cx="35" cy="28" r="3.5" fill="currentColor" />
      <circle cx="65" cy="28" r="3.5" fill="currentColor" />
      <circle cx="75" cy="55" r="3.5" fill="currentColor" />

      {/* Connections - Outer Ring */}
      <path d="M50 15 L85 40 L72 80 L28 80 L15 40 Z" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Connections - Inner Ring */}
      <path d="M35 28 L65 28 L75 55 L50 75 L25 55 Z" stroke="currentColor" strokeWidth="2" fill="none" />

      {/* Connections - Cross */}
      <line x1="50" y1="15" x2="35" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="15" x2="65" y2="28" stroke="currentColor" strokeWidth="2" />
      
      <line x1="85" y1="40" x2="65" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="85" y1="40" x2="75" y2="55" stroke="currentColor" strokeWidth="2" />

      <line x1="72" y1="80" x2="75" y2="55" stroke="currentColor" strokeWidth="2" />
      <line x1="72" y1="80" x2="50" y2="75" stroke="currentColor" strokeWidth="2" />

      <line x1="28" y1="80" x2="50" y2="75" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="80" x2="25" y2="55" stroke="currentColor" strokeWidth="2" />

      <line x1="15" y1="40" x2="25" y2="55" stroke="currentColor" strokeWidth="2" />
      <line x1="15" y1="40" x2="35" y2="28" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  return (
    <nav className="bg-white text-brand-blue shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <LogoIcon />
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold tracking-widest leading-none font-serif text-brand-blue">
                REDE CONSELHO<span className="text-brand-gold">+</span>
              </span>
              <span className="text-[0.6rem] text-slate-500 tracking-wider uppercase opacity-80 mt-1">Somamos Valor com Governança</span>
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
            
            <div className="border-l border-slate-200 h-6 mx-2"></div>
            
            {isAdmin ? (
               <div className="flex items-center gap-4">
                 <NavLink to="/admin" label="Painel Admin" />
                 <button onClick={logout} className="text-xs border border-red-400 text-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition-all">Sair</button>
               </div>
            ) : (
              <Link to="/admin" className="text-xs text-brand-blue border border-brand-blue px-3 py-1 rounded hover:bg-brand-blue hover:text-white transition-all font-semibold">
                Área Restrita
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-brand-blue hover:text-brand-gold focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-fadeIn shadow-inner">
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