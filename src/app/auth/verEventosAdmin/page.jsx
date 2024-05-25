// EventList.jsx
'use client'


import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Corregido de next/navigation a next/router
import NavbarAdmin from '@/components/NavbarAdmin';
import styles from '../../EventList.module.css'; // Importa el archivo de estilos CSS

function EventListAdmin() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [filterOption, setFilterOption] = useState('nameAsc'); // Nuevo estado para el filtro combinado
  
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateFilter, setDateFilter] = useState('recent'); // Nuevo estado para el filtro de fecha
 
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/auth/devolverEventos');
        if (!response.ok) {
          throw new Error('Error al obtener los eventos');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (eventTypeFilter === '' || event.type.toLowerCase() === eventTypeFilter.toLowerCase())
  );

  const sortedEvents = filteredEvents.sort((a, b) => {
    if (filterOption === 'nameAsc' || filterOption === 'nameDesc') {
      return filterOption === 'nameAsc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return filterOption === 'recent' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    }
  });

  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleEventTypeChange = event => {
    setEventTypeFilter(event.target.value);
  };

  

  const handleFilterChange = event => {
    setFilterOption(event.target.value);
  };

  const handleSortOrderChange = event => {
    setSortOrder(event.target.value);
  };

  const handleDateFilterChange = event => {
    setDateFilter(event.target.value);
  };

  const handleEditedEvent = async (event) => {
    localStorage.setItem('evento', JSON.stringify(event));
    router.push(`/auth/editarEvent`); // Cambia "/editar-evento" por la ruta real de edición de eventos
  };
  
  // ...

const handleParticipantes = async (event) => {
  localStorage.setItem('participante', JSON.stringify(event));
  const participantesRoute = event.type === 'TEAM' ? '/auth/verParticipanteEquipo' : '/auth/verParticipantes';
  router.push(participantesRoute);
};

// ...





  const handleDeleteEvent = async (data) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este evento?");
    if (confirmDelete) {
      const response = await fetch(`/api/auth/deleteEvents`, {
        method: 'POST',
        body: JSON.stringify({
          eventId: data.id_evento
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        // Eliminar el evento de la lista actual
        const updatedEvents = events.filter(e => e.id_evento !== data.id_evento);
        setEvents(updatedEvents);
      }
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className={styles.eventListContainer}>
        <h1 className={styles.pageTitle}>Lista de Eventos</h1>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Buscar evento por nombre..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className={styles.searchInput}
          />
          
          <select
            value={eventTypeFilter}
            onChange={handleEventTypeChange}
            className={styles.selectInput}
          >
            <option value="">Todos los tipos</option>
            <option value="individual">Individual</option>
            <option value="team">Equipo</option>
          </select>
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className={styles.selectInput}
          >
            <option value="nameAsc">A - Z</option>
            <option value="nameDesc">Z - A</option>
            <option value="oldest">Más recientes</option>
            <option value="recent">Más antiguos</option>
          </select>


        </div>
        <ul className={styles.eventList}>
          {sortedEvents.map(event => (
            <li key={event.id_evento} className={styles.eventItem}>
              <h2 className={styles.eventName}>{event.name}</h2>
              <p className={styles.eventDetail}><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p className={styles.eventDetail}><strong>Ubicación:</strong> {event.location}</p>
              <p className={styles.eventDetail}><strong>Tipo:</strong> {event.type}</p>
              <p className={styles.eventDetail}><strong>Descripción:</strong> {event.descripcion}</p>
              <div className={styles.imageContainer}>
                <img
                  src={event.image}
                  alt={event.name}
                  className={styles.image}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.deleteButton} onClick={() => handleDeleteEvent(event)}>Eliminar</button>
                <button className={styles.editButton} onClick={() => handleEditedEvent(event)}>Editar</button>
                <button className={styles.editButton} onClick={() => handleParticipantes(event)}>Participantes</button>
             
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventListAdmin;


