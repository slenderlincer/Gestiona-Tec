'use client'
import '../../globals.css'
import Link from 'next/link'
import {useForm} from "react-hook-form"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import NavbarAdmin from '@/components/NavbarAdmin' 

const EditarEvento = () => {
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const router = useRouter();
    const storedEvent = JSON.parse(localStorage.getItem('evento'));
    console.log(storedEvent)

  
    useEffect(() => {
      if (storedEvent) {
        Object.keys(storedEvent).forEach(key => {
          if (key === 'date') {
            // Extraer la parte de fecha de la fecha DateTime
            const fecha = storedEvent[key].split('T')[0];
            setValue('date', fecha); // Establecer solo la parte de fecha en el campo de fecha
          } else {
            setValue(key, storedEvent[key]);
          }
        });
      }
    }, []);

    const onSubmit = handleSubmit(async (data) => {
      const confirmSave = window.confirm("¿Estás seguro de que quieres guardar los cambios del evento?");
      if (confirmSave) {
        try {
          const res = await fetch('/api/auth/actualizarEvent', {
            method: 'POST',
            body: JSON.stringify({
              eventId: data.id_evento,
              name: data.name,
              date: data.date,
              location: data.location,
              type: data.type,
              descripcion: data.descripcion,
              urlImagen: data.image
            }),
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (!res.ok) {
            const errorData = await res.json();
            setError(errorData.message);
          } else {
            router.push('/auth/verEventosAdmin');
          }
        } catch (error) {
          console.error('Error al actualizar evento:', error);
          setError("Ha ocurrido un error al guardar los cambios del evento.");
        }
      }
    });
  
    return (
      <div className="min-h-100">
        <NavbarAdmin />
        <div className="py-5 min-h-screen flex justify-center items-center">
          <div className="max-w-md w-full space-y-8">
            <h1 className="text-3xl font-bold text-center">Editar Evento {storedEvent.name}</h1>
            <form onSubmit={onSubmit} className="space-y-6">
              {error && (
                <p className='bg-red-500 text-xs text-white p-3 rounded'>{error}</p>
              )}
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-black text-sm font-bold mb-2">Actualizar nombre</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: 'nombre requerido'
                    }
                  })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="fecha" className="block text-black text-sm font-bold mb-2">Actualizar Fecha</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  {...register("date", {
                    required: {
                      value: true,
                      message: 'fecha requerido'
                    }
                  })}
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date.message}</span>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="ubicacion" className="block text-black text-sm font-bold mb-2">Actualizar Ubicacion</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("location", {
                    required: {
                      value: true,
                      message: 'ubicacion requerido'
                    }
                  })}
                />
                {errors.location && (
                  <span className="text-red-500">{errors.location.message}</span>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="tipo" className="block text-black text-sm font-bold mb-2">Actualizar Tipo de evento</label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("type", {
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
                {errors.type && (
                  <span className="text-red-500">{errors.type.message}</span>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="descripcion" className="block text-black text-sm font-bold mb-2">Actualizar Descripción</label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  {...register("descripcion")}
                ></textarea>
                {errors.descripcion && (
                  <span className="text-red-500">{errors.descripcion.message}</span>
                )}
              </div>
              <div className='mb-4'>
                <label htmlFor="imagen" className="block text-black text-sm font-bold mb-2">actualiza la url de tu imagen</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                {...register("image", {
                  required:{
                    value: true,
                    message: 'url imagen requerida'
                  }
                })}
                />
                 {errors.image && (
                  <span className="text-red-500">{errors.image.message}</span>
                )}
              </div>
              <button className='sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold' type="submit">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditarEvento;