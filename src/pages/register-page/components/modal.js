// React Imports
import React, { PureComponent } from 'react';

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

import { Redirect } from 'react-router-dom';

type State = {
    isOpen: boolean
}

export default class RegisterModal extends PureComponent<{}, State> {
    state: State = { isOpen: true };

    close = () => {
        this.setState({
            isOpen: false
        });
    }

    signIn = () => {
        this.close();
    }

    render() {
        let { isOpen } = this.state;
        const actions = [
            (this.props.success) ? { text: 'Sign in', onClick: this.signIn } : { text: 'Close', onClick: this.close }
        ];

        return (this.props.success) ? (isOpen) ? (
                <ModalTransition>
                    <Modal actions={actions} onClose={this.close} heading='Account Registered'></Modal>
                </ModalTransition>
            ): <Redirect to="/"/>
            : (isOpen) ? <ModalTransition>
                <Modal actions={actions} onClose={this.close} heading="Failed to Register. It's possible that the account already exists"></Modal>
            </ModalTransition> : <Redirect to="/"/>
    }
}

