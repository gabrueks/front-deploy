import React, { Component } from 'react';

import Textfield from '@atlaskit/textfield';

import { followPerson } from '../../../services/followServices';

export default class FollowPeople extends Component {

    async componentWillMount() {
        this.setState({
            messageError: false,
            userNotFound: false,
            followed: false
        })
    }

    handleKeyPress = (event) => {
        if (!(/[^A-Za-z]+/g).test(event.target.value)) {
            this.setState({
                messageError: false
            });
            this.forceUpdate();
            if (event.key === 'Enter') {
                followPerson(event.target.value)
                    .then((data) =>{
                        if (data.status === 204) {
                            this.setState({
                                userNotFound: true,
                                followed: false
                            })
                            this.forceUpdate();
                        } else {
                            this.setState({
                                userNotFound: false,
                                followed: true
                            })
                            this.forceUpdate();
                        }
                    });
                event.target.value = '';
            }
        } else {
            this.setState({
                messageError: true
            })
            this.forceUpdate();
        }
    }

    render () {
        return (
            <div
            style= {{
                marginLeft: '15%',
                marginTop: '2%',
                marginRight: '3%',
                position: 'relative'
            }}>
                Write the username to follow and press enter.
                <Textfield onKeyPress={this.handleKeyPress}/>
                {(this.state.messageError) ? <span>Use only letters.</span> : <span></span>}
                {(this.state.userNotFound) ? <span>User not found.</span> : <span></span>}
                {(this.state.followed) ? <span>User followed.</span> : <span></span>}
            </div>
        );
    }
}