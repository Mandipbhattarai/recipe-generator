
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChefHat, 
  UtensilsCrossed, 
  Loader2,
  BookmarkPlus
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateRecipeFromIngredients, generateRecipeFromCuisine, saveRecipe } from '@/api/recipeApi';

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cuisine?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
}

interface RecipeGeneratorProps {
  onSaveRecipe?: (recipe: Recipe) => void;
}

const RecipeGenerator = ({ onSaveRecipe }: RecipeGeneratorProps) => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  const handleGenerateRecipe = async (method: 'ingredients' | 'cuisine') => {
    setLoading(true);
    
    try {
      let generatedRecipe: Recipe;
      
      if (method === 'ingredients') {
        generatedRecipe = await generateRecipeFromIngredients(ingredients);
      } else {
        generatedRecipe = await generateRecipeFromCuisine(cuisine);
      }
      
      setRecipe(generatedRecipe);
      toast({
        title: "Recipe generated!",
        description: `Your ${generatedRecipe.cuisine} recipe is ready.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error generating recipe",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!recipe) return;
    
    try {
      const saved = await saveRecipe(recipe);
      if (saved) {
        onSaveRecipe?.(recipe);
        toast({
          title: "Recipe saved!",
          description: `${recipe.title} has been saved to your recipes.`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving recipe",
        description: "There was a problem saving your recipe. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="ingredients" className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4" />
                By Ingredients
              </TabsTrigger>
              <TabsTrigger value="cuisine" className="flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                By Cuisine
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="space-y-4">
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
                  Enter ingredients you have (separated by commas)
                </label>
                <Textarea
                  id="ingredients"
                  placeholder="e.g. chicken, rice, broccoli, soy sauce"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="min-h-24"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The more ingredients you list, the better your recipe will be.
                </p>
              </div>
              <Button 
                onClick={() => handleGenerateRecipe('ingredients')} 
                className="w-full bg-recipe-orange hover:bg-recipe-orange/90"
                disabled={loading || !ingredients.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Recipe'
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="cuisine" className="space-y-4">
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium mb-2">
                  Enter a cuisine type
                </label>
                <Input
                  id="cuisine"
                  placeholder="e.g. Italian, Mexican, Thai"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific for better results (e.g. "Northern Italian" instead of just "Italian").
                </p>
              </div>
              <Button 
                onClick={() => handleGenerateRecipe('cuisine')} 
                className="w-full bg-recipe-orange hover:bg-recipe-orange/90"
                disabled={loading || !cuisine.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Recipe'
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {recipe && (
        <div className="mt-8 recipe-card p-6 animate-fade-in">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-recipe-brown mb-4">{recipe.title}</h2>
            <Button 
              variant="outline" 
              className="border-recipe-green text-recipe-green hover:bg-recipe-green/10"
              onClick={handleSaveRecipe}
            >
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Save Recipe
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.cuisine && (
              <span className="ingredient-tag">{recipe.cuisine}</span>
            )}
            {recipe.prepTime && (
              <span className="ingredient-tag">Prep: {recipe.prepTime}</span>
            )}
            {recipe.cookTime && (
              <span className="ingredient-tag">Cook: {recipe.cookTime}</span>
            )}
            {recipe.servings && (
              <span className="ingredient-tag">Serves: {recipe.servings}</span>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-recipe-brown mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-recipe-orange"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-recipe-brown mb-3">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-recipe-green text-white text-sm">
                      {i + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
