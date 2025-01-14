import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <aside className="bg-blue-900 w-80 h-screen p-4 flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl text-white">{"</Dordox>"}</h1>
      </div>
      <nav className="flex flex-col gap-2 items-stretch">
        <Link className="text-slate-50 text-lg p-2 rounded hover:bg-blue-neon" to="/">Resumo do dia</Link>
        <Link className="text-slate-50 text-lg p-2 rounded hover:bg-blue-neon" to="/pedidos">Pedidos</Link>
        <Link className="text-slate-50 text-lg p-2 rounded hover:bg-blue-neon" to="/despesa/criar">Nova despesa</Link>
        <Link className="text-slate-50 text-lg p-2 rounded hover:bg-blue-neon" to="/pedido/criar">Novo pedido</Link>
      </nav>
    </aside>
  )
}