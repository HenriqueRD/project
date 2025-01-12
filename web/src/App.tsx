import { Toaster } from "react-hot-toast";
import Router from "./routes";

export default function App() {

  return (
    <div>
      <Router />
      <div><Toaster position="top-right" reverseOrder={false} /></div>
    </div>
  )
}