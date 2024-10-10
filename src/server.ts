import fastify from 'fastify';
import { teacherRoutes } from './controllers/teacherController';
import { studentRoutes } from './controllers/studentController';
import { workoutRoutes } from './controllers/workoutController';
import { exerciseRoutes } from './controllers/exerciseController';

const app = fastify();
const PORT = process.env.PORT || 3000;

app.register(teacherRoutes, { prefix: '/teachers' });
app.register(studentRoutes, { prefix: '/students' });
app.register(workoutRoutes, { prefix: '/workouts' });
app.register(exerciseRoutes, { prefix: '/exercises' });

app.listen({ port: Number(PORT) }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Servidor rodando em ${address}`);
    console.log(`Servidor rodando em ${address}`);
});
