import { z } from "zod";

export const registrationSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const calorieSchema = z.object({
  dish_name: z.string().min(1, "Dish name is required"),
  servings: z
    .number({ error: "Servings must be a number" })
    .positive("Servings must be greater than 0"),
});

export type RegisterInput = z.infer<typeof registrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CalorieInput = z.infer<typeof calorieSchema>;
