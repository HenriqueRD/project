import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrdersList from "./pages/OrdersList";
import CreateOrder from "./pages/CreateOrder";
import Order from "./pages/Order";
import OrderCheckout from "./pages/OrderCheckout";
import { ProductProvider } from "./contexts/ProductContext";
import EditOrder from "./pages/EditOrder";
import SummaryDay from "./pages/SummaryDay";
import CreateExpense from "./pages/CreateExpense";
import ManageExpenses from "./pages/ManageExpenses";

export default function Router() {

  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" Component={SummaryDay} />
          <Route path="/despesas/pagamentos-pendentes" Component={ManageExpenses} />
          <Route path="/despesa/criar" Component={CreateExpense} />
          <Route path="/pedidos" Component={OrdersList} />
          <Route path="/pedido/criar" Component={CreateOrder} />
          <Route path="/pedido/:id" Component={Order} />
          <Route path="/pedido/editar/:id" Component={EditOrder} />
          <Route path="/pedido/pagar/:id" Component={OrderCheckout} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  )
}