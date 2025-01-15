import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrdersList from "./pages/Orders/OrdersList";
import CreateOrder from "./pages/Orders/CreateOrder";
import Order from "./pages/Orders/FindOrder";
import OrderCheckout from "./pages/Orders/OrderCheckout";
import { ProductProvider } from "./contexts/ProductContext";
import EditOrder from "./pages/Orders/EditOrder";
import SummaryDay from "./pages/SummaryDay";
import CreateExpense from "./pages/Expenses/CreateExpense";
import PedantExpenses from "./pages/Expenses/PendantExpenses";

export default function Router() {

  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" Component={SummaryDay} />
          <Route path="/despesas/pendentes" Component={PedantExpenses} />
          <Route path="/despesa/adicionar" Component={CreateExpense} />
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