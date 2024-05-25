import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
        const eventData = await request.json();
        console.log(eventData)

        // Validar los datos
        if (!eventData.name || !eventData.date || !eventData.location || !eventData.type || !eventData.descripcion) {
            return NextResponse.json({ message: "Falta información para actualizar el evento." }, { status: 400 });
        }

        // Verificar si el evento existe
        const existingEvent = await prisma.event.findUnique({
            where: {
                id_evento: eventData.eventId
            }
        });

        if (!existingEvent) {
            return NextResponse.json({ message: "El evento no existe." }, { status: 404 });
        }

        const findEvent = await prisma.event.findFirst({
            where:{
                id_evento: eventData.eventId
            }
        })
        
        if(findEvent){
            await prisma.event.update({
                where: {
                    id_evento: eventData.eventId // Aquí se especifica el identificador único del evento a actualizar
                },
                data: {
                    name: eventData.name,
                    date: new Date(eventData.date),
                    location: eventData.location,
                    type: eventData.type,
                    descripcion: eventData.descripcion, // Agregar descripción del evento
                    image: eventData.urlImagen
                }
            })
        }
        


        return NextResponse.json(findEvent); // Devuelve el evento actualizado
    } catch (error) {
        // Capturar errores específicos y manejarlos adecuadamente
        console.error('Error al actualizar el evento:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al actualizar el evento." }, { status: 500 });
    }
}
