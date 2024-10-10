import { ExerciseModel } from '../models/exerciseModel';
import prisma from '../prisma';

export async function createExercise(data: ExerciseModel) {
    return prisma.exercise.create({
        data: {
            name: data.name,
            repetitions: data.repetitions,
            series: data.series,
            rest: data.rest,
            workoutId: data.workoutId
        }
    });
}

export async function getAllExercises() {
    return prisma.exercise.findMany();
}

export async function updateExercise(id: string, data: ExerciseModel) {
    return prisma.exercise.update({
        where: { id },
        data: {
            name: data.name,
            repetitions: data.repetitions,
            series: data.series,
            rest: data.rest,
            workoutId: data.workoutId
        }
    });
}

export async function deleteExercise(id: string) {
    return prisma.exercise.delete({
        where: { id }
    });
}
