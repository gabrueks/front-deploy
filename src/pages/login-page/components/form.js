// @flow
import React, { Fragment } from 'react';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';
import InlineMessage from '@atlaskit/inline-message';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { Redirect } from 'react-router';

import { loginUser, forgetPassword } from '../../../services/authServices';
import { Component } from 'react';
import Textfield from '@atlaskit/textfield';

let isMessageShowing = false;
let redirect = false;

export default class FormLogin extends Component {
  componentWillMount() {
    this.setState({
      modal: false,
      email: ''
    })
  }

  cancelModal = () => {
    this.setState({
      modal: false
    })
    this.forceUpdate();
  }

  forgetPassword = (e) => {
    if (e && e.key === 'Enter') {
      forgetPassword({
        email: document.getElementById('email-reset').value
      });
      this.setState({
        modal: false
      })
    } else {
      forgetPassword({
        email: document.getElementById('email-reset').value
      });
      this.setState({
        modal: false
      })
    }
    this.forceUpdate();
  }

  actions = [
    {text: 'Reset', onClick: this.forgetPassword}, {text: 'Cancel', onClick: this.cancelModal }
  ]

  openModal = () => {
    this.setState({
      modal: true
    })
  }

  handleChange = (e) => {
    console.log(e)
  }
  render() {
    return (<div
      className="separator"
      style={{
        display: 'flex',
        width: '400px',
        margin: '0 auto',
        flexDirection: 'column',
        marginTop: 200
      }}
    >
      <Form
        onSubmit={async data => {
          isMessageShowing = false;
          await loginUser(data).then(() => redirect = true).catch((err) => console.log(err));
        }}
      >
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Field 
            name="email" 
            label="Email" 
            isRequired 
            defaultValue=""
            validate={value => !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ? 'Invalid e-mail': undefined )}>
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />
                  {!error && (
                    <HelperMessage>
                        Write your email.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      This email is invalid.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            <Field
              name="password"
              label="Password"
              defaultValue=""
              isRequired
              validate={value => (value.length < 8 ? 'TOO_SHORT' : undefined)}
            >
              {({ fieldProps, error, meta }) => (
                <Fragment>
                  <TextField type="password" {...fieldProps} />
                  {!error && !meta.valid && (
                    <HelperMessage>
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      Password needs to be more than 8 characters.
                    </ErrorMessage>
                  )}
                  {meta.valid && <ValidMessage>Awesome password!</ValidMessage>}
                </Fragment>
              )}
            </Field>
            <CheckboxField name="remember" label="Remember me" defaultIsChecked>
              {({ fieldProps }) => (
                <Checkbox {...fieldProps} label="Always sign in on this device" />
              )}
            </CheckboxField>
            <FormFooter>
              <ButtonGroup>
                <Button appearance="subtle" onClick={this.openModal}>Forget password</Button>
                   {(this.state.modal === true) ? <ModalTransition>
                          <Modal actions={this.actions} heading='Recover Password'>
                            <Textfield onChange={this.handleChange} id="email-reset" placeholder='Write your e-mail' onKeyPress={this.forgetPassword}/>
                          </Modal>
                      </ModalTransition> : <div></div>}
                <Button type="submit" appearance="primary" isLoading={submitting}>
                  Sign in
                </Button>
                <Button appearance="help" href="/create-account">Create Account</Button>
              </ButtonGroup>
            </FormFooter>
            {(!isMessageShowing) ? <div></div> : <InlineMessage title="Authentication error." type="error"></InlineMessage>}
            {(!redirect) ? <div></div> : <Redirect to="/home/home"/>}
          </form>
        )}
      </Form>
    </div>
  );
}
}
