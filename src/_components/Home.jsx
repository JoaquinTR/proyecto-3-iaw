import React from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
//import {userService} from '../_services/user.service';
import {apiService} from '../_services/api.service';
import '../_css/Home.css';
import Pedido from './Pedido';
const $ = window.$;


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            //user: {},
            pedidos: []
        };


        this.loader = (
            <div id="loader" className="modal bd-example-modal-lg" data-backdrop="static" tabIndex="1">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content" >
                        <div className="spinner-border" style={{ "width": 3 +"rem", height: 3+"rem", }} role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        )

        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
    }

    componentWillUnmount(){
        this.showLoader = null;
        this.hideLoader = null;
    }

    componentDidMount() {
        $('#loader').modal("show");

        //Obtengo la lista de pedidos
        apiService.misPedidos().then(data=>{
            console.log(data);
           
            let pedidosElem = {};
            pedidosElem = data.map((item, key) =>
                <Pedido item={item} id={item.id} key={item.id} hideLoader={this.hideLoader}
                showLoader={this.showLoader} deleteComponent={this.deleteComponent} />
            );

            this.setState({
                pedidos: data,
                pedidosElem: pedidosElem,
                loading: false
            });

            this.hideLoader();
            
        }).catch(error=>{
            console.log(error);
            this.hideLoader();
            toast("Error: "+error,{
                className: 'bg-danger text-light',
                progressClassName: 'bg-light'
              });
        });
    }

    /**
     * Muestra el loader, se lo paso a los pedidos!
     */
    showLoader(){
        this.setState({loading: true})
        $('#loader').modal("show");
    }

    /**
     * Esconde el loader, se lo paso a los pedidos!
     */
    hideLoader(){
        this.setState({loading: false})
        $('#loader').modal("hide");
    }

    /**
     * Vuelve a buscar los pedidos, creando la ilusión de que se
     * eliminó manualmente (podría haberlo eliminado manualmente
     * pero me ahorro control de errores en caso de que no se haya
     * eliminado correctamente).
     */
    deleteComponent(item = null){
        if(item){
            console.log(item);
        }
        apiService.misPedidos().then(data=>{
            //console.log(data);

            let pedidosElem = {};
            pedidosElem = data.map((item, key) =>
                <Pedido item={item} id={item.id} key={item.id} hideLoader={this.hideLoader}
                showLoader={this.showLoader} deleteComponent={this.deleteComponent} />
            );

            this.setState({
                pedidos: data,
                pedidosElem: pedidosElem,
                loading: false
            });

            this.hideLoader();

            toast("Pedido eliminado correctamente",{
                className: 'bg-success text-light',
                progressClassName: 'bg-light'
              });

        }).catch(error=>{
            console.log(error);
            this.hideLoader();
            toast("Error: "+error,{
                className: 'bg-danger text-light',
                progressClassName: 'bg-light'
              });
        });
    }

    render() {
        const { pedidosElem } = this.state;
        /* this.pedidos = null;
        if(this.state.pedidos){
            this.pedidos = this.state.pedidos.map((item, key) =>
                <Pedido item={item} id={item.id} key={item.id} hideLoader={this.hideLoader}
                showLoader={this.showLoader} deleteComponent={this.deleteComponent} />
            );
            console.log(this.pedidos);
        } */

        return (
            <div>
                {this.loader}
            
            
                <div className="container my-3">
                    <div className="d-flex justify-content-between w-100 heading my-3">
                        <h1 className="pl-3">Mis pedidos</h1>
                        <div className="d-flex pull-right align-items-center">
                            <div className="btn-group" role="group" aria-label="nuevo pedido">
                                <Link to="/new/pedido">
                                    <button type="button" className="btn btn-success">Nuevo Pedido</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {pedidosElem}
                </div>
            </div>
        );
    }
}

export { Home };