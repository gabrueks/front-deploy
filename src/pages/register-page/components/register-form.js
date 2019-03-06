// React Imports
import React, { Fragment } from 'react';

// Atlas style imports
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';

// Import components
import Modal from './modal';

// Services
import { createUser } from '../../../services/authServices';

let success = false;
let isModalOpen = false;

export default () => (
  <div
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
      onSubmit={async data => createUser(data).then(() => {
        isModalOpen = true; success = true;
      }).catch(() => {
        isModalOpen = true; success = false      
      })}
    >
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Field name="name" label="Name" isRequired defaultValue="">
            {({ fieldProps, error}) => (
                <Fragment>
                    <TextField autoComplete="off" {...fieldProps}/>
                        {!error && (
                            <HelperMessage>
                                Write your name.
                            </HelperMessage>
                        )}
                        {error && (
                            <ErrorMessage>
                                Name is required.
                            </ErrorMessage>
                        )}
                </Fragment>
            )}
          </Field>
          <Field name="username" label="Username" isRequired defaultValue="" validate={value => (/[^A-Za-z]+/g).test(value) ? 'Invalid username, use only letters' : undefined}>
            {({ fieldProps, error}) => (
                <Fragment>
                    <TextField autoComplete="off" {...fieldProps}/>
                        {!error && (
                            <HelperMessage>
                                Write your username.
                            </HelperMessage>
                        )}
                        {error && (
                            <ErrorMessage>
                                Username is required. Use only letters.
                            </ErrorMessage>
                        )}
                </Fragment>
            )}
          </Field>
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
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle" href="/">Back</Button>
              <Button type="submit" appearance="primary" isLoading={submitting}>
                Sign up
              </Button>
            </ButtonGroup>
          </FormFooter>
          {(!isModalOpen) ? <div></div> : <Modal success={success} isOpenModal={isModalOpen}></Modal>}
        </form>
      )}
    </Form>
  </div>
);