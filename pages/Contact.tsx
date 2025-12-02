import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Info Side - Now White with Brand Blue Text */}
          <div className="bg-white p-10 flex flex-col justify-center border-r border-slate-100">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-brand-blue">Fale Conosco</h2>
              <p className="text-slate-600 mb-10 font-light leading-relaxed">
                Deseja fazer parte da REDE CONSELHO+ ou tem dúvidas sobre nossos encontros? Preencha o formulário ou entre em contato.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-brand-blue">
                   <span className="font-semibold">E-mail:</span>
                   <a href="mailto:contato@conselhomais.com.br" className="ml-2 text-slate-600 hover:text-brand-gold transition">contato@conselhomais.com.br</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Envie sua mensagem</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Nome</label>
                  <input type="text" className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors bg-transparent" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Empresa</label>
                  <input type="text" className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors bg-transparent" placeholder="Sua organização" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">E-mail</label>
                <input type="email" className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors bg-transparent" placeholder="nome@empresa.com" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Assunto</label>
                <select className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold bg-transparent text-slate-700">
                  <option>Quero ser Membro</option>
                  <option>Dúvidas Gerais</option>
                  <option>Eventos</option>
                  <option>Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Mensagem</label>
                <textarea className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-brand-gold transition-colors h-32 resize-none bg-transparent" placeholder="Escreva sua mensagem aqui..."></textarea>
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