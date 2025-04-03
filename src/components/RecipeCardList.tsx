
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Bookmark } from 'lucide-react';
import { Recipe } from './RecipeGenerator';

interface RecipeCardListProps {
  recipes: Recipe[];
  onSave?: (recipe: Recipe) => void;
}

const RecipeCardList = ({ recipes, onSave }: RecipeCardListProps) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No recipes found. Generate a recipe to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {recipes.map((recipe, index) => (
        <Card key={index} className="recipe-card">
          <div className="h-48 bg-gradient-to-r from-recipe-orange/20 to-recipe-green/20 flex items-center justify-center">
            <span className="text-4xl">🍲</span>
          </div>
          
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-recipe-brown mb-2 line-clamp-2">
              {recipe.title}
            </h3>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {recipe.cuisine && (
                <Badge variant="outline" className="bg-recipe-beige text-recipe-brown border-none">
                  {recipe.cuisine}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              {recipe.prepTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{recipe.prepTime}</span>
                </div>
              )}
              
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Serves {recipe.servings}</span>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 flex justify-between">
            <Button variant="ghost" size="sm" className="gap-1 text-recipe-brown hover:text-recipe-orange">
              <Star className="h-4 w-4" />
              <span>Rate</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 border-recipe-orange text-recipe-orange hover:bg-recipe-orange/10"
              onClick={() => onSave?.(recipe)}
            >
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecipeCardList;
