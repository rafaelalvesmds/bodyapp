import fastify from 'fastify';
import cors from '@fastify/cors';  // Importando o plugin CORS
import { teacherRoutes } from './controllers/teacherController';
import { studentRoutes } from './controllers/studentController';
import { workoutRoutes } from './controllers/workoutController';
import { exerciseRoutes } from './controllers/exerciseController';

const app = fastify();
const PORT = process.env.PORT || 5002;

app.register(cors, {
  origin: 'http://localhost:3000',  // Permitindo a origem do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],  // Headers permitidos
});

app.register(teacherRoutes, { prefix: '/teachers' });
app.register(studentRoutes, { prefix: '/students' });
app.register(workoutRoutes, { prefix: '/workouts' });
app.register(exerciseRoutes, { prefix: '/exercises' });

app.listen({ port: Number(PORT), host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Servidor rodando na porta ${PORT}`);
    console.log(`Servidor rodando na porta ${PORT}`);
});
