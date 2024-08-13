'use client'

import { API } from "@/lib/axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Book {
    id: string
    name: string
    description: string
    image: string
    position: string
    createdAt: string
}

interface CreateBookValueProps {
    name: string
    description: string
    image: string
    position: string
}

interface BookContextType {
    book: Book[]
    FetchBook: () => Promise<void>
    CreateBook: (data: CreateBookValueProps) => Promise<void>
}

export const BookContext = createContext({} as BookContextType)

interface BookProviderProps {
    children: ReactNode;
}

export function BookDialogProvider({children}: BookProviderProps) {
    const [book, setBook] = useState<Book[]>([])

    async function CreateBook(data: CreateBookValueProps) {
        const {name, description, image, position} = data

        try{
            const response = await API.post('books', {
                name,
                description,
                image,
                position
            })
            setBook((state) => [response.data, ...state])
        } catch(error) {
            console.error('Error creating card:', error)
        }
    }

    async function FetchBook() {
        try {
            const response = await API.get('books', {
                params: {
                    _sort: 'createdAt',
                    _order: 'desc',
                },
            })
            setBook(response.data)
        } catch(error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        FetchBook()
    }, [])

    return (
        <BookContext.Provider
            value={{
                book,
                FetchBook,
                CreateBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
}