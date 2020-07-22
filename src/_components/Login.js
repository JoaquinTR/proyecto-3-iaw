import React from 'react';
import {userService} from '../_services/user.service';

class Login extends React.Component {

  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
        username: '',
        password: '',
        submitted: false,
        loading: false,
        error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    
    // stop here if form is invalid
    if (!(username && password)) {
        return;
    }

    this.setState({ loading: true });
    userService.login(username, password)
        .then(
            user => { //login ok
              this.setState({ loading: false });
              this.props.history.push("/home");
            },
            error => {
              console.log(error);
              this.setState({ error, loading: false });
            }
        );
  }

  componentWillUnmount(){
    this.handleChange = null;
    this.handleSubmit = null;
  }


  render() {
    const { username, password, submitted, loading, error } = this.state;
    
    return (
          <div className="container my-5">
            {error &&
              <div className='alert alert-danger alert-block '>
                <button type="button" className="close" data-dismiss="alert">×</button>
                <strong>{error}</strong>
              </div>
            }
            <div className="row justify-content-center">
              <div className="col-md-8">

                <div className="card">
                  <div className="card-header">
                    Login
                  </div>

                  <div className="card-body">
                    <form name="form" onSubmit={this.handleSubmit}>
                      <div className={'form-group row' + (submitted && !username ? ' has-error' : '')}>
                          <label htmlFor="username" className="col-md-4 col-form-label text-md-right">Email:</label>

                          <div className="col-md-6">
                            <input type="text" className={'form-control ' + ( error ?'is-invalid' : '') } name="username" value={username} onChange={this.handleChange} />

                            {submitted && !username &&
                              <span className="invalid-feedback" role="alert">
                                <strong> El email es requerido </strong>
                              </span>
                            }
                          </div>
                      </div>

                      <div className={'form-group row' + (submitted && !username ? ' has-error' : '')}>
                          <label className="col-md-4 col-form-label text-md-right">Password:</label>

                          <div className="col-md-6">
                              <input type="password" value={password} onChange={this.handleChange} className={'form-control ' + ( error ?'is-invalid' : '') } name="password" />

                              {submitted && !username &&
                                <span className="invalid-feedback" role="alert">
                                  <strong> El email es requerido </strong>
                                </span>
                              }
                          </div>
                      </div>

                      <div className="form-group row mb-0">
                          <div className="col-md-8 offset-md-4">
                              <button type="submit" className="btn btn-primary mr-3">
                                  Login
                              </button>
                              {loading &&
                                <img alt="imagen-login" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                              }
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default Login;
