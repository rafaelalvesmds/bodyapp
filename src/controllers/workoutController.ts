import { FastifyInstance } from 'fastify';
import { workoutSchema } from '../schemas/workoutSchemas';
import { createWorkout, getAllWorkouts, updateWorkout, deleteWorkout } from '../services/workoutServices';
import { idSchema } from '../schemas/idSchema';

export async function workoutRoutes(app: FastifyInstance) {

    app.post('/workouts', async (request, reply) => {
        const { name, description, studentId, duration, type, intensity } = workoutSchema.parse(request.body);

        try {
            const workout = await createWorkout({ name, description, studentId, duration, type, intensity });
            reply.code(201).send(workout);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.get('/workouts', async (request, reply) => {
        try {
            const workouts = await getAllWorkouts();
            reply.send(workouts);
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message });
        }
    });

    app.put('/workouts/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);
        const { name, description, studentId, duration, type, intensity } = workoutSchema.parse(request.body);

        try {
            const workout = await updateWorkout(id, { name, description, studentId, duration, type, intensity });
            reply.send(workout);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.delete('/workouts/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);

        try {
            await deleteWorkout(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });
}
