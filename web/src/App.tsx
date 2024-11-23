import { Toaster } from "react-hot-toast";
import Router from "./routes";

export default function App() {

  return (
    <>
      <Router />
      <div><Toaster position="top-right" reverseOrder={false} /></div>
    </>
  )
}