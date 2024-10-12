import { FastifyInstance } from 'fastify';
import { createStudent, getAllStudents, updateStudent, deleteStudent } from '../services/studentService';
import { studentSchema } from '../schemas/studentSchemas';
import { idSchema } from '../schemas/idSchema';

export async function studentRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const { name, email, teacherId } = studentSchema.parse(request.body);

        try {
            const student = await createStudent({ name, email, teacherId });
            reply.code(201).send(student);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.get('/', async (request, reply) => {
        try {
            const students = await getAllStudents();
            reply.send(students);
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message });
        }
    });

    app.put('/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);
        const { name, email, teacherId } = studentSchema.parse(request.body);

        try {
            const student = await updateStudent(id, { name, email, teacherId });
            reply.send(student);
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });

    app.delete('/:id', async (request, reply) => {
        const { id } = idSchema.parse(request.params);

        try {
            await deleteStudent(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(400).send({ error: (error as Error).message });
        }
    });
}
