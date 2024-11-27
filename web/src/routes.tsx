import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrdersList from "./pages/OrdersList";
import CreateOrder from "./pages/CreateOrder";
import Order from "./pages/Order";

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={OrdersList} />
        <Route path="/novo-pedido" Component={CreateOrder} />
        <Route path="/pedido/:id" Component={Order} />
      </Routes>
    </BrowserRouter>
  )
}