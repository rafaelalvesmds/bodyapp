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


const teacherSchema = z.object({
    name: z.string(),
    email: z.string().email(),
})

export default function TeacherForm() {

    const [currentPage, setCurrentPage] = useState(1)

    const [teachers, setTeachers] = useState<TeacherModel[]>([])

    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    const fetchTeachers = async (page: number) => {
        try {
            const response = await getTeachers(page)
            console.log("response", response.data)
            setTeachers(response.data.teachers)
            console.log("response", response.data)
        } catch (error) {
            console.error("Erro ao buscar professores", error)
        }
    }

    useEffect(() => {
        fetchTeachers(currentPage)
    }, [currentPage])

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
        <Card className="w-1/2 ">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Professores</CardTitle>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <PlusIcon className="mr-2" />
                            Cadastrar novo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="mb-4">Novo professor</DialogTitle>
                            <DialogDescription>
                                Preencha os dados do novo professor abaixo. Clique em cadastrar quando terminar.
                            </DialogDescription>
                        </DialogHeader>

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
                            </form>
                        </Form>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" onClick={form.handleSubmit(onSubmit)}>
                                    Cadastrar
                                </Button>
                            </DialogClose>
                        </DialogFooter>

                    </DialogContent>
                </Dialog>
            </CardHeader>

            <CardContent className="space-y-8">
                <Table className="overflow-hidden">
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
                                        <Skeleton className="h-[36px] w-[100px] rounded" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-[36px] w-[150px] rounded" />
                                    </TableCell>
                                    <TableCell className="flex gap-x-2 justify-end">
                                        <Skeleton className="h-[36px] w-[30px] rounded" />
                                        <Skeleton className="h-[36px] w-[30px] rounded" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell className="flex gap-x-2 justify-end">
                                        <Button size="icon" variant="secondary">
                                            <Pencil1Icon />
                                        </Button>
                                        <Button variant="destructive" size="icon">
                                            <TrashIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>

                    </TableFooter>
                </Table>
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


        </Card>




    )
}
