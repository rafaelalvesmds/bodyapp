import { z } from 'zod';

export const studentSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    teacherId: z.string().uuid()
});
