// types/index.ts
export interface Case {
    id: string;
    titulo: string;
    tipo: 'gerado' | 'produto-completo' | 'meta-case';
    complexidade: 'basico' | 'medio' | 'avançado';
    categoria: 'Dashboard' | 'Mobile' | 'E-commerce' | 'SaaS' | 'FinTech' | 'Workflow' | 'CRM';
    descricao: string;
    funcionalidades: string[];
    tecnologias: string[];
    tempoDesenvolvimento: '<10min' | '10-30min' | '30min-2h' | '2h-6h';
    tags: string[];
    destaque: boolean;
    preview_url?: string;
    notion_url?: string;
    github_url?: string;
    cor_tema: string;
    data_criacao: string;
  }

export interface FiltrosCases {
  tipo: 'todos' | 'gerado' | 'produto-completo' | 'meta-case';
  complexidade: 'todas' | 'basico' | 'medio' | 'avançado';
  categoria: 'todas' | 'Dashboard' | 'Mobile' | 'E-commerce' | 'SaaS' | 'FinTech' | 'Workflow' | 'CRM';
  tecnologias: string[];
  tempoDesenvolvimento: 'todos' | '<10min' | '10-30min' | '30min-2h' | '2h-6h';
  busca: string;
  destaque: boolean;
}
  
  export interface PerfilPessoal {
    nome: string;
    titulo: string;
    resumo: string;
    competencias: string[];
    diferenciais: string[];
    experiencias: {
      empresa: string;
      cargo: string;
      periodo: string;
      descricao: string;
    }[];
    certificacoes: string[];
    contato: {
      email: string;
      linkedin: string;
      github: string;
    };
  }