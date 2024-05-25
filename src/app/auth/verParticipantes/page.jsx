'use client'
// VerParticipantes.jsx
import React, { useEffect, useState } from 'react';
import NavbarUser from '@/components/NavbarAdmin';
import styles from '../../VerParticipantes.module.css'; 

function VerParticipantes() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const storedEvent = JSON.parse(localStorage.getItem('participante'));
        const eventId = storedEvent.id_evento; 
  
        const response = await fetch('/api/auth/verParticipantes', {
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
        setParticipants(data.participants); 
        setFilteredParticipants(data.participants); 
        
        if (data.participants.length === 0) {
          setError('No hay participantes en este evento.');
        } else {
          setError(null); 
        }
      } catch (error) {
        console.error('Error al obtener los participantes:', error);
        setError('Ha ocurrido un error al obtener los participantes.');
      }
    }
  
    fetchParticipants();
  }, []);

  const handleDeleteParticipant = async (participantId) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar a este participante?");

      if (confirmDelete) {
        const storedEvent = JSON.parse(localStorage.getItem('participante'));
        const eventId = storedEvent.id_evento; 
  
        const response = await fetch('/api/auth/deleteParticipante', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ participantId, eventId })
        });

        if (!response.ok) {
          throw new Error('No se pudo eliminar el participante.');
        }

        const updatedParticipants = participants.filter(participant => participant.id !== participantId);
        setParticipants(updatedParticipants);
        setFilteredParticipants(updatedParticipants);
      }
    } catch (error) {
      console.error('Error al eliminar el participante:', error);
      setError('Ha ocurrido un error al eliminar el participante.');
    }
  };

  const handleFilterChange = (event) => {
    const term = event.target.value.toLowerCase();
    setFilterTerm(term);
    filterParticipants(term);
  };

  const handleSortOrderChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    sortParticipants(order);
  };

  const filterParticipants = (term) => {
    const filtered = participants.filter(participant =>
      participant.nombreCompleto.toLowerCase().includes(term) ||
      participant.username.toLowerCase().includes(term) ||
      participant.carrera.toLowerCase().includes(term) ||
      participant.grupo.toLowerCase().includes(term) ||
      participant.numeroControl.toLowerCase().includes(term) ||
      participant.email.toLowerCase().includes(term)
    );
    setFilteredParticipants(filtered); 
  };

  const sortParticipants = (order) => {
    const sorted = [...filteredParticipants].sort((a, b) => {
      const nameA = a.nombreCompleto.toLowerCase();
      const nameB = b.nombreCompleto.toLowerCase();
      
      if (order === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setFilteredParticipants(sorted);
  };

  return (
    <div>
      <NavbarUser />
      <div className={styles.container}>
        <h1 className={styles.title}>Participantes</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Buscar participante..."
            value={filterTerm}
            onChange={handleFilterChange}
            className={styles.searchInput}
          />
          
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className={styles.selectInput}
          >
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div className={styles.participantsList}>
          {filteredParticipants && filteredParticipants.length > 0 ? (
            filteredParticipants.map((participant) => (
              <div key={participant.id} className={styles.participantCard}>
                <h2>{participant.nombreCompleto}</h2>
                <p><strong>Nombre de usuario:</strong> {participant.username}</p>
                <p><strong>Carrera:</strong> {participant.carrera}</p>
                <p><strong>Grupo:</strong> {participant.grupo}</p>
                <p><strong>Número de control:</strong> {participant.numeroControl}</p>
                <p><strong>Email:</strong> {participant.email}</p>
                <p><strong>Edad:</strong> {participant.edad}</p>
                <p><strong>Teléfono:</strong> {participant.telefono}</p>
                <button onClick={() => handleDeleteParticipant(participant.id)} className={styles.customButton}>Eliminar</button>
              </div>
            ))
          ) : (
            <p>No hay participantes en este evento.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerParticipantes;
