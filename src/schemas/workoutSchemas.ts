import { z } from 'zod';

export const workoutSchema = z.object({
    name: z.string(),
    description: z.string(),
    studentId: z.string().uuid(),
    duration: z.number(),
    type: z.number(),
    intensity: z.number()
});