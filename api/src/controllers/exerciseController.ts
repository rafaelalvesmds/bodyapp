import { FastifyInstance } from 'fastify';
import { createExercise, getAllExercises, updateExercise, deleteExercise } from '../services/exerciseService';
import { exerciseSchema } from '../schemas/exerciseSchemas';
import { idSchema } from '../schemas/idSchema';

export async function exerciseRoutes(app: FastifyInstance) {

    app.post('/', async (request, reply) => {
        const { name, repetitions, series, rest, workoutId } = exerciseSchema.parse(request.body);

        try {
            const exercise = await createExercise({ name, repetitions, series, rest, workoutId });
            reply.code(201).send(exercise);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.get('/', async (request, reply) => {
        try {
            const exercises = await getAllExercises();
            reply.send(exercises);
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message });
        }
    });

    app.put('/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);
        const { name, repetitions, series, rest, workoutId } = exerciseSchema.parse(request.body);

        try {
            const exercise = await updateExercise(id, { name, repetitions, series, rest, workoutId });
            reply.send(exercise);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.delete('/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);

        try {
            await deleteExercise(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });
}
