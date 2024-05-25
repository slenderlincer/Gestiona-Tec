import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
        const teamData = await request.json();

        // Buscar el usuario por su nombre de usuario
        const user = await prisma.user.findUnique({
            where: {
                username: teamData.username
            }
        });

        // Verificar si el usuario existe
        if (!user) {
            return NextResponse.json({ message: "El usuario no existe." }, { status: 404 });
        }

        // Buscar el evento por su ID
        const event = await prisma.event.findUnique({
            where: {
                id_evento: Number(teamData.eventId)
            }
        });

        // Verificar si el evento existe
        if (!event) {
            return NextResponse.json({ message: "El evento no existe." }, { status: 404 });
        }

        // Verificar si el participante ya está registrado
        const existingTeam = await prisma.team.findFirst({
            where: {
                userId: user.id,
                eventId: Number(teamData.eventId)
            }
        });

        // Si el participante ya está registrado, devuelve un error
        if (existingTeam) {
            return NextResponse.json({ message: "El organizador ya está registrado en este evento." }, { status: 400 });
        }

        // Crear el nuevo equipo
        const newTeam = await prisma.team.create({
            data: {
                nameTeam: teamData.nombreEquipo,
                username: teamData.username,
                email: teamData.email,
                age: Number(teamData.age),
                phone: Number(teamData.phone),
                eventId: Number(teamData.eventId),
                members: teamData.teamMembers,
                userId: user.id,
                nombreCompleto: user.nombreCompleto,
                carrera: user.carrera,
                grupo: user. grupo,
                numeroControl: user.numeroControl,
                nameEvent: event.name
            }
        });

        return NextResponse.json({ team: newTeam }); // Devuelve el equipo creado
    } catch (error) {
        console.error('Error al registrar equipo:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al registrar el equipo." }, { status: 500 });
    }
}
