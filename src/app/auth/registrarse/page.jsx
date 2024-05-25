// Página: pages/registerParticipant.js
'use client'
import { useState } from 'react';   
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import NavbarUser from '@/components/NavbarUser' 

export default function RegisterParticipant() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();

   // Recuperar el evento del localStorage
   const storedEvent = JSON.parse(localStorage.getItem('event'));

   // Extraer el ID del evento y el tipo de evento del objeto almacenado
   const eventId = storedEvent.id_evento;
   console.log(eventId);
   
  const onSubmit = handleSubmit(async (participantData) => {
    console.log(participantData);
    const res = await fetch('/api/auth/registrarParticipante', {
      method: 'POST',
      body: JSON.stringify({
        eventId: participantData.idEvento,
        name: participantData.name,
        email: participantData.email,
        age: participantData.age,
        phone: participantData.phone,
        redirect: false,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message);
    } else {
      router.push('/dashboard');
    }
  });

  return (
    <div className="min-h-100">
      <NavbarUser />
      <div className='flex flex-col mt-10 items-center'>
        <h2 className="p-3 text-3xl text-center font-bold">Registrandote a {storedEvent.name}</h2>
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:mx-8 lg:px-8 w-10/12 md:w-4/12 lg:2-6/12">
          <div className='py-10 relative shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
            <form className="bg-white p-3" onSubmit={onSubmit}>
              {error && (
                <p className='bg-red-500 text-xs text-white p-3 rounded'>{error}</p>
              )}
              <div className="mb-4">
                <label htmlFor="eventName" className="block text-black text-sm font-bold mb-2">Nombre del Evento</label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={storedEvent.name} // Mostrar el nombre del evento como valor del input
                readOnly // Hacer el input de solo lectura para que no se pueda editar manualmente
                />
                {/* Campo oculto para enviar el ID del evento al backend */}
                <input
                type="hidden"
                {...register('idEvento', { value: eventId })} // Asignar el ID del evento al campo oculto
                />
                {errors.idEvento && (
                <span className="text-red-500">{errors.idEvento.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Nombre</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register('name', { required: 'Nombre requerido' })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  {...register('email', { required: 'Email requerido' })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-black text-sm font-bold mb-2">Edad</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="age"
                  {...register('age', { required: 'Edad requerida' })}
                />
                {errors.age && (
                  <span className="text-red-500">{errors.age.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-black text-sm font-bold mb-2">Teléfono</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="phone"
                  {...register('phone', { required: 'Teléfono requerido' })}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
              <button className="sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold" type="submit">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
