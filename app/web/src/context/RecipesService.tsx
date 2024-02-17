import axios from "axios";
import { Recipe } from "./types";

const RECIPES_API_DOMAIN = "http://127.0.0.1";
const RECIPES_API_PORT = "8000";
const RECIPES_API_MODEL = "/recipes/";
const RECIPES_API_URL = `${RECIPES_API_DOMAIN}:${RECIPES_API_PORT}${RECIPES_API_MODEL}`;

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const { data } = await axios.get(RECIPES_API_URL);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRecipe(id: string): Promise<Recipe> {
  try {
    console.log("Fetching recipe from API with id: ", id);
    const { data } = await axios.get(`${RECIPES_API_URL}${id}/`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addRecipe(recipe: Recipe): Promise<Recipe> {
  try {
    console.log("Adding recipe to API with data: ", recipe);
    const { data } = await axios.post(RECIPES_API_URL, recipe);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateRecipe(recipe: Recipe): Promise<Recipe> {
  try {
    console.log("Updating recipe in API with data: ", recipe);
    const { data } = await axios.patch(`${RECIPES_API_URL}${recipe.id}/`, recipe);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function removeRecipe(id: string): Promise<void> {
  try {
    console.log("Removing recipe from API with id: ", id);
    await axios.delete(`${RECIPES_API_URL}${id}/`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}