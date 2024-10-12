"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { createTeacher, getTeachers } from "@/core/services/teacherService"
import { TeacherModel } from "./models/teacherModel"
import { useEffect, useState } from "react"


const teacherSchema = z.object({
    name: z.string(),
    email: z.string().email(),
})

export default function TeacherForm() {

    const [teachers, setTeachers] = useState<TeacherModel[]>([])

    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    const fetchTeachers = async () => {
        try {
            const response = await getTeachers()
            setTeachers(response.data)  
            console.log("Professores", response.data)
        } catch (error) {
            console.error("Erro ao buscar professores", error)
        }
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    async function onSubmit(value: z.infer<typeof teacherSchema>) {
        
        console.log(value, "add professor")
        try {
            let response = await createTeacher(value)
            alert("Professor cadastrado com sucesso!")
            setTeachers((prevTeachers) => [...prevTeachers, response.data])
            form.reset()
        } catch (error: any) {
            alert(`Erro ao cadastrar professor: ${error}`)
        }
    }

    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Professores</CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Adicionar</Button>
                    </form>
                </Form>

                <Table>
                    {/* <TableCaption>Lista de professores</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>{teacher.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </CardContent>
        </Card>


    )
}
