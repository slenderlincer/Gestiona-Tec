

import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
        const { teamId, eventId } = await request.json();

        // Verificar si el equipo está registrado en el evento
        const existingTeam = await prisma.team.findFirst({
            where: {
                id: Number(teamId),
                eventId: Number(eventId)
            }
        });

        // Si el equipo no está registrado en el evento, devuelve un error
        if (!existingTeam) {
            return NextResponse.json({ message: "El equipo no está registrado en este evento." }, { status: 404 });
        }

        // Eliminar el equipo del evento
        await prisma.team.delete({
            where: {
                id: Number(teamId)
            }
        });

        return NextResponse.json({ message: "El equipo ha sido eliminado del evento." });
    } catch (error) {
        console.error('Error al eliminar el equipo del evento:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al eliminar el equipo del evento." }, { status: 500 });
    }
}

