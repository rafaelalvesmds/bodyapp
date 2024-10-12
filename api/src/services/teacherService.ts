import { TeacherModel } from '../models/teacherModel';
import prisma from '../prisma';

export async function createTeacher(data: TeacherModel) {
    return await prisma.teacher.create({
        data
    });
}

export async function getAllTeachers() {
    return await prisma.teacher.findMany({
        include: { students: true }
    });
}

export async function updateTeacher(id: string, data: TeacherModel) {
    return await prisma.teacher.update({
        where: { id },
        data
    });
}

export async function deleteTeacher(id: string) {
    return await prisma.teacher.delete({
        where: { id }
    });
}
