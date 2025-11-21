import { z } from "zod";

// Todo schema (frontend-only, stored in LocalStorage)
export const todoSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Task cannot be empty"),
  completed: z.boolean(),
  createdAt: z.number(),
});

export const insertTodoSchema = todoSchema.omit({ id: true, createdAt: true });

export type Todo = z.infer<typeof todoSchema>;
export type InsertTodo = z.infer<typeof insertTodoSchema>;

// Filter type
export type FilterType = "all" | "active" | "completed";
