
import React from 'react';
import RecipeHeader from '@/components/RecipeHeader';
import RecipeCardList from '@/components/RecipeCardList';
import RecipeFooter from '@/components/RecipeFooter';
import { Recipe } from '@/components/RecipeGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AllRecipesProps {
  popular?: boolean;
  categorized?: boolean;
  seasonal?: boolean;
}

const AllRecipes = ({ popular, categorized, seasonal }: AllRecipesProps) => {
  // Mock data for display
  const mockRecipes: Recipe[] = [
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

  let pageTitle = "All Recipes";
  let pageDescription = "Browse our complete collection of delicious recipes.";
  
  if (popular) {
    pageTitle = "Popular Recipes";
    pageDescription = "Discover what others are cooking and loving.";
  } else if (categorized) {
    pageTitle = "Recipe Categories";
    pageDescription = "Browse recipes by meal type, cuisine, or dietary needs.";
  } else if (seasonal) {
    pageTitle = "Seasonal Favorites";
    pageDescription = "Recipes that highlight the best ingredients of the season.";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RecipeHeader />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-recipe-cream to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-recipe-brown mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-recipe-brown/80 max-w-2xl mx-auto mb-8">
              {pageDescription}
            </p>
          </div>
        </section>
        
        {categorized ? (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="cuisine" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                  <TabsTrigger value="meal">Meal Type</TabsTrigger>
                  <TabsTrigger value="dietary">Dietary</TabsTrigger>
                  <TabsTrigger value="time">Cook Time</TabsTrigger>
                </TabsList>
                
                <TabsContent value="cuisine">
                  <RecipeCardList recipes={mockRecipes.filter(r => r.cuisine === "Italian" || r.cuisine === "Mexican" || r.cuisine === "Asian")} />
                </TabsContent>
                <TabsContent value="meal">
                  <RecipeCardList recipes={mockRecipes.filter(r => r.cuisine === "Breakfast" || r.cuisine === "Comfort Food")} />
                </TabsContent>
                <TabsContent value="dietary">
                  <RecipeCardList recipes={mockRecipes.filter(r => r.cuisine === "Mediterranean")} />
                </TabsContent>
                <TabsContent value="time">
                  <RecipeCardList recipes={mockRecipes.filter(r => parseInt(r.cookTime?.split(' ')[0] || '0') <= 15)} />
                </TabsContent>
              </Tabs>
            </div>
          </section>
        ) : (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <RecipeCardList recipes={mockRecipes} />
            </div>
          </section>
        )}
      </main>
      
      <RecipeFooter />
    </div>
  );
};

export default AllRecipes;
