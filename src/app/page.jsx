'use client'


import React from 'react';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image';
import NavbarHome from '@/components/NavbarHome' 

const Page = () => {

  return (
    <div>
       <NavbarHome />
      
      {/* Sección de Eventos Recientes */}
      <div className='px-10'>
        <section className="container mx-auto my-8 alex-brush-regular">
          <h2 className="text-3xl font-semibold mb-4">Eventos Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Evento 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden event-container">
              <div className="p-4">
                <Image src="/img/niño.png" alt="Evento 1" width={600} height={400} className="w-full h-48 object-cover object-center rounded-t-lg" />
                <h3 className="text-lg font-semibold mb-2 montserrat ">Dia del niño</h3>
                <p className="text-gray-600 sedan-regular">El Día del Niño es una festividad dedicada a celebrar la niñez en todo el mundo. En este evento, se organizan diversas actividades destinadas a los niños, como juegos, espectáculos, concursos, y regalos</p>
              </div>
            </div>
            {/* Evento 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden event-container">
              <div className="p-4">  
                <Image src="/img/evento2.jpg" alt="Evento 2" width={600} height={400} className="w-full h-48 object-cover object-center rounded-t-lg" />
                <h3 className="text-lg font-semibold mb-2 montserrat">Dia de muertos</h3>
                <p className="text-gray-600 sedan-regular">El Día de Muertos es una festividad mexicana donde se honra a los difuntos con altares decorativos y ofrendas. </p>
              </div>
            </div> 
            {/* Evento 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden event-container">
              <div className="p-4">
                <Image src="/img/estudiante.jpg" alt="Evento 3" width={600} height={400} className="w-full h-48 object-cover object-center rounded-t-lg" />
                <h3 className="text-lg font-semibold mb-2 montserrat">Dia del estudiante</h3>
                <p className="text-gray-600 sedan-regular">En este día se celebran actividades especiales en honor a los estudiantes, incluyendo concursos y regalos, como forma de reconocer su importancia en la comunidad educativa.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Acerca de la Escuela */}
        <section className="container mx-auto my-8">
          <h2 className="text-3xl font-semibold mb-4 roboto">Acerca de nuestra Escuela</h2>
          <p className="text-gray-700 open-sans text-sm">El Instituto Tecnológico de Ensenada es una institución educativa en México que ofrece programas de ingeniería, ciencias y tecnología desde 1974. Destaca por su excelencia académica, cuerpo docente calificado y ubicación estratégica cerca de la industria y centros de investigación. Ofrece una amplia gama de programas académicos y actividades extracurriculares para el desarrollo integral de los estudiantes.</p>
        </section>
      </div>

      {/* Contenedor fijo para redes sociales */}
      {/* <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center px-2">
        <a href="#" className="mb-4">
        <Image src="/img/fb_logo.png" alt="Facebook" width={30} height={30} className="h-10 w-10" />
           </a>
        <a href="#" className="mb-4">
        <Image src="/img/twitt_logo.png" alt="Twitter" width={30} height={30} className="h-10 w-10" />
             </a>
        <a href="#" className="mb-4">
        <Image src="/img/instagram.png" alt="WhatsApp" width={30} height={30} className="h-10 w-10" />
            </a>
      </div> */}
   

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
}

export default Page;