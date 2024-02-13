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