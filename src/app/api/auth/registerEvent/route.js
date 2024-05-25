import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/libs/prisma';

console.log('entrando');

export async function POST(request) {
    try {
        const eventData = await request.json();

        // Validar los datos
        if (!eventData.name || !eventData.date || !eventData.location || !eventData.type) {
            return NextResponse.json({ message: "Falta información para crear el evento." }, { status: 400 });
        }

        // Verificar si el evento ya existe
        const existingEvent = await prisma.event.findUnique({
            where: {
                name: eventData.name
            }
        });

        if (existingEvent) {
            return NextResponse.json({ message: "El evento ya existe." }, { status: 400 });
        }

        // Crear el nuevo evento y la entrada en la tabla de registros de participantes en una transacción
        const newEventWithParticipantsTable = await prisma.$transaction([
            prisma.event.create({
                data: {
                    name: eventData.name,
                    date: new Date(eventData.date),
                    location: eventData.location,
                    type: eventData.type,
                    descripcion: eventData.descripcion, // Agregar descripción del evento
                    image: eventData.urlImagen
                },
                include: {
                    eventParticipants: true // Incluir la relación con la tabla de registros de participantes
                }
            })
        ]);

        return NextResponse.json(newEventWithParticipantsTable[0]); // Devuelve el evento creado
    } catch (error) {
        // Capturar errores específicos y manejarlos adecuadamente
        console.error('Error al crear el evento:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al crear el evento." }, { status: 500 });
    }
}