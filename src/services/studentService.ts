import { StudentModel } from '../models/studentModel';
import prisma from '../prisma';

export async function createStudent(data: StudentModel) {
    return prisma.student.create({
        data: {
            name: data.name,
            email: data.email,
            teacherId: data.teacherId
        }
    });
}

export async function getAllStudents() {
    return prisma.student.findMany({
        include: {
            workouts: true
        }
    });
}

export async function updateStudent(id: string, data: StudentModel) {
    return prisma.student.update({
        where: { id },
        data: {
            name: data.name,
            email: data.email,
            teacherId: data.teacherId
        }
    });
}

export async function deleteStudent(id: string) {
    return prisma.student.delete({
        where: { id }
    });
}
