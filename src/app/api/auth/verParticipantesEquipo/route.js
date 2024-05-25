

import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

// Handler para la solicitud GET de la ruta de visualización de participantes por evento
export async function POST(request) {
    try {
        console.log('entrando')
        const eventId = await request.json();
        console.log(eventId)
        const eventData = eventId.eventId;
        console.log(eventData)
        

        console.log('dnend')
        // Buscar todos los participantes para un evento específico en la base de datos
        const participants = await prisma.team.findMany({
            where: {
                eventId: Number(eventData)
            }
        });

        console.log(participants)

        console.log('dedne')

        // Si no hay participantes, devuelve un mensaje indicando que no hay nadie
        if (participants.length === 0) {
            return NextResponse.json({ message: "No hay participantes en este evento." });
        }

        // Devolver una respuesta con los participantes encontrados
        return NextResponse.json({ participants });
    } catch (error) {
        console.error('Error al obtener participantes por evento:', error);
        // Devolver una respuesta de error en caso de que ocurra un error
        return NextResponse.json({ message: "Ha ocurrido un error al obtener los participantes del evento." }, { status: 500 });
    }
}
