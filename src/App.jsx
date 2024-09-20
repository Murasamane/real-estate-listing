import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./layouts/AppLayout";
import Homepage from "./pages/Homepage";
import AddEstate from "./pages/AddEstate";
import EstateLayout from "./layouts/EstateLayout";
import { Toaster } from "react-hot-toast";
import DetailsPage from "./pages/DetailsPage";
import NotFound from "./components/NotFound";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
          </Route>
          <Route path="/estates" element={<EstateLayout />}>
            <Route path="createEstate" element={<AddEstate />} />
            <Route path=":id" element={<DetailsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#4661E6",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
