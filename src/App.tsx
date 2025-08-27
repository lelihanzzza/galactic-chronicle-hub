import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PostBlog } from "./pages/PostBlog";
import { Calendar } from "./pages/Calendar";
import { Album } from "./pages/Album";
import { About } from "./pages/About";
import NotFound from "./pages/NotFound";
import { HudLayout } from "./components/HudLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <HudLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<PostBlog />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/album" element={<Album />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HudLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
