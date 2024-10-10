import { WorkoutModel } from '../models/workoutModel';
import prisma from '../prisma';

export async function createWorkout(data: WorkoutModel) {
    return await prisma.workout.create({
        data
    });
}

export async function getAllWorkouts() {
    return await prisma.workout.findMany({
        include: {
            exercises: true
        }
    });
}

export async function updateWorkout(id: string, data: WorkoutModel) {
    return await prisma.workout.update({
        where: { id },
        data
    });
}

export async function deleteWorkout(id: string) {
    return await prisma.workout.delete({
        where: { id }
    });
}
