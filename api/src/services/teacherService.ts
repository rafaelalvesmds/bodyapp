import { TeacherModel } from '../models/teacherModel';
import prisma from '../prisma';

export async function createTeacher(data: TeacherModel) {
    return await prisma.teacher.create({
        data
    });
}

export async function getAllTeachers(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize; 
    const take = pageSize; 

    const teachers = await prisma.teacher.findMany({
        skip,
        take,
        include: { students: true },
        orderBy: { createdAt: 'asc' }
    });

    const totalTeachers = await prisma.teacher.count();

    return {
        teachers,
        total: totalTeachers, 
        page, 
        pageSize, 
        totalPages: Math.ceil(totalTeachers / pageSize) 
    };
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
