import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookContext } from "@/context/book-dialog";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

const NewCardFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    position: z.string(),
})

type newCardFormInput = z.infer<typeof NewCardFormSchema>

export function BookDialog() {
    const { CreateBook } = useContext(BookContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<newCardFormInput>({
        resolver: zodResolver(NewCardFormSchema),
    });

    async function handleRegister(data: newCardFormInput) {
        setIsLoading(true);
        try {
            const { name, description, image, position } = data;
            await CreateBook({ name, description, image, position });
            toast({
                title: 'Sucesso ao adicionar um novo livro',
                variant: 'default'
            })
            reset();
        } catch (error) {
            toast({
                title: 'Erro ao tentar criar novo valor',
                description: 'Tente novamente mais tarde',
                variant: 'destructive'
            })
            console.log(error);
        }
        setIsLoading(false);
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild><Button>Adicionar Livro</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle>Quer adicionar um novo livro?</AlertDialogTitle>
                        <AlertDialogCancel asChild>
                            <Button variant={"ghost"}>
                                <X/>
                            </Button>
                        </AlertDialogCancel>
                    </div>
                </AlertDialogHeader>

                <form className="space-y-3" onSubmit={handleSubmit(handleRegister)}>
                    <div>
                        <Label>Nome</Label>
                        <Input placeholder="Nome do livro" {...register('name')} required/>
                    </div>
                    
                    <div>
                        <Label>Descricao</Label>
                        <Input placeholder="Descricao do livro" {...register('description')} required/>
                    </div>

                    <div>
                        <Label>Capa</Label>
                        <Input placeholder="Capa do livro"  {...register('image')} required/>
                    </div>

                    <div>
                        <Label>Posicao</Label>
                        <Input placeholder="Posicao do livro" {...register('position')} required/>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        Adicionar
                    </Button>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}