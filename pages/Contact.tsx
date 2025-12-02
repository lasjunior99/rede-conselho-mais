import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Info Side */}
          <div className="bg-brand-blue p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Fale Conosco</h2>
              <p className="text-slate-300 mb-10 font-light">
                Deseja fazer parte da REDE CONSELHO+ ou tem dúvidas sobre nossos encontros? Preencha o formulário ou utilize nossos canais diretos.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-brand-gold mr-4" />
                  <span>contato@conselhomais.com.br</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-brand-gold mr-4" />
                  <span>+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-brand-gold mr-4" />
                  <span>Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-bold text-brand-gold mb-2 uppercase text-sm tracking-wide">Imprensa & Parcerias</h4>
              <p className="text-sm text-slate-400">
                Para assuntos relacionados à mídia ou parcerias institucionais, entre em contato pelo mesmo e-mail.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Envie sua mensagem</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Nome</label>
                  <input type="text" className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Empresa</label>
                  <input type="text" className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Sua organização" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">E-mail</label>
                <input type="email" className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors" placeholder="nome@empresa.com" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Assunto</label>
                <select className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold bg-transparent">
                  <option>Quero ser Membro</option>
                  <option>Dúvidas Gerais</option>
                  <option>Eventos</option>
                  <option>Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Mensagem</label>
                <textarea className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors h-32 resize-none" placeholder="Escreva sua mensagem aqui..."></textarea>
              </div>

              <button className="bg-brand-gold text-brand-blue font-bold px-8 py-3 rounded hover:bg-yellow-500 transition w-full sm:w-auto">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;