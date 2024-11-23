import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Orders} />
        <Route path="/novo-pedido" Component={CreateOrder} />
      </Routes>
    </BrowserRouter>
  )
}