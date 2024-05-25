export { default } from "next-auth/middleware"

 export const config = {
    matcher: ['/dashboard', '/auth/verEventos', '/auth/verEventosAdmin', '/dashboardAdmin', '/auth/registerTeam', '/auth/registrarse', '/auth/agregarEventos'],
}

