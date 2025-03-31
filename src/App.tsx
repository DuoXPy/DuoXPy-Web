import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import NewBlog from "./pages/blog/New";
import BlogIndex from "./pages/blog/Index";
import BlogDetail from "./pages/blog/Detail";
import Profile from "./pages/Profile";
import TOS from "./pages/TOS";
import Changelog from "./pages/Changelog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/new" element={<NewBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
