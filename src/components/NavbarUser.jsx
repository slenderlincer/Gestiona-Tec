import React from 'react'
import Link from 'next/link';

const NavbarUser = () => {
  return (
    <div className='custom-bg'>
    <div>
        <h1 className='px-3 py-1 text-white font-bold text-center text-2xl'>GestionaTec</h1>
    </div>
    {/* Navegación */}
    <nav className='mt-5 py-5 flex justify-between'>
        <ul className='px-3 flex'>
            <li className='mr-4 text-white'>
                <Link href={'/dashboard'}>Inicio</Link>
            </li>
            <li className='mr-4 text-white'>
                <Link href={'/auth/verEventos'}>Ver Eventos</Link>
            </li>
        </ul>
        <ul className='flex px-3'>
            <li className='ml-4 text-white'>
                <Link href="/api/auth/signout">Cerrar Sesion</Link>
            </li>
        </ul>
    </nav>
</div>
  )
}

export default NavbarUser