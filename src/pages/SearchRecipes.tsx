
import React, { useState } from 'react';
import RecipeHeader from '@/components/RecipeHeader';
import RecipeCardList from '@/components/RecipeCardList';
import RecipeFooter from '@/components/RecipeFooter';
import { Recipe } from '@/components/RecipeGenerator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Mock recipe data for search
  const allRecipes: Recipe[] = [
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
    },
    {
      title: "Hearty Vegetable Soup",
      ingredients: ["vegetable broth", "carrots", "celery", "onion", "potato", "tomatoes", "green beans"],
      instructions: ["Chop vegetables", "Sauté onions", "Add vegetables and broth", "Simmer until tender", "Season and serve"],
      cuisine: "Comfort Food",
      prepTime: "20 mins",
      cookTime: "40 mins",
      servings: 6
    },
    {
      title: "Banana Pancakes",
      ingredients: ["flour", "baking powder", "salt", "sugar", "egg", "milk", "banana", "butter"],
      instructions: ["Mix dry ingredients", "Add wet ingredients", "Fold in mashed banana", "Cook on griddle", "Serve with syrup"],
      cuisine: "Breakfast",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: 3
    },
    {
      title: "Grilled Chicken Salad",
      ingredients: ["chicken breast", "lettuce", "cucumber", "tomato", "red onion", "feta cheese", "olive oil", "lemon juice"],
      instructions: ["Grill chicken", "Chop vegetables", "Make dressing", "Combine and toss", "Top with cheese"],
      cuisine: "Mediterranean",
      prepTime: "15 mins",
      cookTime: "15 mins",
      servings: 2
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    const term = searchTerm.toLowerCase();
    const results = allRecipes.filter(recipe => {
      // Search in title
      if (recipe.title.toLowerCase().includes(term)) return true;
      
      // Search in ingredients
      if (recipe.ingredients.some(i => i.toLowerCase().includes(term))) return true;
      
      // Search in cuisine
      if (recipe.cuisine?.toLowerCase().includes(term)) return true;
      
      return false;
    });
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RecipeHeader />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-recipe-cream to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-recipe-brown mb-4">
              Search Recipes
            </h1>
            <p className="text-lg text-recipe-brown/80 max-w-2xl mx-auto mb-8">
              Find recipes by ingredient, cuisine, or name.
            </p>
            
            <div className="max-w-2xl mx-auto flex gap-2">
              <Input 
                placeholder="Search for recipes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-white"
              />
              <Button 
                onClick={handleSearch}
                className="bg-recipe-orange hover:bg-recipe-orange/90"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            {hasSearched && (
              <>
                <h2 className="text-2xl font-semibold text-recipe-brown mb-6 text-center">
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} recipes for "${searchTerm}"`
                    : `No recipes found for "${searchTerm}"`
                  }
                </h2>
                {searchResults.length > 0 && <RecipeCardList recipes={searchResults} />}
              </>
            )}
          </div>
        </section>
      </main>
      
      <RecipeFooter />
    </div>
  );
};

export default SearchRecipes;
