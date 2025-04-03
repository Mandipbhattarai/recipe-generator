
import React from 'react';
import RecipeHeader from '@/components/RecipeHeader';
import RecipeFooter from '@/components/RecipeFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Coffee, Clock, Salad, Beef, Flame, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CollectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  recipes: number;
  link: string;
}

const CollectionCard = ({ title, description, icon, color, recipes, link }: CollectionCardProps) => (
  <Link to={link}>
    <Card className="recipe-card h-full group cursor-pointer">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <div className={`p-4 rounded-full ${color} mb-4 text-white group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-recipe-brown mb-2">{title}</h3>
        <p className="text-sm text-recipe-brown/70 mb-4">{description}</p>
        <div className="text-xs bg-recipe-beige/50 px-3 py-1 rounded-full text-recipe-brown mt-auto">
          {recipes} recipes
        </div>
      </CardContent>
    </Card>
  </Link>
);

const RecipeCollections = () => {
  const collections = [
    {
      title: "Quick & Easy",
      description: "Delicious meals ready in 30 minutes or less",
      icon: <Clock className="h-8 w-8" />,
      color: "bg-recipe-orange",
      recipes: 24,
      link: "/recipes/categories"
    },
    {
      title: "Breakfast Favorites",
      description: "Start your day with these breakfast classics",
      icon: <Coffee className="h-8 w-8" />,
      color: "bg-recipe-brown",
      recipes: 18,
      link: "/recipes/categories"
    },
    {
      title: "Healthy Salads",
      description: "Fresh and nutritious salad recipes",
      icon: <Salad className="h-8 w-8" />,
      color: "bg-recipe-green",
      recipes: 15,
      link: "/recipes/categories"
    },
    {
      title: "Comfort Food",
      description: "Hearty and satisfying recipes for any day",
      icon: <Utensils className="h-8 w-8" />,
      color: "bg-recipe-orange",
      recipes: 20,
      link: "/recipes/categories"
    },
    {
      title: "Meat Lovers",
      description: "Delicious recipes for meat enthusiasts",
      icon: <Beef className="h-8 w-8" />,
      color: "bg-recipe-brown",
      recipes: 22,
      link: "/recipes/categories"
    },
    {
      title: "Vegetarian",
      description: "Flavorful vegetarian dishes everyone will love",
      icon: <Leaf className="h-8 w-8" />,
      color: "bg-recipe-green",
      recipes: 28,
      link: "/recipes/categories"
    },
    {
      title: "Grilling Recipes",
      description: "Perfect for outdoor cooking and BBQs",
      icon: <Flame className="h-8 w-8" />,
      color: "bg-recipe-orange",
      recipes: 16,
      link: "/recipes/categories"
    },
    {
      title: "International Cuisine",
      description: "Explore flavors from around the world",
      icon: <Utensils className="h-8 w-8" />,
      color: "bg-recipe-brown",
      recipes: 32,
      link: "/recipes/categories"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <RecipeHeader />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-recipe-cream to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-recipe-brown mb-4">
              Recipe Collections
            </h1>
            <p className="text-lg text-recipe-brown/80 max-w-2xl mx-auto mb-8">
              Explore our curated collections of recipes for any occasion.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection, index) => (
                <CollectionCard key={index} {...collection} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <RecipeFooter />
    </div>
  );
};

export default RecipeCollections;
