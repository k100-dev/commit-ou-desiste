import React from 'react';
import { Database, Github, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-violet-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Database className="h-6 w-6 mr-2 text-purple-400" /> 
            <span className="font-bold text-xl">Commit ou Desiste</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-slate-300 text-sm mb-2">
              Um recurso educacional para estudantes de tecnologia
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/k100-dev/commit-ou-desiste"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-purple-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://unifil.br/landingpage/servicos-saude-e-bem-estar?gad_source=1&gad_campaignid=22574159436&gbraid=0AAAAADPryd5at41fOPJHmHD7jrt4DQcbm&gclid=Cj0KCQjw_8rBBhCFARIsAJrc9yDAiMJBImpCcW0rwVbRSKkCUiBMUqLH8Vo5VPChwZKKLBy-TWfWefAaAih6EALw_wcB"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-purple-300 transition-colors"
                aria-label="Link Externo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700 text-center text-slate-300 text-sm">
          © {new Date().getFullYear()} Site Educacional Commit ou Desiste. Criado para fins acadêmicos.
        </div>
      </div>
    </footer>
  );
};
