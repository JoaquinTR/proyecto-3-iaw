import { authHeader } from '../_helpers/auth-header';
import * as Constants from '../Constants';
import {eventsService} from './events.service';

export const userService = {
    login,
    logout,
    getAll,
    getData,
};

/**
 * Autentica en el sistema al usuario utilizando su email y contraseña.
 * @param {String} email Email de usuario. 
 * @param {String} password Contraseña del usuario.
 */
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': email, 'password':password })
    };

    return fetch(`${Constants.APIurl}/api/login`, requestOptions)
        .then(handleResponse)
        .then(async response => {
            let usuario = null;
            if (response.status_code === 200) {
                // Almaceno las credenciales en el local storage solo si recibi una respuesta 200
                usuario = {
                    'email':email,
                    'api_token': response.access_token
                };

                localStorage.setItem('user', JSON.stringify(usuario));

                await userService.getAll().then(data=>{ //espero que finalice la obtencion de los datos antes de continuar
                    localStorage.setItem('userData',JSON.stringify(data));
                    eventsService.triggerEvent('login', data);
                    return usuario;
                });

            }else{
                return Promise.reject(response.message);
            }
        });
}

/**
 * Deslogea el usuario.
 */
function logout() {
    // remove user from local storage to log user out
    eventsService.triggerEvent('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
}

/**
 * Retorna los datos del usuario logeado.
 */
function getData(){
    return {...JSON.parse(localStorage.getItem('user')), ...JSON.parse(localStorage.getItem('userData'))};
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader() 
        },
    };

    return fetch(`${Constants.APIurl}/api/user`, requestOptions).then(handleResponse);
}

/**
 * Realiza una manipulación inicial de la respuesta HTTP.
 * @param {Object} response Respuesta HTTP recibida.
 */
function handleResponse(response) {
    return response.text().then(text => {
        
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}