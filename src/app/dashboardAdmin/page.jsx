'use client'

// 'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarAdmin from '@/components/NavbarAdmin';
import Image from 'next/image';

const DashboardAdmin = () => {
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    async function fetchRecentEvents() {
      try {
        const response = await fetch('/api/auth/eventosRecientes');
        if (!response.ok) {
          throw new Error('Error al obtener los eventos recientes');
        }
        const data = await response.json();
        setRecentEvents(data);
      } catch (error) {
        console.error('Error al obtener los eventos recientes:', error);
      }
    }

    fetchRecentEvents();
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <div className='px-10'>
        <section className="container mx-auto my-8 alex-brush-regular">
          <h2 className="text-3xl font-semibold mb-4">Eventos Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map(event => (
              <div key={event.id_evento} className="bg-white rounded-lg shadow-md overflow-hidden event-container">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 montserrat">{event.name}</h3>
                  <div >
                <img
                  src={event.image}
                  alt={event.name}
                />
              </div>
                  <p className="text-gray-600 sedan-regular">{event.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Acerca de la Escuela */}
        <section className="container mx-auto my-8">
          <h2 className="text-3xl font-semibold mb-4 roboto">Acerca de nuestra Escuela</h2>
          <p className="text-gray-700 open-sans text-sm">El Instituto Tecnológico de Ensenada es una institución educativa en México que ofrece programas de ingeniería, ciencias y tecnología desde 1974. Destaca por su excelencia académica, cuerpo docente calificado y ubicación estratégica cerca de la industria y centros de investigación. Ofrece una amplia gama de programas académicos y actividades extracurriculares para el desarrollo integral de los estudiantes.</p>
        </section>
      </div>

      {/* Footer (Pie de Página) */}
      <footer className="bg-gray-800 text-white py-8 relative">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GestionaTec. Todos los derechos a Rafael.</p>
          <div className="mt-4 flex justify-center">
            {/* Logos de redes sociales */}
            <a href="https://www.facebook.com/TecNMITEnsenada" target="_blank" className="mx-2 relative social-icon">
              <Image src="/img/fb_logo.png" alt="Facebook" width={30} height={30} className="h-10 w-10" />
              <span className="tooltip">Síguenos en Facebook</span>
            </a>
            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2FTecNMEnsenada" target="_blank" className="mx-2 relative social-icon">
              <Image src="/img/twitt_logo.png" alt="Twitter" width={30} height={30} className="h-10 w-10" />
              <span className="tooltip">Síguenos en Twitter</span>
            </a>
            <a href="https://www.instagram.com/tecnmensenada/" target="_blank" className="mx-2 relative social-icon">
              <Image src="/img/instagram.png" alt="Instagram" width={30} height={30} className="h-10 w-10" />
              <span className="tooltip">Síguenos en Instagram</span>
            </a>
            <a href="https://www.youtube.com/@Avenger-pz8mv" target="_blank" className="mx-2 relative social-icon">
              <Image src="/img/youtube.png" alt="YouTube" width={30} height={30} className="h-10 w-10" />
              <span className="tooltip">Suscribete</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardAdmin;
