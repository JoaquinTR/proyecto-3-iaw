import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Pedido extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };


    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(e){
    console.log("edit");
  }

  handleDelete(e){
    console.log("delete");
  }

  componentWillUnmount(){
    this.handleEdit = null;
    this.handleDelete = null;
  }


    render() {
        const edit = <FontAwesomeIcon icon={faEdit} />
        const trash = <FontAwesomeIcon icon={faTrashAlt} />

        this.desarrolladores = "";
        JSON.parse(this.props.item.desarrollador).map((item,key)=> this.desarrolladores = this.desarrolladores + item + ", ");
        this.editores = "";
        JSON.parse(this.props.item.editor).map((item,key)=> this.editores = this.editores + item + ", ");
        this.generos = "";
        JSON.parse(this.props.item.genero).map((item,key)=> this.generos = this.generos + item + ", ");
        this.plataformas = "";
        JSON.parse(this.props.item.plataforma).map((item,key)=> this.plataformas = this.plataformas + item + ", ");

        this.date = new Date(this.props.item.created_at).toLocaleDateString();

        this.desarrolladores = this.desarrolladores.substring(0, this.desarrolladores.length - 2);
        this.editores = this.editores.substring(0, this.editores.length - 2);
        this.generos = this.generos.substring(0, this.generos.length - 2);
        this.plataformas = this.plataformas.substring(0, this.plataformas.length - 2);
        return (
            <div className="card text-left mb-5">
              <div className="card-header bg-primary text-light">
                {this.props.item.nombre}

                <div className="btn-group pull-right" role="group" aria-label="opciones">
                    <button className="btn btn-info btn-sm" title="editar" onClick={this.handleEdit}>
                      {edit}
                    </button>
                    <button className="btn btn-danger btn-sm" title="borrar" onClick={this.handleDelete}>
                      {trash}
                    </button>
                </div>
              </div>
              <div className="card-body bg-dark text-light">
                <h5 className="card-title">{"Generos: " + this.generos}</h5>
                <h5 className="card-title">{"Plataformas: " + this.plataformas}</h5>
                <h5 className="card-title">{"Desarrolladores: " + this.desarrolladores}</h5>
                <h5 className="card-title">{"Editores: " + this.editores}</h5>
                <p className="card-text">{this.props.item.descripcion}</p>
                <h5 className="card-title">{"Fecha de lanzamiento: " + new Date(this.props.item.fecha_lanzamiento).toLocaleDateString()}</h5>
              </div>
              <div className="card-footer bg-dark text-light text-muted">
                {this.date}
              </div>
            </div>
        );
    }
}

export default Pedido;