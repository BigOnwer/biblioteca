import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/sessions";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BooksList } from "@/components/books";
import { BookDialogProvider } from "@/context/book-dialog";
import { StudentDialogProvider } from "@/context/student-context";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="m-3">
      <header className="flex justify-between">
        <div className="mb-2">
          <Link href="/login" className={`${cn(buttonVariants({ size: "lg" }))}, text-xs px-2`}>
            Acesso Administracao
          </Link>
            
        </div>
        <div className="w-1/3 flex">
          <Input placeholder="Pesquisar livro" className="w-full rounded-e-none"/>
          <Button className="rounded-s-none"><Search/></Button>
        </div>
      </header>

      <Separator className="my-2"/>

      <BookDialogProvider>
        <main id="books" className="">
          <StudentDialogProvider>
            <BooksList/>
          </StudentDialogProvider>
        </main>
      </BookDialogProvider>

      
    </div>
  );
}