import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrdersList from "./pages/OrdersList";
import CreateOrder from "./pages/CreateOrder";
import Order from "./pages/Order";
import OrderCheckout from "./pages/OrderCheckout";
import { ProductProvider } from "./contexts/ProductContext";
import EditOrder from "./pages/EditOrder";

export default function Router() {

  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" Component={OrdersList} />
          <Route path="/novo-pedido" Component={CreateOrder} />
          <Route path="/pedido/:id" Component={Order} />
          <Route path="/pedido/editar/:id" Component={EditOrder} />
          <Route path="/pedido/pagamento/:id" Component={OrderCheckout} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  )
}