import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
    render() {
      const { component: Component, ...props } = this.props
      let user = localStorage.getItem('user');
      return (
        <Route 
          {...props} 
          render={props => (
            (user != null ?
              <Component {...props} /> :
              <Redirect to='/login'/>)
          )} 
        />
      )
    }
  }

export default ProtectedRoute;