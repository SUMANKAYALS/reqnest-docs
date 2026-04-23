import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import GettingStarted from "./pages/docs/GettingStarted.tsx";
import Installation from "./pages/docs/Installation.tsx";
import QuickStart from "./pages/docs/QuickStart.tsx";
import Instance from "./pages/docs/Instance.tsx";
import Middleware from "./pages/docs/Middleware.tsx";
import Methods from "./pages/docs/Methods.tsx";
import Errors from "./pages/docs/Errors.tsx";
import Plugins from "./pages/docs/Plugins.tsx";
import Retry from "./pages/docs/plugins/Retry.tsx";
import Cache from "./pages/docs/plugins/Cache.tsx";
import Dedupe from "./pages/docs/plugins/Dedupe.tsx";
import RateLimit from "./pages/docs/plugins/RateLimit.tsx";
import Api from "./pages/docs/Api.tsx";
import Examples from "./pages/docs/Examples.tsx";
import Architecture from "./pages/docs/Architecture.tsx";
import Comparison from "./pages/docs/Comparison.tsx";
import Roadmap from "./pages/docs/Roadmap.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/docs/getting-started" element={<GettingStarted />} />
            <Route path="/docs/installation" element={<Installation />} />
            <Route path="/docs/quick-start" element={<QuickStart />} />
            <Route path="/docs/instance" element={<Instance />} />
            <Route path="/docs/middleware" element={<Middleware />} />
            <Route path="/docs/methods" element={<Methods />} />
            <Route path="/docs/errors" element={<Errors />} />
            <Route path="/docs/plugins" element={<Plugins />} />
            <Route path="/docs/plugins/retry" element={<Retry />} />
            <Route path="/docs/plugins/cache" element={<Cache />} />
            <Route path="/docs/plugins/dedupe" element={<Dedupe />} />
            <Route path="/docs/plugins/rate-limit" element={<RateLimit />} />
            <Route path="/docs/api" element={<Api />} />
            <Route path="/docs/examples" element={<Examples />} />
            <Route path="/docs/architecture" element={<Architecture />} />
            <Route path="/docs/comparison" element={<Comparison />} />
            <Route path="/docs/roadmap" element={<Roadmap />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
