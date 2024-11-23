import { BrowserRouter, Route, Routes } from "react-router-dom";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Requests} />
        <Route path="/criar-pedido" Component={CreateRequest} />
      </Routes>
    </BrowserRouter>
  )
}