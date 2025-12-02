import React from 'react';
import { Hexagon, Linkedin, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-brand-gray border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
               <Hexagon className="h-6 w-6 text-brand-gold" />
               <span className="text-lg font-bold text-white tracking-widest">CONSELHO<span className="text-brand-gold">+</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Uma rede que conecta pessoas, experiências e boas práticas de governança corporativa.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 text-sm">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/identidade" className="hover:text-brand-gold transition">Sobre a Rede</Link></li>
              <li><Link to="/membros" className="hover:text-brand-gold transition">Membros</Link></li>
              <li><Link to="/blog" className="hover:text-brand-gold transition">Conteúdo</Link></li>
              <li><Link to="/contato" className="hover:text-brand-gold transition">Fale Conosco</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="text-white font-semibold uppercase tracking-wider mb-4 text-sm">Legal</h3>
             <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-gold transition">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-brand-gold transition">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-brand-gold transition">Estatuto Social</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 text-sm">Contato</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="mailto:contato@conselhomais.com.br" className="flex items-center hover:text-brand-gold">
                <Mail className="h-4 w-4 mr-2" /> contato@conselhomais.com.br
              </a>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-slate-400 hover:text-brand-gold transition"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-slate-400 hover:text-brand-gold transition"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} REDE CONSELHO+. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;