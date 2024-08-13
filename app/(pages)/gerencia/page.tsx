'use client'

import { BookDialogProvider } from "@/context/book-dialog";
import { BookDialog } from "./_components/book-dialog";
import { Separator } from "@/components/ui/separator";
import { BooksList } from "./_components/book-list";
import { StudentsList } from "./_components/students-list";
import { StudentDialogProvider } from "@/context/student-context";

export default async function ADM() {
    return(
        <BookDialogProvider>
            <div className="m-3">
                <div>
                    <BookDialog/>
                </div>

                <div>
                    Alunos:

                    <Separator className="my-3"/>
                    <StudentDialogProvider>
                        <StudentsList/>
                    </StudentDialogProvider>
                </div>
                    
                <div>
                    Books:

                    <Separator className="my-3"/>

                    <BooksList/>
                </div>
            </div>
        </BookDialogProvider>
    )
}