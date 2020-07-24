# Proyecto 3 - ReactJS -- Gaming Place
## Sección de pedidos

Para este proyecto decidí modelar una página adicional de Gaming Place dedicada a realizar pedidos de juegos por parte de los usuarios hacia los administradores de la página, en formato SPA (Single Page Application) utilizando la tecnología ReactJS. Utilicé una aproximación simple, la página tiene su propio login implementado (ultra inseguro pero simple para esta entrega, ver aclaraciones), una vez ingresado el usuario se muestra la página principal (/home) donde se cargarán todos los pedidos que haya realizado el usuario. El objetivo de esta página es el de proveer de funcionalidad de alta, baja y modificación de pedidos, utilizando la api de Gaming Place en su totalidad.

## Cambios en Gaming Place (proyecto 2, Laravel)

Para esta entrega además se modificó la entrega anterior, particularmente la API, para proveer la funcionalidad necesaria para esta entrega. Se adicionaron tres endpoints:

Headers requeridos:
* Accept: application/json.
* Content-Type: application/json.
* Authorization: "Bearer "+ api_token del usuario (sacada del método login, la SPA administra este campo).

Endpoints (nombre método - ruta):

* misPedidos (/api/pedidos): Retorna todos los pedidos del usuario.
    * users_id: Identificador interno del usuario.

* createPedido (/api/pedido/create): Crea un nuevo pedido para un juego, los siguientes campos son requeridos:
    * users_id: Identificador interno del usuario.
    * fecha_lanzamiento: Fecha de lanzamiento del juego.
    * desarrollador: Desarrolladores del juego.
    * descripcion: Descripcion para el juego (mínimo 20 caracteres).
    * editor: Editores del juego.
    * genero: Generos del juego.
    * nombre: Nombre único del juego.
    * plataforma: Plataformas donde el juego está disponible.
    
* updatePedido (/api/pedido/create): Modifica un pedido para un juego, los siguientes campos son requeridos:
    * users_id: Identificador interno del usuario.
    * fecha_lanzamiento: Fecha de lanzamiento del juego.
    * desarrollador: Desarrolladores del juego.
    * descripcion: Descripcion para el juego (mínimo 20 caracteres).
    * editor: Editores del juego.
    * genero: Generos del juego.
    * nombre: Nombre único del juego.
    * plataforma: Plataformas donde el juego está disponible.

* deletePedido (/api/pedido/delete): Elimina un pedido para un juego, los siguientes campos son requeridos:
    * users_id: Identificador interno del usuario.
    * pedido_id: Identificador del pedido a eliminar.

Además se agregó una sección para levantar pedidos dentro del panel de administración para crear el juego en base a los pedidos. Debido a que los usuarios pueden no tener la información especifica o precisa de un juego decidí que la pantalla para levantar un pedido muestra la información al administrador y precarga algunos campos. La tarea del administrador es la de cargar los decoradores (genero/plataforma/editor/desarrollador) que no estén presentes (posiblemente corregidos) dentro de la base de datos de la página y recién ahí terminar de levantar el pedido. Esto va a tener como consecuencia la creación de un nuevo juego en el sistema. Como tarea adicional el administrador debe cargar al menos las dos imágenes del juego (fondo y principal) aunque esto no es necesario para que ya sea accesible el nuevo juego para los usuarios.

### Aclaraciones

Por simpleza guardo al usuario dentro del local storage junto con su api_token, de más está decir que est es una locura, pero por cuestiones de simpleza decidí mantenerlo así, me permite un rápido y fácil acceso a la funcionalidad de login, permitiéndome concentrar en las funcionalidades relacionadas al desarrollo de las funcionalidades deseadas.


### Creditos

* react-toast: https://github.com/fkhadra/react-toastify.
* react-datepicker: https://reactdatepicker.com/.