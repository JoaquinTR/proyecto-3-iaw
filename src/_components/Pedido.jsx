import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
//import {userService} from '../_services/user.service';
import {apiService} from '../_services/api.service';
const $ = window.$;

class Pedido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      item: this.props.item
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount(){
  }

  /**
   * Captura el click en el boton eliminar del modal.
   */
  handleDelete(){
    
    // conviven todos los modal en el mismo lugar, un dia entero me fumé en darme cuenta
    // que estaba abriendo siempre el mismo modal "#confirmar" podes creer!?!?!?!?!?!?
    $("#confirmar_"+this.state.item.id).modal('hide');

    this.props.showLoader();
    
    apiService.deletePedido(this.state.item.id).then((response)=>{
      
      //le indico al padre que vuelva a buscar los pedidos, ya que hay uno que se eliminó.
      this.props.deleteComponent();
    }).catch((error)=>{
      console.error(error);
      this.props.hideLoader();
      toast("Error: "+error,{
        className: 'bg-danger text-light',
        progressClassName: 'bg-light'
      });
    });
  }

  /**
   * Muestra el modal que corresponde a este componente ( >:| ).
   */
  showModal(){
    $("#confirmar_"+this.state.item.id).modal('show');
  }

  componentWillUnmount(){
    this.handleDelete = null;
    this.showModal = null;
  }


    render() {
        const { loading } = this.state;
        const edit = <FontAwesomeIcon icon={faEdit} />
        const trash = <FontAwesomeIcon icon={faTrashAlt} />
        
        this.desarrolladores = this.state.item.desarrollador.replace(/[[\]"]+/g, '').replace(/[,]+/g, ', ');
        this.editores = this.state.item.editor.replace(/[[\]"]+/g, '').replace(/[,]+/g, ', ');
        this.generos = this.state.item.genero.replace(/[[\]"]+/g, '').replace(/[,]+/g, ', ');
        this.plataformas = this.state.item.plataforma.replace(/[[\]"]+/g, '').replace(/[,]+/g, ', ');

        this.date = "Creado: "+this.state.item.created_at.split('T')[0].split('-').reverse().join('/');

        //loader
        let modal = (
          <div id="loader" className="modal fade bd-example-modal-lg" data-backdrop="false" data-keyboard="false" tabIndex="-1">
              <div className="modal-dialog modal-sm">
                  <div className="modal-content" >
                      <div className="spinner-border" style={{ "width": 3 +"rem", height: 3+"rem", }} role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                  </div>
              </div>
          </div>
        )
        
        return (
            <div className="card text-left mb-5">
              {/* loader */}
              {loading && modal}

              {/* modal confirmación */}
              <div className="modal" tabIndex="-1" role="dialog" id={"confirmar_"+this.state.item.id}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header bg-danger text-light">
                      <h5 className="modal-title">¿Desea eliminar el pedido?<br/> Esto no se puede deshacer.</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      <button type="button" className="btn btn-danger text-light" onClick={this.handleDelete}>Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* card */}
              <div className="card-header bg-primary text-light">
                {this.state.item.nombre}

                <div className="btn-group pull-right" role="group" aria-label="opciones">
                <Link to={{
                    pathname: `/edit/pedido`,
                    state: this.state.item
                  }}>
                    <button className="btn btn-info btn-sm" title="editar">
                      {edit}
                    </button>
                </Link>
                    <button className="btn btn-danger btn-sm" title="borrar" onClick={this.showModal}>
                      {trash}
                    </button>
                </div>
              </div>
              <div className="card-body bg-dark text-light">
                <h5 className="card-title">{"Generos: " + this.generos}</h5>
                <h5 className="card-title">{"Plataformas: " + this.plataformas}</h5>
                <h5 className="card-title">{"Desarrolladores: " + this.desarrolladores}</h5>
                <h5 className="card-title">{"Editores: " + this.editores}</h5>
                <p className="card-text">{this.state.item.descripcion}</p>
                <h5 className="card-title">{"Fecha de lanzamiento: " + this.state.item.fecha_lanzamiento.split('-').reverse().join('/')}</h5>
              </div>
              <div className="card-footer bg-dark text-light text-muted">
                {this.date}
              </div>
            </div>
        );
    }
}

export default Pedido;