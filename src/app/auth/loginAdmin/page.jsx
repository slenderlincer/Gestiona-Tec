'use client'
import '../../globals.css';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import NavbarHome from '@/components/NavbarHome' 

const LoginAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [isSliderActivated, setIsSliderActivated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 

  const router = useRouter();

  // Aquí irá la función para el inicio de sesión
  const onSubmit = handleSubmit(async data =>{
    console.log(data)
    let rol = data.rol;
    localStorage.setItem('typeRol', rol);
    console.log(rol)
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      role: data.rol,
      redirect: false
    });

    if(res.error){
      setError(res.error);
    }else{
      router.push('/dashboardAdmin')
      router.refresh()
    }
  })

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
        router.push('./login');
      }
    }, 500); // Adjust the delay time as needed
  };

  return (
    <div className="min-h-100">
       <NavbarHome />
      <div className='flex flex-col mt-10 items-center'>
        <h2 className="p-3 text-3xl text-center font-bold">Iniciar Sesion como Administrador</h2>
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:mx-8 lg:px-8 w-10/12 md:w-4/12 lg:2-6/12">
          <div className='py-10 relative shadow overflow-hidden sm:rounded-lg border-b border-gray-200 '>
            {/* Slider */}
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
            <form className="bg-white p-3" onSubmit={onSubmit}>
              {error && (
                <p className='bg-red-500 text-xs text-white p-3 rounded'>{error}</p>
              )}
              <div className="mb-4">
                <label htmlFor="rol" className="block text-black text-sm font-bold mb-2">Rol</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value = "ADMIN"
                  readOnly
                  {...register("rol", {
                    required: {
                      value: true,
                      message: 'rol requerido'
                    }
                  })}
                />
                {errors.rol && (
                  <span className="text-red-500">{errors.rol.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-black text-sm font-bold mb-2">Usuario</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("username", {
                    required: {
                      value: true,
                      message: 'username requerido'
                    }
                  })}
                />
                {errors.username && (
                  <span className="text-red-500">{errors.username.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Contraseña</label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: 'contraseña requerida'
                    }
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
              
              <button className='sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold' type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;

