import React, { Component } from 'react';

import Textfield from '@atlaskit/textfield';

import { followGroup, createGroup } from '../../../services/followServices';

export default class FollowGroups extends Component {

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
                followGroup(event.target.value)
                    .then((data) =>{
                        console.log(data);
                        if (data.status === 201) {
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
    
    handleKeyPressCreate = (event) => {
        if (event.key === 'Enter') {
            createGroup(event.target.value)
                .then((data) =>{
                    console.log(data.status);
                    if (data.status === 201) {
                        this.setState({
                            createdGroup: true
                        })
                        this.forceUpdate();
                    }
                });
            event.target.value = '';
        }
    }
    render () {
        return (
            <div
            style= {{
                marginLeft: '18%',
                marginTop: '2%',
                marginRight: '3%',
                position: 'relative'
            }}>
                Write the group name to follow and press enter.
                <Textfield onKeyPress={this.handleKeyPress}/>
                {(this.state.messageError) ? <span>Use only letters.</span> : <span></span>}
                {(this.state.userNotFound) ? <span>Group not found.</span> : <span></span>}
                {(this.state.followed) ? <span>Group followed.<br></br></span> : <span></span>}
                Create a group!
                <Textfield onKeyPress={this.handleKeyPressCreate}/>
                {(this.state.createdGroup) ? <span>Group Created.</span> : <span></span>}
            </div>
        );
    }
}