
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, BookOpen, Search, BookmarkPlus, Home, Grid3X3 } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-recipe-beige hover:text-recipe-brown focus:bg-recipe-beige focus:text-recipe-brown",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const RecipeHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-recipe-cream border-b border-recipe-beige shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-recipe-orange" />
          <h1 className="text-2xl font-bold text-recipe-brown">Recipe Genie</h1>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-recipe-brown transition-colors hover:bg-recipe-beige hover:text-recipe-orange focus:bg-recipe-beige focus:text-recipe-orange focus:outline-none">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-recipe-brown hover:bg-recipe-beige hover:text-recipe-orange">
                <BookOpen className="mr-2 h-4 w-4" />
                Recipes
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem
                    href="/recipes/all"
                    title="Browse All Recipes"
                  >
                    Explore our complete collection of delicious recipes.
                  </ListItem>
                  <ListItem
                    href="/recipes/popular"
                    title="Popular Recipes"
                  >
                    Discover what others are cooking and loving.
                  </ListItem>
                  <ListItem
                    href="/recipes/categories"
                    title="Recipe Categories"
                  >
                    Browse recipes by meal type, cuisine, or dietary needs.
                  </ListItem>
                  <ListItem
                    href="/recipes/seasonal"
                    title="Seasonal Favorites"
                  >
                    Recipes that highlight the best ingredients of the season.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/create">
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-recipe-brown transition-colors hover:bg-recipe-beige hover:text-recipe-orange focus:bg-recipe-beige focus:text-recipe-orange focus:outline-none">
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Generate Recipe
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/collections">
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-recipe-brown transition-colors hover:bg-recipe-beige hover:text-recipe-orange focus:bg-recipe-beige focus:text-recipe-orange focus:outline-none">
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Collections
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/saved">
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-recipe-brown transition-colors hover:bg-recipe-beige hover:text-recipe-orange focus:bg-recipe-beige focus:text-recipe-orange focus:outline-none">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Saved Recipes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <Link to="/search" className="p-2 rounded-full hover:bg-recipe-beige text-recipe-brown hover:text-recipe-orange transition-colors">
            <Search className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default RecipeHeader;
