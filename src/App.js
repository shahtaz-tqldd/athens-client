import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import './assets/styles/colors.css'

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
