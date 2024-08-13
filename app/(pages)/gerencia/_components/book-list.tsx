'use client'

import { BookContext } from "@/context/book-dialog"
import { StudentContext } from "@/context/student-context"
import Image from "next/image"
import { useContext } from "react"

export function BooksList() {
    const {book} = useContext(BookContext)

    return(
        <div className="w-full flex flex-wrap gap-4">
            {book.map((book, index) => (
                <div key={index} className="border-2 border-neutral-600 w-[10%] p-3 rounded-lg">
                    <Image
                        src={book.image}
                        alt={book.name}
                        layout="responsive"
                        width={500}
                        height={750}
                        className="w-full"
                    />
                    <p className="w-full font-light text-center">{book.name}</p>
                </div>
            ))}
        </div>
    )
}