
import React from 'react';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-recipe-cream/50 p-4">
      <UtensilsCrossed className="h-16 w-16 text-recipe-orange mb-6" />
      
      <h1 className="text-4xl font-bold text-recipe-brown mb-4">Recipe Not Found</h1>
      
      <p className="text-lg text-recipe-brown/80 mb-8 text-center max-w-md">
        Oops! Looks like this recipe has been misplaced in our kitchen.
      </p>
      
      <div className="recipe-card p-8 mb-8 max-w-md w-full text-center">
        <p className="text-xl text-recipe-orange mb-4">
          Maybe try one of these ingredients instead?
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="ingredient-tag">Home Page</span>
          <span className="ingredient-tag">Recipe Generator</span>
          <span className="ingredient-tag">Saved Recipes</span>
        </div>
      </div>
      
      <Button asChild className="bg-recipe-orange hover:bg-recipe-orange/90">
        <Link to="/">
          Return to Recipe Genie
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
