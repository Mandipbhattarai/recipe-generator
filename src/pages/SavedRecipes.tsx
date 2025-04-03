
import React, { useState } from 'react';
import RecipeHeader from '@/components/RecipeHeader';
import RecipeCardList from '@/components/RecipeCardList';
import RecipeFooter from '@/components/RecipeFooter';
import { Recipe } from '@/components/RecipeGenerator';
import { BookmarkX } from 'lucide-react';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([
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
    }
  ]);

  const handleDeleteRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => prev.filter(r => r.title !== recipe.title));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RecipeHeader />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-recipe-cream to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-recipe-brown mb-4">
              Your Saved Recipes
            </h1>
            <p className="text-lg text-recipe-brown/80 max-w-2xl mx-auto mb-8">
              All your favorite recipes in one place.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            {savedRecipes.length > 0 ? (
              <RecipeCardList recipes={savedRecipes} onSave={handleDeleteRecipe} />
            ) : (
              <div className="text-center py-12">
                <BookmarkX className="h-16 w-16 text-recipe-beige mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-recipe-brown mb-2">No Saved Recipes</h2>
                <p className="text-recipe-brown/80 mb-6">You haven't saved any recipes yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <RecipeFooter />
    </div>
  );
};

export default SavedRecipes;
