'use client'
import '../../globals.css'
import Link from 'next/link'
import {useForm} from "react-hook-form"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import NavbarAdmin from '@/components/NavbarAdmin' 

function AgregarEventos() {
  const [error, setError] = useState(null);
  const {register, handleSubmit, formState: {errors}} = useForm();
  const router = useRouter()

  const onSubmit = handleSubmit( async (data) => {
    console.log(data)
    const res = await fetch('/api/auth/registerEvent', {
      method: 'POST',
      body: JSON.stringify({
          name: data.nombre,
          date: data.fecha,
          location: data.ubicacion,
          type: data.tipo,
          descripcion: data.descripcion, // Agregar descripción del evento
          urlImagen: data.imagen
        }),
      headers: {
        'Content-Type': 'aplication/json'
      },
    })
    if (!res.ok) {
      const errorData = await res.json(); // Obtiene el cuerpo del mensaje de error
      setError(errorData.message); // Actualiza el estado de error con el mensaje recibido
    } else {
      router.push('/auth/verEventosAdmin');
    }
  });

  return (
    <div className="min-h-100">
      <NavbarAdmin/>
    <div className="py-5 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">Agregar Evento</h1>
        <form onSubmit={onSubmit} className="space-y-6">
        {error && (
                <p className='bg-red-500 text-xs text-white p-3 rounded'>{error}</p>
              )}
              <div className = "mb-4">
                <label htmlFor = "nombre" className = "block text-black text-sm font-bold mb-2">Nombre del evento</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                {...register("nombre", {
                  required:{
                    value: true,
                    message: 'nombre requerido'
                  }
                })}
                />
                {
                  errors.nombre &&(
                    <span className = "text-red-500">{errors.nombre.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "fecha" className = "block text-black text-sm font-bold mb-2">Fecha</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="date" 
                {...register("fecha", {
                  required:{
                    value: true,
                    message: 'fecha requerido'
                  }
                })}
                />
                {
                  errors.fecha &&(
                    <span className = "text-red-500">{errors.fecha.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "ubicacion" className = "block text-black text-sm font-bold mb-2">Ubicacion</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="ubicacion" 
                {...register("ubicacion", {
                  required:{
                    value: true,
                    message: 'ubicacion requerido'
                  }
                })}
                />
                {
                  errors.ubicacion &&(
                    <span className = "text-red-500">{errors.ubicacion.message}</span>
                  )
                }
              </div>

              <div className="mb-4">
                <label htmlFor="tipo" className="block text-black text-sm font-bold mb-2">Tipo de evento</label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("tipo", {
                    required: {
                      value: true,
                      message: 'Tipo de evento requerido'
                    }
                  })}
                >
                  <option value="">Seleccionar tipo de evento</option>
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="TEAM">En equipo</option>
                </select>
                {errors.tipo && (
                  <span className="text-red-500">{errors.tipo.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="descripcion" className="block text-black text-sm font-bold mb-2">Descripción</label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  {...register("descripcion")}
                ></textarea>
              </div>
              <div className='mb-4'>
                <label htmlFor="imagen" className="block text-black text-sm font-bold mb-2">Url imagen</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                {...register("imagen", {
                  required:{
                    value: true,
                    message: 'url imagen requerida'
                  }
                })}
                />
              </div>
              <button className='sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold' type="submit">Agregar</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AgregarEventos;