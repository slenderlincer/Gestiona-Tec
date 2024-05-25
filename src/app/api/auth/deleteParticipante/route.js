

import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
        const { participantId, eventId } = await request.json();

        // Verificar si el participante está registrado en el evento
        const existingParticipant = await prisma.participant.findFirst({
            where: {
                id: Number(participantId),
                eventId: Number(eventId)
            }
        });

        // Si el participante no está registrado en el evento, devuelve un error
        if (!existingParticipant) {
            return NextResponse.json({ message: "El participante no está registrado en este evento." }, { status: 404 });
        }

        // Eliminar la entrada en EventParticipant correspondiente al participante y evento
        await prisma.eventParticipant.deleteMany({
            where: {
                eventId: Number(eventId),
                participantId: Number(participantId)
            }
        });

        // Eliminar al participante del evento
        await prisma.participant.delete({
            where: {
                id: Number(participantId)
            }
        });

        return NextResponse.json({ message: "El participante ha sido eliminado del evento." });
    } catch (error) {
        console.error('Error al eliminar el participante del evento:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al eliminar el participante del evento." }, { status: 500 });
    }
}



// import prisma from '@/libs/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//     try {
//         const requestData = await request.json();
//         console.log(requestData)
//         console.log('entrabdo')

//         // Buscar el participante por su nombre de usuario y el ID del evento
//         const participant = await prisma.participant.findFirst({
//             where: {
//                 username: requestData.username,
//                 eventId: Number(requestData.eventId)
//             }
//         });

//         console.log(participant)

//         // Verificar si el participante existe
//         if (!participant) {
//             return NextResponse.json({ message: "El participante no existe en este evento." }, { status: 404 });
//         }

//         console.log('dheb')

//         // Eliminar el participante
//         await prisma.participant.delete({
//             where: {
//                 id: participant.id
//             }
//         });

//         console.log('jfijif')

//         // Eliminar la entrada en la tabla EventParticipant
//         await prisma.eventParticipant.deleteMany({
//             where: {
//                 participantId: user.id,
//                 eventId: Number(requestData.eventId)
//             }
//         });

//         return NextResponse.json({ message: "Participante eliminado correctamente." });
//     } catch (error) {
//         console.error('Error al eliminar participante:', error);
//         return NextResponse.json({ message: "Ha ocurrido un error al eliminar el participante." }, { status: 500 });
//     }
// }
