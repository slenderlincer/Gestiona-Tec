import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(request) {
    try {
        // Consultar todos los eventos
        const events = await prisma.event.findMany();

        // Devolver los eventos como respuesta
        return NextResponse.json(events);
    } catch (error) {
        // Capturar errores y manejarlos adecuadamente
        console.error('Error al obtener los eventos:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al obtener los eventos." }, { status: 500 });
    }
}
