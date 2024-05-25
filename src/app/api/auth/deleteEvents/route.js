import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
        // Extraer el ID del evento de los parámetros de la solicitud
const data = await request.json();

// Eliminar registros de EventParticipant asociados al evento
const eventPar = await prisma.eventParticipant.findMany({
    where: {
        eventId: data.eventId
    }
});

if (eventPar.length > 0) {
    await prisma.eventParticipant.deleteMany({
        where: {
            eventId: data.eventId
        }
    });
} else {
    console.log('No hay registros de EventParticipant asociados a este evento');
}

// Eliminar equipos del evento
const teams = await prisma.team.findMany({
    where: {
        eventId: data.eventId
    }
});

if (teams.length > 0) {
    await prisma.team.deleteMany({
        where: {
            eventId: data.eventId
        }
    });
} else {
    console.log('No hay equipos asociados a este evento');
}

// Eliminar participantes del evento
const participants = await prisma.participant.findMany({
    where: {
        eventId: data.eventId
    }
});

if (participants.length > 0) {
    await prisma.participant.deleteMany({
        where: {
            eventId: data.eventId
        }
    });
} else {
    console.log('No hay participantes asociados a este evento');
}

// Eliminar el evento con el ID proporcionado
const deletedEvent = await prisma.event.delete({
    where: {
        id_evento: data.eventId
    }
});

return NextResponse.json(deletedEvent);
    } catch (error) {
        // Capturar errores y manejarlos adecuadamente
        console.error('Error al eliminar el evento:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al eliminar el evento." }, { status: 500 });
    }
}
