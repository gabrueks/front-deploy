import React, { Component } from 'react';
import {
    DropdownMenuStateless,
    DropdownItemGroupRadio,
    DropdownItemRadio,
  } from '@atlaskit/dropdown-menu';

import { createPost, createTimelinePost } from '../../../services/postServices';
import { getSubscriptions } from '../../../services/followServices';

import './styles/create-post.css';

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

    componentWillMount() {
        this.setState({
            isDropdownOpen: false,
            trigger: 'Choose'
        })
        getSubscriptions()
            .then((subscriptions) => {
                this.setState({
                    subscriptions: subscriptions.data.subscriptions
                });
                this.forceUpdate();
            })
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleChangeTimeline = (event) => {
        this.setState({valueTimeline: event.target.value});
        if (event.key === 'Enter') {
            this.handleSubmitTimeline();
        }
    }

    handleSubmitTimeline = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            valueTimeline: ''
        });
        this.forceUpdate();
        createTimelinePost(this.state).then((x) => console.log(x));
    }

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            value: ''
        });
        this.forceUpdate();
        createPost(this.state).then((x) => console.log(x));
    }

    setTimeline = (e) => {
        this.setState({
            timeline: document.getElementsByClassName('ItemParts__Content-sc-14xek3m-5 jRBaLt')[0].innerText,
            trigger: document.getElementsByClassName('ItemParts__Content-sc-14xek3m-5 jRBaLt')[0].innerText
        });
    }

     render() {
        let dropDownItem = (this.state.subscriptions) ? this.state.subscriptions.map((subs) => (subs !== null) ? <DropdownItemRadio onClick={this.setTimeline} id={subs}>{subs}</DropdownItemRadio>: null) : null;
        return (<div style={{
            marginLeft: '15%',
            marginTop: '2%',
            position: 'relative'
        }}>
            <div className="raf-panel raf-panel--rounded">
                <form id="form-data" onSubmit={this.handleSubmit}>
                    <div className="rfu-dropzone" aria-disabled="false" style={{position: 'relative'}}>
                        <div className="raf-panel-header">
                            <div className="raf-title" style={{fontSize: '18px'}}>New Post</div>
                        </div>
                        <div className="raf-panel-content">
                            <div style={{display: 'flex'}}>
                                <div className="rta  raf-textarea">
                                    <textarea onKeyPress={this.handleChange} name="text" rows="3" placeholder="Type your post... " value={this.state.value} onChange={this.handleChange} className="rta__textarea raf-textarea__textarea"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="raf-panel-footer">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{flex: '1 1 0%'}}>
                                </div>
                            <button className="raf-button raf-button--primary" type="submit" disabled={!this.state.value.length > 0}>Post</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form id="form-group-data" onSubmit={this.handleSubmit}>
                    <div className="rfu-dropzone" aria-disabled="false" style={{position: 'relative'}}>
                        <div className="raf-panel-header">
                            <div className="raf-title" style={{fontSize: '18px'}}>New Post to group
                            <div style={{ marginLeft: '10px' }}>
                                <DropdownMenuStateless
                                isOpen={this.state.isDropdownOpen}
                                onOpenChange={attrs => {
                                    this.setState({ isDropdownOpen: attrs.isOpen });
                                }}
                                trigger={this.state.trigger}
                                triggerType="button"
                                isMenuFixed
                                >
                                <DropdownItemGroupRadio id="subscriptions">
                                    {dropDownItem}
                                </DropdownItemGroupRadio>
                                </DropdownMenuStateless>
                            </div>
                            </div>

                        </div>
                        <div className="raf-panel-content">
                            <div style={{display: 'flex'}}>
                                <div className="rta  raf-textarea">
                                    <textarea onKeyPress={this.handleChangeTimeline} name="text" rows="3" placeholder="Type your post... " value={this.state.valueTimeline} onChange={this.handleChangeTimeline} className="rta__textarea raf-textarea__textarea"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="raf-panel-footer">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{flex: '1 1 0%'}}>
                                </div>
                            <button className="raf-button raf-button--primary" type="submit" disabled={!this.state.value.length > 0}>Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )};
}