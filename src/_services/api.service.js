import { authHeader } from '../_helpers/auth-header';
import * as Constants from '../Constants';
//import {eventsService} from './events.service';
import {userService} from '../_services/user.service';

export const apiService = {
    misPedidos,
    postPedido
};

function misPedidos() {
    let user = userService.getData();

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader()
        },
        body: JSON.stringify({ users_id: user.id })
    };

    return fetch(`${Constants.APIurl}/api/pedidos`, requestOptions).then(handleResponse).then(response=>{
        return response.response;
    });
}

function postPedido() {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader() 
        },
    };

    return fetch(`${Constants.APIurl}/api/pedido`, requestOptions).then(handleResponse);
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
                userService.logout();          //intento relogear
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}