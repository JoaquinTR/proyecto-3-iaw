import { authHeader } from '../_helpers/auth-header';
import * as Constants from '../Constants';
//import {eventsService} from './events.service';
import {userService} from '../_services/user.service';

export const apiService = {
    misPedidos,
    postPedido,
    deletePedido,
    updatePedido,
    getDecoradores
};

/**
 * Obtiene todos los pedidos para un determinado usuario
 */
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

/**
 * Crea un nuevo pedido.
 */
function postPedido(datos) {
    let user = userService.getData();
    let body = datos;
    body.users_id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader() 
        },
        body: JSON.stringify(body)
    };

    return fetch(`${Constants.APIurl}/api/pedido/create`, requestOptions).then(handleResponse);
}

/**
 * Elimina un pedido.
 * @param {Number} pedido_id Identificador del pedido.
 */
function deletePedido(pedido_id) {
    let user = userService.getData();

    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader() 
        },
        body: JSON.stringify({ users_id: user.id, 'pedido_id': pedido_id })
    };

    return fetch(`${Constants.APIurl}/api/pedido/delete`, requestOptions).then(handleResponse);
}

/**
 * Actualiza un pedido.
 * @param {Number} pedido_id Identificador del pedido.
 */
function updatePedido(datos) {
    let user = userService.getData();
    let body = datos;
    body.users_id = user.id;
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader() 
        },
        body: JSON.stringify(body)
    };

    return fetch(`${Constants.APIurl}/api/pedido/update`, requestOptions).then(handleResponse);
}

/**
 * Busca los decoradores para editar/crear un pedido.
 */
function getDecoradores() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader() 
        }
    };

    return Promise.all([getGeneros(requestOptions), getPlataformas(requestOptions), getEditores(requestOptions), getDesarrolladores(requestOptions)])
}

/**
 * Busca los generos para editar/crear un pedido.
 */
function getGeneros(requestOptions) {
    return fetch(`${Constants.APIurl}/api/generos/all`, requestOptions).then(handleResponse);
}

/**
 * Busca las plataformas para editar/crear un pedido.
 */
function getPlataformas(requestOptions) {
    return fetch(`${Constants.APIurl}/api/plataformas/all`, requestOptions).then(handleResponse);
}

/**
 * Busca los editores para editar/crear un pedido.
 */
function getEditores(requestOptions) {
    return fetch(`${Constants.APIurl}/api/editores/all`, requestOptions).then(handleResponse);
}

/**
 * Busca los editores para editar/crear un pedido.
 */
function getDesarrolladores(requestOptions) {
    return fetch(`${Constants.APIurl}/api/desarrolladores/all`, requestOptions).then(handleResponse);
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