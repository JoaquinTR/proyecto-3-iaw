import React from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
//import {userService} from '../_services/user.service';
import {apiService} from '../_services/api.service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../_css/Home.css';
const $ = window.$;

class NewPedido extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.location.state){
            //si recibo un estado lo cargo como actual, 
            // PRO: me permite reutilizar el componente para la edición!
            // CONTRA: Se enquilomba el componente, por mas que sea algo simple.
            this.state = { 
                //valores recibidos
                ...this.props.location.state,
                //arreglo de errores
                formErrors: {
                  nombre: "",
                  descripcion: "",
                  genero: "",
                  plataforma: "",
                  editor: "",
                  desarrollador: "",
                  fecha_lanzamiento: "",
                  ok: true
                },
                edit: true
            };
            //le sumo 12 horas para que no jodan los benditos tiempos horarios
            this.state.fecha_lanzamiento = new Date(this.state.fecha_lanzamiento+" 12:00:00");
        }else{
            this.state = {
                //valores
                nombre: "",
                descripcion: "",
                genero: "",
                plataforma: "",
                editor: "",
                desarrollador: "",
                fecha_lanzamiento: "",
                //arreglo de errores
                formErrors: {
                  nombre: "",
                  descripcion: "",
                  genero: "",
                  plataforma: "",
                  editor: "",
                  desarrollador: "",
                  fecha_lanzamiento: "",
                  ok: true
                },
                edit: false
            };
        }

        this.createPedido = this.createPedido.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Pide a la api que cree un pedido.
     * @param {Object} datosEnvio Datos del pedido.
     */
    createPedido(datosEnvio){
        $('#loader').modal("show");

        let funcion = "postPedido";

        let msg = "Pedido creado correctamente";
        if(this.state.edit){ //cambio la llamada a la de una edición de pedido.
            funcion = "updatePedido"
            datosEnvio.pedido_id = this.state.id; //obtener de alguna manera el id!
            msg = "Pedido modificado correctamente";
        }
        
        apiService[funcion](datosEnvio).then(response=>{
            $('#loader').modal("hide");
            console.log(response)
            toast(msg,{
                className: 'bg-success text-light',
                progressClassName: 'bg-light'
              });
            this.props.history.push("/home");   //vuelvo a home
        }).catch(error=>{
            console.log(error);
            $('#loader').modal("hide");
            toast("Error: "+error,{
                className: 'bg-danger text-light',
                progressClassName: 'bg-light'
              });
        });
    }

    componentDidMount() {
    }

    /**
     * Maneja un cambio en un input del formulario.
     * @param {Object} event evento disparado, contiene todos los datos necesarios.
     */
    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
          [name]: value    
        });
    }

    /**
     * Valida el contenido de cada input e instancia el estado con los errores. En caso de pasar las
     * validaciones envía los datos a la api.
     * @param {Object} event evento disparado.
     */
    handleSubmit(event) {
        event.preventDefault();
        let errors = {
            nombre: "",
            descripcion: "",
            genero: "",
            plataforma: "",
            editor: "",
            desarrollador: "",
            fecha_lanzamiento: "",
            ok: true
        }
        
        if(!this.state.nombre){
            errors.nombre = "Por favor ingrese un nombre para el juego."
            errors.ok = false;
        }
        if(!this.state.descripcion){
            errors.descripcion = "Por favor ingrese una descripción para el juego."
            errors.ok = false;
        }else if(this.state.descripcion.length <=20){
            errors.descripcion = "La descripción debe tener al menos 20 caracteres."
            errors.ok = false;
        }
        if(!this.state.genero){
            errors.genero = "Por favor ingrese algún genero para el juego."
            errors.ok = false;
        }
        if(!this.state.plataforma){
            errors.plataforma = "Por favor ingrese alguna plataforma del juego."
            errors.ok = false;
        }
        if(!this.state.editor){
            errors.editor = "Por favor ingrese algún editor del juego."
            errors.ok = false;
        }
        if(!this.state.desarrollador){
            errors.desarrollador = "Por favor ingrese algún desarrollador del juego."
            errors.ok = false;
        }
        if(!this.state.fecha_lanzamiento){
            errors.fecha_lanzamiento = "Por favor seleccione la fecha de lanzamiento del juego."
            errors.ok = false;
        }
        
        this.setState({
            formErrors: errors
        });

        if(errors.ok){
            let datosEnvio = {...this.state};
            datosEnvio.fecha_lanzamiento = datosEnvio.fecha_lanzamiento.toLocaleDateString();
            delete datosEnvio.formErrors;

            this.createPedido(datosEnvio);
        }
    }

    render() {
        const{formErrors} = this.state;
        return (
            <div>
                <div id="loader" className="modal bd-example-modal-lg" data-backdrop="static" tabIndex="1">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content" >
                            <div className="spinner-border" style={{ "width": 3 +"rem", height: 3+"rem", }} role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    Agregar nuevo juego
                                    <Link to="/home">
                                        <button type="button" className="close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </Link>
                                </div>

                                <div className="card-body">

                                        <div className="form-group">
                                            <label>Nombre:</label>
                                            <input type="text" name="nombre" className={(!! formErrors.nombre && " form-control is-invalid") || " form-control "} placeholder="Nombre del juego"
                                            onChange={this.handleInputChange}
                                            value={this.state.nombre}
                                            />
                                            {!! formErrors.nombre &&
                                                <span className="pl-3 row text-danger">{ formErrors.nombre }</span>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Descripción:</label>
                                            <input type="text" name="descripcion" className={(!! formErrors.descripcion && " form-control is-invalid") || " form-control "} placeholder="Descripcion del juego"
                                            onChange={this.handleInputChange}
                                            value={this.state.descripcion}
                                            />
                                            {!! formErrors.descripcion &&
                                                <span className="pl-3 row text-danger">{ formErrors.descripcion }</span>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="genero" className="control-label">Genero(s):</label>
                                            <input type="text" name="genero" className={(!! formErrors.genero && " form-control is-invalid") || " form-control "} placeholder="Descripcion del juego"
                                            onChange={this.handleInputChange}
                                            value={this.state.genero}
                                            />
                                            {!! formErrors.genero &&
                                                <span className="pl-3 row text-danger">{ formErrors.genero }</span>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="plataforma" className="control-label">Plataforma(s):</label>
                                            <input type="text" name="plataforma" className={(!! formErrors.plataforma && " form-control is-invalid") || " form-control "} placeholder="Descripcion del juego"
                                            onChange={this.handleInputChange}
                                            value={this.state.plataforma}
                                            />
                                            {!! formErrors.plataforma &&
                                                <span className="pl-3 row text-danger">{ formErrors.plataforma }</span>
                                            }

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="fecha_lanzamiento" className="control-label mr-3">Fecha de lanzamiento:</label>
                                            <DatePicker 
                                            dateFormat="dd-MM-yyyy" 
                                            selected={this.state.fecha_lanzamiento} 
                                            onChange={fecha_lanzamiento => this.setState({fecha_lanzamiento: fecha_lanzamiento})} />
                                            {!! formErrors.fecha_lanzamiento &&
                                                <span className="pl-3 row text-danger">{ formErrors.fecha_lanzamiento }</span>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editor" className="control-label">Editor(es):</label>
                                            <input type="text" name="editor" className={(!! formErrors.editor && " form-control is-invalid") || " form-control "} placeholder="Descripcion del juego"
                                            onChange={this.handleInputChange}
                                            value={this.state.editor}
                                            />
                                            {!! formErrors.editor &&
                                                <span className="pl-3 row text-danger">{ formErrors.editor }</span>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="desarrollador" className="control-label">Desarrollador(es):</label>
                                            <input type="text" name="desarrollador" className={(!! formErrors.desarrollador && " form-control is-invalid") || " form-control "} placeholder="Descripcion del juego"
                                            onChange={this.handleInputChange}
                                            value={this.state.desarrollador}
                                            />
                                            {!! formErrors.desarrollador &&
                                                <span className="pl-3 row text-danger">{ formErrors.desarrollador }</span>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-success btn-submit" onClick={this.handleSubmit}>Enviar</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { NewPedido };