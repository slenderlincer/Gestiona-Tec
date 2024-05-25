import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
        const participantData = await request.json();

        // Buscar el usuario por su nombre de usuario
        const user = await prisma.user.findUnique({
            where: {
                username: participantData.name
            }
        });

        // Verificar si el usuario existe
        if (!user) {
            return NextResponse.json({ message: "El usuario no existe." }, { status: 404 });
        }

        // Buscar el evento por su ID
        const event = await prisma.event.findUnique({
            where: {
                id_evento: Number(participantData.eventId)
            }
        });

        // Verificar si el evento existe
        if (!event) {
            return NextResponse.json({ message: "El evento no existe." }, { status: 404 });
        }

        // Verificar si el participante ya está registrado
        const existingParticipant = await prisma.participant.findFirst({
            where: {
                userId: user.id,
                eventId: Number(participantData.eventId)
            }
        });

        // Si el participante ya está registrado, devuelve un error
        if (existingParticipant) {
            return NextResponse.json({ message: "El usuario ya está registrado en este evento." }, { status: 400 });
        }

        // Crear el nuevo participante
        const newParticipant = await prisma.participant.create({
            data: {
                username: participantData.name,
                email: participantData.email,
                edad: Number(participantData.age),
                telefono: Number(participantData.phone),
                eventId: Number(participantData.eventId),
                userId: user.id,
                nombreCompleto: user.nombreCompleto,
                carrera: user.carrera,
                grupo: user.grupo,
                numeroControl: user.numeroControl,
            }
        });

        // Crear una entrada en la tabla EventParticipant
        const newEventParticipant = await prisma.eventParticipant.create({
            data: {
                event: { connect: { id_evento: Number(participantData.eventId) } },
                participant: { connect: { id: newParticipant.id } },
                participantName: participantData.name,
                eventName: event.name,
                nombreCompletoParticipante: user.nombreCompleto
            }
        });

        return NextResponse.json({ participant: newParticipant, eventParticipant: newEventParticipant}); // Devuelve el participante y la entrada en EventParticipant creados
    } catch (error) {
        console.error('Error al registrar participante:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al registrar el participante." }, { status: 500 });
    }
}
