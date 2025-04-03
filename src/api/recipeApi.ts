import { Recipe } from "@/components/RecipeGenerator";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Mock data for saved recipes
const mockSavedRecipes: Recipe[] = [
  {
    title: "Garlic Butter Shrimp Pasta",
    ingredients: [
      "8 oz linguine pasta",
      "1 lb large shrimp, peeled and deveined",
      "4 cloves garlic, minced",
      "4 tbsp butter",
      "1/4 cup white wine",
      "1 tbsp lemon juice",
      "1/4 cup fresh parsley, chopped",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
    ],
    instructions: [
      "Cook pasta according to package directions. Reserve 1/2 cup pasta water before draining.",
      "In a large skillet, melt 2 tbsp butter over medium-high heat.",
      "Add shrimp and cook for 1-2 minutes per side until pink. Remove and set aside.",
      "In the same skillet, add remaining butter and garlic. Cook for 30 seconds until fragrant.",
      "Add white wine and lemon juice, simmer for 2 minutes.",
      "Return shrimp to skillet, add drained pasta, parsley, and toss everything together.",
      "Add pasta water as needed to create a silky sauce. Season with salt and pepper.",
      "Garnish with more parsley and red pepper flakes if desired.",
    ],
    cuisine: "Italian",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
  },
  {
    title: "Thai Coconut Curry Soup",
    ingredients: [
      "2 tbsp coconut oil",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 tbsp red curry paste",
      "4 cups vegetable broth",
      "1 can (14 oz) coconut milk",
      "1 red bell pepper, sliced",
      "1 cup mushrooms, sliced",
      "1 cup snap peas",
      "1 tbsp fish sauce (or soy sauce for vegetarian)",
      "1 lime, juiced",
      "Fresh cilantro for garnish",
    ],
    instructions: [
      "Heat coconut oil in a large pot over medium heat.",
      "Add onion and cook until translucent, about 5 minutes.",
      "Add garlic and ginger, cook for 1 minute until fragrant.",
      "Stir in red curry paste and cook for another minute.",
      "Pour in vegetable broth and coconut milk, bring to a simmer.",
      "Add bell pepper, mushrooms, and snap peas, simmer for 10 minutes.",
      "Stir in fish sauce and lime juice.",
      "Serve hot, garnished with fresh cilantro.",
    ],
    cuisine: "Thai",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 6,
  },
];

export const fetchSavedRecipes = async (): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockSavedRecipes;
};

export const generateRecipeFromIngredients = async (ingredients: string) => {
  if (!ingredients.trim()) {
    throw new Error("Please enter some ingredients");
  }

  const prompt = `Generate a recipe using the following ingredients: ${ingredients}.
  Strictly return the output in this JSON format without any extra text:
  {
    "title": "string",
    "ingredients": ["string"],
    "instructions": ["string"],
    "cuisine": "string",
    "prepTime": "string",
    "cookTime": "string",
    "servings": number
  }`;

  try {
    const result = await model.generateContent(prompt);
    let response = result.response.text();
    console.log("Generated recipe response:", response);
    // Parse to ensure it's valid JSON
    response = response.replace(/```json|```/g, "").trim();
    return JSON.parse(response);
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe.");
  }
};

export const generateRecipeFromCuisine = async (
  cuisine: string
): Promise<Recipe> => {
  if (!cuisine.trim()) {
    throw new Error("Please enter a cuisine type");
  }

  const prompt = `
    Generate a recipe for a classic dish from ${cuisine} cuisine.
    Strictly return JSON in this format:
    {
      "title": "string",
      "ingredients": ["string"],
      "instructions": ["string"],
      "cuisine": "string",
      "prepTime": "string",
      "cookTime": "string",
      "servings": number
    }
    Ensure the response is valid JSON with no extra text, explanations, or formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    let response = result.response.text();

    // ✅ Remove unwanted code block formatting (` ```json ... ``` `)
    response = response.replace(/```json|```/g, "").trim();

    return JSON.parse(response);
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe.");
  }
};

export const saveRecipe = async (recipe: Recipe): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, this would save to a database
  console.log("Saving recipe:", recipe);
  return true;
};
