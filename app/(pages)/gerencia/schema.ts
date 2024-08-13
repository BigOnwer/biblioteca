import { z } from "zod";

export const deleteTodoSchema = z.object({
    id: z.string(),
  })