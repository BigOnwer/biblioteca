import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/database"

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { name, description, position, image} = data

    if(!name || !description || !position || !image){
        return NextResponse.json("Dados inválidos.", { status: 400})
    }

    const book = await prisma.book.create({
        data: {
            name,
            description,
            position,
            image
        }
    })

    return NextResponse.json(book)
}

export async function GET() {

    const books = await prisma.book.findMany();

    return NextResponse.json(books);
}