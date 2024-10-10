import { z } from 'zod';

export const exerciseSchema = z.object({
    name: z.string(),
    repetitions: z.number(),
    series: z.number(),
    rest: z.number(),
    workoutId: z.string().uuid()
});