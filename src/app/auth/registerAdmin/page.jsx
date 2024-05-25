'use client'

import React from 'react'
import '../../globals.css'
import Link from 'next/link'
import {useForm} from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import NavbarHome from '@/components/NavbarHome' 

 
const RegisterAdmin = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isSliderActivated, setIsSliderActivated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [error, setError] = useState(null);
    const router = useRouter();

    //Function onSubmit
    const onSubmit = handleSubmit( async (data) => {
      if(data.password !== data.confirmPassword){
        return alert("Password do not match")
      }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.rol,
          nombres: data.nombres,
          apellidos: data.apellidos,
          nombreCompleto: `${data.nombres} ${data.apellidos}`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        const errorData = await res.json(); // Obtiene el cuerpo del mensaje de error
        setError(errorData.message); // Actualiza el estado de error con el mensaje recibido
      } else {
        router.push('/auth/loginAdmin');
      }
    });


    const handleSwitchChange = () => {
      setIsAdmin(!isAdmin); // Cambia el estado entre true y false
    };
  
    const handleSliderClick = () => {
      // Toggle the activation state of the slider
      setIsSliderActivated(!isSliderActivated);
      // Delayed execution
      setTimeout(() => {
        // Redirect to a specific route when the slider is activated
        if (!isSliderActivated) {
          router.push('./register');
        }
      }, 500); // Adjust the delay time as needed
    };
    
    
    return (
    <div className="min-h-100">
      <NavbarHome />
      <div  className='flex flex-col mt-10 items-center'>
      <h2 className = "p-3 text-3xl text-center font-bold">Crear Cuenta de Administrador</h2>
        <div className = "-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:mx-8 lg:px-8 w-10/12 md:w-4/12 lg:2-6/12">
          <div  className='py-10 relative shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
          <div className='container-slider'>
              <span className='switch'>
                <input
                  type="checkbox"
                  id='switcher'
                  checked={isAdmin}
                  onChange={handleSwitchChange}
                  onClick={handleSliderClick}
                />
                <label htmlFor="switcher" ></label>
              </span>
            </div>
            <form className = "bg-white p-3" onSubmit={onSubmit}>
            {error && (
                <p className='bg-red-500 text-xs text-white p-3 rounded'>{error}</p>
              )}
            <div className = "mb-4">
                <label htmlFor = "rol" className = "block text-black text-sm font-bold mb-2">Rol</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                value = "ADMIN"
                readOnly
                {...register("rol", {
                  required:{
                    value: true,
                    message: 'rol requerido'
                  }
                })}
                />
                {
                  errors.rol &&(
                    <span className = "text-red-500">{errors.rol.message}</span>
                  )
                }
              </div>
            <div className = "mb-4">
                <label htmlFor = "username" className = "block text-black text-sm font-bold mb-2">Usuario</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                {...register("username", {
                  required:{
                    value: true,
                    message: 'username requerido'
                  }
                })}
                />
                {
                  errors.username &&(
                    <span className = "text-red-500">{errors.username.message}</span>
                  )
                }
              </div>
              <div className="mb-4">
                <label htmlFor="nombres" className="block text-black text-sm font-bold mb-2">Nombres</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("nombres", {
                    required: {
                      value: true,
                      message: 'nombres requeridos'
                    }
                  })}
                />
                {
                  errors.nombres && (
                    <span className="text-red-500">{errors.nombres.message}</span>
                  )
                }
              </div>
              <div className="mb-4">
                <label htmlFor="apellidos" className="block text-black text-sm font-bold mb-2">Apellidos</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("apellidos", {
                    required: {
                      value: true,
                      message: 'apellidos requeridos'
                    }
                  })}
                />
                {
                  errors.apellidos && (
                    <span className="text-red-500">{errors.apellidos.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "email" className = "block text-black text-sm font-bold mb-2">Email</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="email" 
                {...register("email", {
                  required:{
                    value: true,
                    message: 'email requerido'
                  }
                })}
                />
                {
                  errors.email &&(
                    <span className = "text-red-500">{errors.email.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "password" className = "block text-black text-sm font-bold mb-2">Contraseña</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="password"
                {...register("password", {
                  required:{
                    value: true,
                    message: 'contrseña requerida'
                  }
                })}           
                />
                {
                  errors.password &&(
                    <span className = "text-red-500">{errors.password.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "confirmPassword" className = "block text-black text-sm font-bold mb-2">confirmar contraseña</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="Password"
                {...register("confirmPassword", {
                  required:{
                    value: true,
                    message: 'confirma tu contraseña'
                  }
                })}
                />
                {
                  errors.confirmPassword &&(
                    <span className = "text-red-500">{errors.confirmPassword.message}</span>
                  )
                }
                </div>
              
              <button className='sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold' type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      </div>
  )
}

export default RegisterAdmin
