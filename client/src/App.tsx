import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#121829",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }
        }}
      />
    </>
  );
};

export default App;
