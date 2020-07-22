/**
 * Genera un encabezado "Authorization" para agregar a los fetch.
 */
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        return  'Bearer ' + user.api_token ;
    } else {
        return {};
    }
}