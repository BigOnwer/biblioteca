import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/database";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { name, classe, book } = data;

    if (!name || !classe || !book) {
        return NextResponse.json("Dados inválidos.", { status: 400 });
    }

    const student = await prisma.student.create({
        data: {
            name,
            classe,
            book,
        },
    });

    return NextResponse.json(student);
}

export async function GET() {
    const students = await prisma.student.findMany();
    return NextResponse.json(students);
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json("ID inválido.", { status: 400 });
        }

        const student = await prisma.student.delete({
            where: {
                id  , // Certifique-se de que o ID está no formato correto
            },
        });

        return NextResponse.json({ message: "Estudante excluído com sucesso.", student });
    } catch (error) {
        console.error(error);
        return NextResponse.json("Erro ao excluir o estudante.", { status: 500 });
    }
}
