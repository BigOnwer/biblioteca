'use client'

import { API } from "@/lib/axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Student {
    id: string
    name: string
    classe: string
    book: string
    createdAt: string
}

interface CreateStudentValueProps {
    name: string
    classe: string
    book: string
}

interface StudentContextType {
    students: Student[]
    FetchStudent: () => Promise<void>
    deleteStudent: (id: string) => Promise<void>
    CreateStudent: (data: CreateStudentValueProps) => Promise<void>
}

export const StudentContext = createContext({} as StudentContextType)

interface StudentProviderProps {
    children: ReactNode;
}

export function StudentDialogProvider({children}: StudentProviderProps) {
    const [students, setStudents] = useState<Student[]>([])

    async function CreateStudent(data: CreateStudentValueProps) {
        const {name, book, classe} = data

        try{
            const response = await API.post('student', {
                name,
                book,
                classe
            })
            setStudents((state) => [response.data, ...state])
        } catch(error) {
            console.error('Error creating card:', error)
        }
    }

    async function deleteStudent(id: string) {
        try {
            // Verifique se a URL está correta. Por exemplo, se o endpoint for /api/students/[id]
            const response = await API.post(`/student/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
            throw error; // ou qualquer tratamento de erro apropriado
        }
    }    

    async function FetchStudent() {
        try {
            const response = await API.get('student')
            setStudents(response.data)
        } catch(error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        FetchStudent()
    }, [])

    return (
        <StudentContext.Provider
            value={{
                students,
                FetchStudent,
                CreateStudent,
                deleteStudent,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}