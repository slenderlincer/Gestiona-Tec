// EventList.jsx
'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavbarUser from '@/components/NavbarUser';
import styles from '../../EventList.module.css'; 

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('nameAsc'); // Nuevo estado para el filtro combinado
  const router = useRouter();

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
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleFilterChange = event => {
    setFilterOption(event.target.value);
  };

  const registerForEvent = async (event) => {
    localStorage.setItem('event', JSON.stringify(event));
    if (event.type === 'INDIVIDUAL') {
      router.push('/auth/registrarse');
    } else if (event.type === 'TEAM') {
      router.push('/auth/registerTeam');
    }
  };

  return (
    <div>
      <NavbarUser />
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
                <button className={styles.registerButton} onClick={() => registerForEvent(event)}>Registrarse</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventList;

