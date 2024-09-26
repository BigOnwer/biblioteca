'use client'

import { BookContext } from "@/context/book-dialog"
import Image from "next/image"
import { useContext, useState } from "react"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { StudentContext } from "@/context/student-context"
import { useRouter } from "next/navigation"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

const NewCardFormSchema = z.object({
    name: z.string(),
    classe: z.string(),
    book: z.string(),
})

type newCardFormInput = z.infer<typeof NewCardFormSchema>

export function BooksList() {
    const {book} = useContext(BookContext)
    const {CreateStudent} = useContext(StudentContext)
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<newCardFormInput>({
        resolver: zodResolver(NewCardFormSchema),
    });

    async function handleStudent(data: newCardFormInput) {
        console.log('sla')
        setIsLoading(true);
        try {
            const { name, classe, book } = data;
            CreateStudent({name, classe, book})
            toast({
                title: 'Sucesso ao pegar livro',
                variant: 'default'
            })
            reset();
            router.refresh()
        } catch (error) {
            toast({
                title: 'Erro ao tentar pegar um livro',
                description: 'Tente novamente mais tarde',
                variant: 'destructive'
            })
            console.log(error);
        }
        setIsLoading(false);
    }

    return(
        <ScrollArea className="w-full whitespace-nowrap ">
            <div className="flex space-x-4 h-96 p-4">
                {book.map((book, index) => (
                    <div key={index} className="border-2 border-neutral-600 w-1/6 p-3 rounded-lg">
                        <Image
                            src={book.image}
                            alt={book.name}
                            width={1000}
                            height={1000}
                            className="w-96 "
                        />
                        <p className="w-full font-light text-center">{book.name}</p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button>Pegar</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <div>
                                    <AlertDialogHeader>
                                        <div className="flex justify-between items-center">
                                            <AlertDialogTitle>{book.name}</AlertDialogTitle>
                                            <AlertDialogCancel asChild>
                                                <Button variant={"ghost"}>
                                                    <X/>
                                                </Button>
                                            </AlertDialogCancel>
                                        </div>
                                    </AlertDialogHeader>

                                    <form className="space-y-3" onSubmit={handleSubmit(handleStudent)}>
                                        <div>
                                            <Label>Nome Completo</Label>
                                            <Input placeholder="Ex.: Gustavo Leal" {...register('name')} required/>
                                        </div>
                                        
                                        <div>
                                            <Label>Turma</Label>
                                            <Input placeholder="Ex.:8 ano A" {...register('classe')} required/>
                                        </div>

                                        <div className="cursor-not-allowed">
                                            <Label>Livro</Label>
                                            <Input placeholder="Ex.:Diario de uma banana" value={book.name} {...register('book')} readOnly/>
                                        </div>

                                        <Button type="submit" disabled={isLoading}>
                                            Finalizar
                                        </Button>
                                    </form>
                                </div>
                                <div className="flex space-x-3">
                                    <Image src={book.image} alt="" width={200} height={300}  className="w-1/3"/>
                                    <p>{book.description}</p>
                                </div>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}
            </div>
            

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}