import { BrowserRouter as Router,Redirect,Route,Switch, Link} from 'react-router-dom';
import React from 'react';
import Login from './_components/Login';
import ProtectedRoute from './_components/PrivateRoute';
import {Home} from './_components/Home';
import {NewPedido} from './_components/NewPedido';
import './App.css';
import {userService} from './_services/user.service';
import {eventsService} from './_services/events.service';
import * as Constants from './Constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    let u = userService.getData();

    this.state = {
        loading: false,
        user: u
    };
  }

  componentDidMount() {
    eventsService
      .listenEvent('login', this.loginListener.bind(this));
    eventsService
      .listenEvent('logout', this.logoutListener.bind(this));
  }

  loginListener(data){
    //console.log("login",data);
    this.setState({user: data})
  }

  logoutListener(data){
    //console.log("login",data);
    this.setState({user: null})
  }

  render() {
    const { user } = this.state;
    if(user){
      var userDropdown =(
      <div className="dropdown border-white">
        <button className="btn btn-secondary dropdown-toggle back-fix" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {user.name}
        </button>

        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <Link to="/login">
          <button className="dropdown-item" >
            Logout
          </button>
        </Link>
      </div>
    </div>);
    }
    return (<Router>
        <div className="main">
          <nav className="navbar pull-left navbar-expand-md navbar-dark shadow-sm sticky-top">
              <div className="container">
                  <Link to="/home">
                    <div className="navbar-brand game-font mr-4">
                        <img src="/favicon.png" width="40" height="40" alt=""/>
                         Gaming Place <span className="game-font text-sm"> pedidos </span>
                    </div>
                  </Link>
                  <ul className="navbar-nav mr-auto back-fix">
                    <li className="nav-item">
                        <a className="nav-link" href={Constants.GamingPlace}>Página principal</a>
                    </li>
                  </ul>

                  {userDropdown}
              </div>
          </nav>

          {/* Contenedor principal */}

          <Redirect
            from="/"
            to="/home" />
          <Switch>
            <ProtectedRoute
              path="/home"
              component={Home} />
            <Route
              exact
              path="/login"
              component={Login} />
            <Route
              exact
              path="/new/pedido"
              component={NewPedido} />
            <Route
              exact
              path="/edit/pedido"
              component={NewPedido} />
          </Switch>
        </div>
        </Router>
    );
  }
}

export default App;