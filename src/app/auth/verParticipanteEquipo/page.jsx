'use client'
// VerParticipantesEquipo.jsx
import React, { useEffect, useState } from 'react';
import NavbarUser from '@/components/NavbarAdmin';
import styles from '../../VerParticipantesEquipo.module.css'; 

function VerParticipantesEquipo() {
  const [teamParticipants, setTeamParticipants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeamParticipants() {
      try {
        const storedEvent = JSON.parse(localStorage.getItem('participante'));
        const eventId = storedEvent.id_evento;

        const response = await fetch('/api/auth/verParticipantesEquipo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ eventId })
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de participantes.');
        }

        const data = await response.json();
        setTeamParticipants(data.participants);

        if (data.participants.length === 0) {
          setError('No hay participantes en este evento.');
        } else {
          setError(null);
        }
      } catch (error) {
        console.error('Error al obtener los participantes del equipo:', error);
        setError('Ha ocurrido un error al obtener los participantes del equipo.');
      }
    }

    fetchTeamParticipants();
  }, []);

  const handleDeleteTeam = async (teamId) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar a este participante?");

      if (confirmDelete) {
        const storedEvent = JSON.parse(localStorage.getItem('participante'));
        const eventId = storedEvent.id_evento;

        const response = await fetch('/api/auth/deleteTeam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ teamId, eventId })
        });

        if (!response.ok) {
          throw new Error('No se pudo eliminar el participante.');
        }

        const updatedParticipants = teamParticipants.filter(teamParticipant => teamParticipant.id !== teamId);
        setTeamParticipants(updatedParticipants);
      }
    } catch (error) {
      console.error('Error al eliminar el participante:', error);
      setError('Ha ocurrido un error al eliminar el participante.');
    }
  };

  return (
    <div>
      <NavbarUser />
      <div className={styles.container}>
        <h1 className={styles.title}>Participantes en equipo</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.participantsList}>
          {teamParticipants && teamParticipants.length > 0 ? (
            teamParticipants.map((teamParticipant) => (
              <div key={teamParticipant.id} className={styles.participantCard}>
                <h2>{teamParticipant.nombreEquipo}</h2>
                <p><strong>Nombre del equipo:</strong> {teamParticipant.nameTeam}</p>
                <p><strong>Organizador:</strong> {teamParticipant.username}</p>
                <p><strong>Email del organizador:</strong> {teamParticipant.email}</p>
                <p><strong>Edad:</strong> {teamParticipant.age}</p>
                <p><strong>Telefono:</strong> {teamParticipant.phone}</p>
                <p><strong>Integrantes del equipo:</strong></p>
                <ul>
                  {teamParticipant.members.map((member, index) => (
                    <li key={index}>
                      <p><strong>Nombre Completo:</strong> {member.name}</p>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDeleteTeam(teamParticipant.id)} className={styles.customButton}>Eliminar</button>
              </div>
            ))
          ) : (
            <p>No hay participantes en equipos para este evento.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerParticipantesEquipo;
