
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateRecipe from "./pages/CreateRecipe";
import AllRecipes from "./pages/AllRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import RecipeCollections from "./pages/RecipeCollections";
import SearchRecipes from "./pages/SearchRecipes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/recipes/all" element={<AllRecipes />} />
          <Route path="/recipes/popular" element={<AllRecipes popular />} />
          <Route path="/recipes/categories" element={<AllRecipes categorized />} />
          <Route path="/recipes/seasonal" element={<AllRecipes seasonal />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="/collections" element={<RecipeCollections />} />
          <Route path="/search" element={<SearchRecipes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
