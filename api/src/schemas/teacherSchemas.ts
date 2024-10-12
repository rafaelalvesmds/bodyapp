import { z } from 'zod';

export const teacherSchema = z.object({
    name: z.string(),
    email: z.string().email()
});
