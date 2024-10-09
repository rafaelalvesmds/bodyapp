import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { z } from 'zod';

const app = fastify();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.post('/teachers', async (request, reply) => {

    const createTeacherSchema = z.object({
        name: z.string(),
        email: z.string().email()
    });

    const { name, email } = createTeacherSchema.parse(request.body);

    try {
        const teacher = await prisma.teacher.create({
            data: { name, email }
        });
        reply.code(201).send(teacher);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.get('/teachers', async (request, reply) => {
    try {
        const teachers = await prisma.teacher.findMany({
            include: {
                students: true // Inclui alunos relacionados
            }
        });
        reply.send(teachers);
    } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
    }
});

app.put('/teachers/:id', async (request, reply) => {

    const idSchema = z.object({
        id: z.string().uuid()
    });

    const updateTeacherSchema = z.object({
        name: z.string(),
        email: z.string().email()
    });

    const { id } = idSchema.parse(request.params);

    const { name, email } = updateTeacherSchema.parse(request.body);

    try {
        const teacher = await prisma.teacher.update({
            where: { id },
            data: { name, email }
        });
        reply.send(teacher);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.delete('/teachers/:id', async (request, reply) => {

    const idSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = idSchema.parse(request.params);

    try {
        await prisma.teacher.delete({ where: { id } });
        reply.code(204).send();
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

// Rotas para Student
app.post('/students', async (request, reply) => {

    const updateStudentSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        teacherId: z.string().uuid()
    });

    const { name, email, teacherId } = updateStudentSchema.parse(request.body);

    try {
        const student = await prisma.student.create({
            data: { name, email, teacherId }
        });
        reply.code(201).send(student);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.get('/students', async (request, reply) => {
    try {
        const students = await prisma.student.findMany({
            include: {
                workouts: true // Inclui os treinos relacionados
            }
        });
        reply.send(students);
    } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
    }
});

app.put('/students/:id', async (request, reply) => {
    const idSchema = z.object({
        id: z.string().uuid()
    });

    const updateStudentSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        teacherId: z.string().uuid()
    });

    const { id } = idSchema.parse(request.params);

    const { name, email, teacherId } = updateStudentSchema.parse(request.body);

    try {
        const student = await prisma.student.update({
            where: { id },
            data: { name, email, teacherId }
        });
        reply.send(student);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.delete('/students/:id', async (request, reply) => {
    const idSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = idSchema.parse(request.params);

    try {
        await prisma.student.delete({ where: { id } });
        reply.code(204).send();
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

// Rotas para Workout
app.post('/workouts', async (request, reply) => {
    const createWorkoutSchema = z.object({
        name: z.string(),
        description: z.string(),
        studentId: z.string().uuid(),
        duration: z.number(),
        type: z.number(),
        intensity: z.number()
    });

    const { name, description, studentId, duration, type, intensity } = createWorkoutSchema.parse(request.body);

    try {
        const workout = await prisma.workout.create({
            data: { name, description, studentId, duration, type, intensity }
        });
        reply.code(201).send(workout);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.get('/workouts', async (request, reply) => {
    try {
        const workouts = await prisma.workout.findMany({
            include: {
                exercises: true // Inclui os exercícios relacionados
            }
        });
        reply.send(workouts);
    } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
    }
});

app.put('/workouts/:id', async (request, reply) => {
    const idSchema = z.object({
        id: z.string().uuid()
    });

    const updateWorkoutSchema = z.object({
        name: z.string(),
        description: z.string(),
        studentId: z.string().uuid(),
        duration: z.number(),
        type: z.number(),
        intensity: z.number()
    });

    const { id } = idSchema.parse(request.params);

    const { name, description, studentId, duration, type, intensity } = updateWorkoutSchema.parse(request.body);

    try {
        const workout = await prisma.workout.update({
            where: { id },
            data: { name, description, studentId, duration, type, intensity }
        });
        reply.send(workout);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.delete('/workouts/:id', async (request, reply) => {
    const idSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = idSchema.parse(request.params);

    try {
        await prisma.workout.delete({ where: { id } });
        reply.code(204).send();
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

// Rotas para Exercise
app.post('/exercises', async (request, reply) => {
    const createExerciseSchema = z.object({
        name: z.string(),
        repetitions: z.number(),
        series: z.number(),
        rest: z.number(),
        workoutId: z.string().uuid()
    });

    const { name, repetitions, series, rest, workoutId } = createExerciseSchema.parse(request.body);

    try {
        const exercise = await prisma.exercise.create({
            data: { name, repetitions, series, rest, workoutId }
        });
        reply.code(201).send(exercise);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.get('/exercises', async (request, reply) => {
    try {
        const exercises = await prisma.exercise.findMany();
        reply.send(exercises);
    } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
    }
});

app.put('/exercises/:id', async (request, reply) => {
    const idSchema = z.object({
        id: z.string().uuid()
    });

    const updateExerciseSchema = z.object({
        name: z.string(),
        repetitions: z.number(),
        series: z.number(),
        rest: z.number(),
        workoutId: z.string().uuid()
    });

    const { id } = idSchema.parse(request.params);
    const { name, repetitions, series, rest, workoutId } = updateExerciseSchema.parse(request.body);

    try {
        const exercise = await prisma.exercise.update({
            where: { id },
            data: { name, repetitions, series, rest, workoutId }
        });
        reply.send(exercise);
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

app.delete('/exercises/:id', async (request, reply) => {
    const idSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = idSchema.parse(request.params);

    try {
        await prisma.exercise.delete({ where: { id } });
        reply.code(204).send();
    } catch (error) {
        reply.code(400).send({ error: (error as Error).message });
    }
});

// Iniciando o servidor
app.listen({ port: Number(PORT) }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Servidor rodando em ${address}`);
    console.log(`Servidor rodando em ${address}`);
});
