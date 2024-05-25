import React from 'react'
import Link from 'next/link';

const NavbarHome = () => {
  return (
    <div className='custom-bg'>
    <div>
        <h1 className='px-3 py-1 text-white font-bold text-center text-2xl'>GestionaTec</h1>
    </div>
    {/* Navegación */}
    <nav className='mt-5 py-5 flex justify-between'>
        <ul className='px-3 flex'>
            <li className='mr-4 text-white'>
                <Link href={'/'}>Inicio</Link>
            </li>
            <li className='mr-4 text-white'>
                <Link href={'/auth/verEventos'}>Ver Eventos</Link>
            </li>
        </ul>
        <ul className='flex px-3'>
            <li className='ml-4 text-white'>
                <Link href={'/auth/login'}>Login</Link>
            </li>
            <li className='ml-4 text-white'>
                <Link href={'/auth/register'}>Register</Link>
            </li>
        </ul>
    </nav>
</div>
  )
}

export default NavbarHome
