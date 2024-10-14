import api from './apiService';

export const createTeacher = async (teacherData: { name: string; email: string }) => {
    return await api.post('/teachers', teacherData);
};

export const getTeachers = async (page: number = 1, pageSize: number = 10) => {
    return await api.get(`/teachers`, {
        params: {
            page,
            pageSize
        }
    });
};

export const updateTeacher = async (id: string, teacherData: { name: string; email: string }) => {
    return await api.put(`/teachers/${id}`, teacherData);
};

export const deleteTeacher = async (id: string) => {
    return await api.delete(`/teachers/${id}`);
};
