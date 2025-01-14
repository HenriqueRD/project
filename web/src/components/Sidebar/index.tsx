import { House } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <aside className="bg-blue-900 w-80 h-screen sticky top-0 p-5 flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl text-white">{"<dordox>"}</h1>
      </div>
      <nav className="flex flex-col gap-4 items-stretch">
        <div className="flex flex-col items-stretch">
          <Link className="text-slate-50 px-3 py-1 flex items-center gap-2 rounded hover:bg-blue-neon" to="/">
            <House />
            Dashboard
          </Link>  
        </div>
        <div className="flex flex-col border-b border-slate-400 pb-2">
          <span className="font-medium font-mono uppercase text-xs text-slate-300">financeiro</span>
          <div className="flex flex-col items-stretch">
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/">Resumo do dia</Link>  
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/">Resumo avançado</Link>  
          </div>
        </div>
        <div className="flex flex-col border-b border-slate-400 pb-2">
          <span className="font-medium font-mono uppercase text-xs text-slate-300">despesa</span>
          <div className="flex flex-col items-stretch">
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/despesas/pendentes">Painel de despesas</Link> 
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/despesas/pendentes">Pagamentos pendentes</Link>  
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/despesa/adicionar">Adicionar despesa</Link>  
          </div>
        </div>
        <div className="flex flex-col border-b border-slate-400 pb-2">
          <span className="font-medium font-mono uppercase text-xs text-slate-300">cadastro</span>
          <div className="flex flex-col items-stretch">
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/fornecedor/criar">Cadastrar fornecedor</Link>  
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/">Cadastrar produto</Link>  
            <Link className="text-slate-50 px-3 py-1 rounded hover:bg-blue-neon" to="/">Cadastrar cliente</Link>  
          </div>
        </div>
      </nav>
    </aside>
  )
}