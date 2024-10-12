// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"

// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"

// import { Input } from "@/components/ui/input"
// import { createStudent, getStudents } from "@/core/services/studentService"
// import { StudentModel } from "./models/studentModel"
// import { useEffect, useState } from "react"

// const studentSchema = z.object({
//     name: z.string(),
//     email: z.string().email(),
// })

// export default function StudentForm() {

//     // Use state para armazenar os estudantes
//     const [students, setStudents] = useState<StudentModel[]>([])

//     const form = useForm<z.infer<typeof studentSchema>>({
//         resolver: zodResolver(studentSchema),
//         defaultValues: {
//             name: "",
//             email: "",
//         },
//     })

//     // Função para buscar estudantes e atualizar o estado
//     const fetchStudents = async () => {
//         try {
//             const response = await getStudents()
//             setStudents(response.data)  // Atualiza o estado com os dados recebidos
//             console.log("Estudantes", response.data)
//         } catch (error) {
//             console.error("Erro ao buscar estudantes", error)
//         }
//     }

//     // Carregar os estudantes assim que o componente for montado
//     useEffect(() => {
//         fetchStudents()
//     }, [])

//     // Função de submit
//     async function onSubmit(value: z.infer<typeof studentSchema>) {
//         console.log(value, "value")

//         try {
//             let response = await createStudent(value)
//             console.log(response, "response")
//             alert("Estudante cadastrado com sucesso!")
//             form.reset()
//             fetchStudents()  // Atualiza a lista de estudantes após cadastrar
//         } catch (error: any) {
//             alert(`Erro ao cadastrar estudante: ${error}`)
//         }
//     }

//     return (
//         // Coloque o form num card que ocupa metade da tela, usando Tailwind CSS
//         <div className="w-1/2 mx-auto p-4 bg-white shadow-md rounded-lg">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                     <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Nome</FormLabel>
//                                 <FormControl>
//                                     <Input {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Email</FormLabel>
//                                 <FormControl>
//                                     <Input type="email" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <Button type="submit">Submit</Button>
//                 </form>
//             </Form>

//             <Table>
//                 <TableCaption>Lista de estudantes</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Nome</TableHead>
//                         <TableHead>Email</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {students.map((student) => (
//                         <TableRow key={student.id}>
//                             <TableCell>{student.name}</TableCell>
//                             <TableCell>{student.email}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }
