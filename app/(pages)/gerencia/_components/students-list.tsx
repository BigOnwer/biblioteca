"use client"

import { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { StudentContext } from "@/context/student-context";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function StudentsList() {
    const {deleteStudent, students} = useContext(StudentContext)
    

    return (
        <div className="w-full flex flex-wrap gap-4">
            {students?.map((student) => (
                <div key={student.id} className=" flex flex-col justify-between border-2 border-neutral-600 w-[10%] p-3 rounded-lg">
                    <div>
                        <p className="w-full font-light text-center"><b>Nome:</b> <br />{student.name}</p>
                        <Separator />
                        <p className="w-full font-light text-center"><b>Turma:</b> <br />{student.classe}</p>
                        <Separator />
                        <p className="w-full font-light text-center"><b>Livro:</b> <br />{student.book}</p>
                    </div>
                    
                    <Button className="bg-red-500 hover:bg-red-700" onClick={() => deleteStudent(student.id)}>Excluir <Trash2/></Button>
                </div>
            )) || <p>Nenhum aluno encontrado.</p>}
        </div>
    );
}
