
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeHeader from '@/components/RecipeHeader';
import RecipeGenerator, { Recipe } from '@/components/RecipeGenerator';
import RecipeCardList from '@/components/RecipeCardList';
import RecipeFooter from '@/components/RecipeFooter';
import { UtensilsCrossed, ChefHat, Search, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const { toast } = useToast();

  const handleSaveRecipe = (recipe: Recipe) => {
    // In a real app, this would save to a database
    setSavedRecipes((prev) => {
      // Check if recipe already exists to avoid duplicates
      if (prev.some(r => r.title === recipe.title)) {
        toast({
          title: "Recipe already saved",
          description: "This recipe is already in your saved recipes.",
        });
        return prev;
      }
      
      toast({
        title: "Recipe saved!",
        description: `${recipe.title} has been added to your recipes.`,
      });
      return [...prev, recipe];
    });
  };

  const featuredRecipes: Recipe[] = [
    {
      title: "Creamy Garlic Pasta",
      ingredients: ["pasta", "garlic", "heavy cream", "parmesan cheese", "butter", "salt", "black pepper"],
      instructions: ["Boil pasta", "Sauté minced garlic in butter", "Add cream and simmer", "Toss with pasta", "Add parmesan and season"],
      cuisine: "Italian",
      prepTime: "10 mins",
      cookTime: "20 mins",
      servings: 4
    },
    {
      title: "Vegetable Stir Fry",
      ingredients: ["broccoli", "carrots", "bell peppers", "onion", "garlic", "soy sauce", "sesame oil"],
      instructions: ["Prep vegetables", "Heat oil in wok", "Stir fry vegetables", "Add sauce", "Serve hot"],
      cuisine: "Asian",
      prepTime: "15 mins",
      cookTime: "10 mins",
      servings: 3
    },
    {
      title: "Classic Beef Tacos",
      ingredients: ["ground beef", "taco seasoning", "tortillas", "lettuce", "tomato", "cheese", "sour cream"],
      instructions: ["Brown beef", "Add seasoning", "Warm tortillas", "Assemble tacos with toppings"],
      cuisine: "Mexican",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: 4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <RecipeHeader />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-recipe-cream to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <UtensilsCrossed className="h-12 w-12 text-recipe-orange" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-recipe-brown mb-4">
              Recipe Genie
            </h1>
            <p className="text-xl text-recipe-brown/80 max-w-2xl mx-auto mb-8">
              Discover delicious recipes based on ingredients you already have or explore new cuisines with our AI-powered recipe generator.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/create">
                <Button className="bg-recipe-orange hover:bg-recipe-orange/90 text-white">
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Generate Recipe
                </Button>
              </Link>
              <Link to="/recipes/all">
                <Button variant="outline" className="border-recipe-brown text-recipe-brown hover:bg-recipe-brown/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
              <div className="flex flex-col items-center text-center p-6 bg-recipe-beige/30 rounded-lg shadow-sm">
                <UtensilsCrossed className="h-12 w-12 text-recipe-orange mb-4" />
                <h3 className="text-xl font-semibold text-recipe-brown mb-2">Generate by Ingredients</h3>
                <p className="text-recipe-brown/80">Create recipes based on what you have in your kitchen.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-recipe-beige/30 rounded-lg shadow-sm">
                <ChefHat className="h-12 w-12 text-recipe-orange mb-4" />
                <h3 className="text-xl font-semibold text-recipe-brown mb-2">Explore Cuisines</h3>
                <p className="text-recipe-brown/80">Discover new dishes from around the world.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-recipe-beige/30 rounded-lg shadow-sm">
                <Search className="h-12 w-12 text-recipe-orange mb-4" />
                <h3 className="text-xl font-semibold text-recipe-brown mb-2">Search Recipes</h3>
                <p className="text-recipe-brown/80">Find exactly what you're looking for.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-recipe-brown mb-6 text-center">
              Featured Recipes
            </h2>
            <RecipeCardList recipes={featuredRecipes} onSave={handleSaveRecipe} />
            
            <div className="text-center mt-8">
              <Link to="/recipes/all">
                <Button variant="outline" className="border-recipe-orange text-recipe-orange hover:bg-recipe-orange/10">
                  View All Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {savedRecipes.length > 0 && (
          <section className="py-12 bg-recipe-beige/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-recipe-brown mb-6 text-center">
                Your Saved Recipes
              </h2>
              <RecipeCardList recipes={savedRecipes} onSave={handleSaveRecipe} />
              
              <div className="text-center mt-8">
                <Link to="/saved">
                  <Button variant="outline" className="border-recipe-brown text-recipe-brown hover:bg-recipe-brown/10">
                    View All Saved Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <RecipeFooter />
    </div>
  );
};

export default Index;
