import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogIndex from "./pages/blog/Index";
import BlogDetail from "./pages/blog/Detail";
import TOS from "./pages/TOS";
import Changelog from "./pages/Changelog";
import Success from "./pages/Success";
import ManualPayment from "./pages/ManualPayment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/success" element={<Success />} />
          <Route path="/manual-payment" element={<ManualPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
