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
    TableFooter,
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

import { createTeacher, getTeachers } from "@/core/services/teacherService"
import { TeacherModel } from "./models/teacherModel"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Skeleton } from "@/components/ui/skeleton"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import React from "react"


const teacherSchema = z.object({
    name: z.string(),
    email: z.string().email(),
})


export default function TeacherForm() {


    const [currentPage, setCurrentPage] = useState(1)

    const [teachers, setTeachers] = useState<TeacherModel[]>([])

    const [loading, setLoading] = useState(true)

    const [dialogOpen, setDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    const fetchTeachers = async (page: number) => {
        setLoading(true)

        try {
            const response = await getTeachers(page)
            console.log("response", response.data)
            setTeachers(response.data.teachers)
            setLoading(false)
        } catch (error) {
            console.error("Erro ao buscar professores", error)
        }
    }

    useEffect(() => {
        fetchTeachers(currentPage)
    }, [currentPage])


    async function onSubmit(value: z.infer<typeof teacherSchema>) {
        console.log(form, 'form')
        try {
            let response = await createTeacher(value)

            fetchTeachers(currentPage);
            form.reset();
        } catch (error: any) {
            alert(`Erro ao cadastrar professor: ${error}`)
        }
    }

    async function edit(teacher: TeacherModel) {
        console.log("edit", teacher)
        setDialogOpen(true)
    }

    return (
        <Card className="min-w-96 w-4/6">
            <CardHeader className="flex flex-row justify-between items-center p-4">
                <CardTitle>Professores</CardTitle>

                <Button variant="outline" onClick={() => setDialogOpen(true)}>
                    <PlusIcon className="mr-2" />
                    Cadastrar novo
                </Button>
            </CardHeader>

            <CardContent className="space-y-2 p-3">
                <Table className="overflow-hidden w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.length === 0 ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton className="h-[28px] w-[100px] rounded" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-[28px] w-[100px] rounded" />
                                    </TableCell>
                                    <TableCell className="flex gap-x-2 justify-end">
                                        <Skeleton className="h-[28px] w-[28px] rounded" />
                                        <Skeleton className="h-[28px] w-[28px] rounded" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell className="flex gap-x-2 justify-end">
                                        <Button className="h-7 w-7" size="icon" variant="secondary" onClick={() => { edit(teacher) }}>
                                            <Pencil1Icon />
                                        </Button>
                                        <Button className="h-7 w-7" size="icon" variant="destructive" >
                                            <TrashIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter >

                    </TableFooter>
                </Table>

                {loading ? (
                    <div className="h-1 bg-gray-600 relative overflow-hidden rounded">
                        <div className="absolute left-0 top-0 h-full w-full bg-gray-200 animate-indeterminate"></div>
                    </div>
                ) : (
                    <div className="h-1  relative overflow-hidden rounded">
                    </div>
                )}


                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage((prevPage) => {
                                            const newPage = prevPage - 1;
                                            fetchTeachers(newPage);
                                            return newPage;
                                        });
                                    }
                                }}
                                style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto', opacity: currentPage === 1 ? 0.5 : 1 }}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer"
                                onClick={() => {
                                    setCurrentPage((prevPage) => {
                                        const newPage = prevPage + 1;
                                        fetchTeachers(newPage);
                                        return newPage;
                                    });
                                }}
                                style={{ pointerEvents: teachers.length < 10 ? 'none' : 'auto', opacity: teachers.length < 10 ? 0.5 : 1 }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </CardContent>

            <Dialog open={dialogOpen} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mb-4">Novo professor</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-4">
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
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={async () => {
                                    await form.handleSubmit(onSubmit)();
                                }}
                            >
                                Cadastrar
                            </Button>
                        </DialogClose>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </Card>




    )
}
