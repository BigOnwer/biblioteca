import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogHeader } from "@/components/ui/alert-dialog";
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const NewCardFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    position: z.string(),
    genre: z.string(),
});

export function BookDialog() {
    const form = useForm<z.infer<typeof NewCardFormSchema>>({
        resolver: zodResolver(NewCardFormSchema),
        defaultValues: {
          name: "",
          description: "",
          image: "",
          position: "",
          genre: "",
        },
    });

    const { CreateBook } = useContext(BookContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleRegister(data: z.infer<typeof NewCardFormSchema>) {
        setIsLoading(true);
        try {
            const { name, description, image, position, genre } = data;
            await CreateBook({ name, description, image, position, genre });
            toast({
                title: 'Sucesso ao adicionar um novo livro',
                variant: 'default',
            });
            form.reset();
        } catch (error) {
            toast({
                title: 'Erro ao tentar criar novo valor',
                description: 'Tente novamente mais tarde',
                variant: 'destructive',
            });
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button>Adicionar Livro</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle>Quer adicionar um novo livro?</AlertDialogTitle>
                        <AlertDialogCancel asChild>
                            <Button variant={"ghost"}>
                                <X />
                            </Button>
                        </AlertDialogCancel>
                    </div>
                </AlertDialogHeader>

                <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(handleRegister)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do livro" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição do livro" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capa</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Capa do livro" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Posição</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Posição do livro" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genero</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o genero do livro" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Aventura">Aventura</SelectItem>
                                            <SelectItem value="Romance">Romance</SelectItem>
                                            <SelectItem value="Drama">Drama</SelectItem>
                                            <SelectItem value="Misterio">Misterio</SelectItem>
                                            <SelectItem value="Fantasia">Fantasia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />

                        <Button type="submit" disabled={isLoading}>
                            Adicionar
                        </Button>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
