
// Importa la clase NextResponse de next/server
import { NextResponse } from 'next/server';

// Importa el módulo de Prisma
import prisma from '@/libs/prisma';

// Define la función de manejo de la solicitud GET
export async function GET(request) {
    try {
        // Consulta los tres eventos más recientes ordenados por fecha descendente
        const recentEvents = await prisma.event.findMany({
            take: 3, // Obtén solo los tres eventos más recientes
            orderBy: {
                date: 'asc' // Ordena por fecha de manera descendente
            }
        });

        // Devuelve los eventos más recientes como respuesta
        return NextResponse.json(recentEvents);
    } catch (error) {
        // Captura y maneja los errores
        console.error('Error al obtener los eventos más recientes:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al obtener los eventos más recientes." }, { status: 500 });
    }
}






