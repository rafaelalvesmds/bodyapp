import { FastifyInstance } from 'fastify';
import { createTeacher, getAllTeachers, updateTeacher, deleteTeacher } from '../services/teacherService';
import { teacherSchema } from '../schemas/teacherSchemas';
import { idSchema } from '../schemas/idSchema';

export async function teacherRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const { name, email } = teacherSchema.parse(request.body);
        try {
            const teacher = await createTeacher({ name, email });
            reply.code(201).send(teacher);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.get('/', async (request, reply) => {
        try {
            const teachers = await getAllTeachers();
            reply.send(teachers);
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message });
        }
    });

    app.put('/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);
        const { name, email } = teacherSchema.parse(request.body);

        try {
            const teacher = await updateTeacher(id, { name, email });
            reply.send(teacher);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.delete('/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);

        try {
            await deleteTeacher(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });
}
