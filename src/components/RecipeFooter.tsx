import React from "react";
import { UtensilsCrossed, Heart } from "lucide-react";

const RecipeFooter = () => {
  return (
    <footer className="w-full py-8 bg-recipe-cream border-t border-recipe-beige mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <UtensilsCrossed className="h-6 w-6 text-recipe-orange" />
            <span className="text-xl font-semibold text-recipe-brown">
              Recipe Genie
            </span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-recipe-brown mb-2">
              AI-powered recipe suggestions based on your ingredients
            </p>
            <p className="text-xs text-recipe-brown flex items-center justify-center md:justify-end gap-1">
              Made for SDL Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RecipeFooter;
