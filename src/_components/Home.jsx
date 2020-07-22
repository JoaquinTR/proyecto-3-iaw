import React from 'react';
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
    }

    componentDidMount() {
        $('#loader').modal("show");
        //obtengo el usuario
        //let u = userService.getData();
        
        /* if(u == null){
            u = ""; 
        } */
        
        //Obtengo la lista de pedidos
        apiService.misPedidos().then(data=>{
            //console.log(data);
            this.setState({
                pedidos: data,
                loading: false
            });

            $('.modal-backdrop').remove();      //no se porque el backdrop se esta quedando al frente, raro
        }).catch(error=>{
            console.log(error);
        });

        //obtengo los pedidos del usuario

        /* this.setState({ 
            user: u
        }); */
    }

    render() {
        const { loading } = this.state;
        this.pedidos = this.state.pedidos
        if(this.pedidos){
            this.pedidos = this.state.pedidos.map((item, key) =>
                <Pedido item={item} key={item.id}/>
            );
        }
        
        let modal = (
            <div id="loader" className="modal fade bd-example-modal-lg"  data-keyboard="false" tabIndex="-1">
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
            <div>
                {loading && modal}
            
            
                <div className="container my-3">
                    <div className="d-flex justify-content-between w-100 heading my-3">
                        <h1 className="pl-3">Mis pedidos</h1>
                        <div className="d-flex pull-right align-items-center">
                            <div className="btn-group" role="group" aria-label="nuevo pedido">
                              <button type="button" className="btn btn-success">Nuevo Pedido</button>
                            </div>
                        </div>
                    </div>
                    {this.pedidos}
                </div>
            </div>
        );
    }
}

export { Home };