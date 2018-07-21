import React from 'react';
import { Button, FormGroup, Label, Input, Form, Grid } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

const GitHubIcon = (props) => (
  <SvgIcon {...props}>
    {<path
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>}
    </SvgIcon>
  );

  let LoginForm = connect(({login}) => {return {login};})((props) => {
    function update(ev) {
      let tgt = $(ev.target);
      let data = {};
      data[tgt.attr('name')] = tgt.val();
      props.dispatch({
        type: 'UPDATE_LOGIN_FORM',
        data: data,
      });
    }

    function create_token(ev) {
      api.submit_login(props.login, props.history, props.channel );
    }

    return (
      <div>
        <Card>
          <CardTitle
            title = "Sign In"
            titleColor="White"
            subtitle="With Your Registered Account"
            subtitleColor="White"
            className="card-color"
          />

          <Form>
            <CardText>
              <FormGroup>
                <TextField hintText="Name" floatingLabelText="Name" name="name"
                  value={props.login.name} onChange={update} />
              </FormGroup>
              <FormGroup>
                <TextField hintText="Password" floatingLabelText="Password" name="pass"
                  value={props.login.pass} type="password" onChange={update} />
              </FormGroup>
            </CardText>
            <CardActions>
              <RaisedButton label="Log In" primary={true} fullWidth={true} onClick = {create_token} />
              <CardTitle className = "subtitle_connect" subtitle="Connect Using Other Account:"/>
              <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=41f8f887360cc3177894">
                <RaisedButton
                  label="Sign In With GitHub"
                  icon= {<GitHubIcon />}
                  fullWidth={true} /></a>
            </CardActions>
          </Form>
        </Card>
            </div>);
          });

          function UserForm(params) {
            function update(ev) {
              let tgt = $(ev.target);
              let data = {};
              data[tgt.attr('name')] = tgt.val();
              let action = {
                type: 'UPDATE_USER_FORM',
                data: data,
              };
              params.dispatch(action);
            }

            function submit(ev) {
              validateInput()
            }

            function validateInput() {
              if( /(.+)@(.+){2,}\.(.+){2,}/.test(params.userForm.email) ) {
                if(params.userForm.name.length == 0) {
                  alert('name is empty')
                  return false
                }
                else {
                  if(params.userForm.password.length == 0)
                  {
                    alert("password is empty")
                    return false
                  }
                  else {
                    api.submit_user(params.userForm, params.history);
                  }
                }
              }
              else {
                alert("invalid email")
                return false
              }
            }
            return (
              <div className="container register">
                <div className="row">
                  <div className=".col-md-6 sign-up">

                    <Card>
                      <CardTitle
                        title = "Not A Member Yet?"
                        titleColor="White"
                        subtitle="Register Here"
                        subtitleColor="White"
                        className="card-color"/>
                        <CardText>
                          <FormGroup>
                            <TextField hintText="Enter your Email" floatingLabelText="Email" name="email" onChange={update} value={params.userForm.email}/>
                          </FormGroup>
                          <FormGroup>
                            <TextField hintText="Enter your name" floatingLabelText="Name" name="name" onChange={update} value={params.userForm.name} />
                          </FormGroup>
                          <FormGroup>
                            <TextField hintText="Password Field" floatingLabelText="Password" type="password" name="password" value={params.userForm.password} onChange={update} />
                          </FormGroup>
                        </CardText>
                        <CardActions>
                          <input type="hidden" name = "login_type" value="formRegister" />
                          <RaisedButton label="Sign Up" secondary={true} fullWidth={true} onClick = {submit} />
                        </CardActions>
                      </Card>
                    </div>
                    <div className=".col-md-6 login">
                      <LoginForm channel = {params.channel} history = {params.history} />
                    </div>

                  </div>
                </div> );
              }

              function state2props(state, props) {
                return { userForm: state.userForm}
              }

              export default connect(state2props)(UserForm);
