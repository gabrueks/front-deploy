import React, { Component } from 'react';
import StyleBar from '../shared/components/stylebar';
import NavBar from '../shared/components/navbar';

import Feed from './components/feed';
import CreatePost from './components/create-post';
import FollowPeople from './components/follow-people';
import FollowGroups from './components/follow-groups';

export class HomePage extends Component {

  render() {
    return (
        <div style={{
            display: 'grid'
        }}>
            {(this.props.match.params.action === 'home') ? <Feed/> : null}
            {(this.props.match.params.action === 'create-post') ? <CreatePost/> : null}
            {(this.props.match.params.action === 'follow-people') ? <FollowPeople/> : null}
            {(this.props.match.params.action === 'follow-groups') ? <FollowGroups/> : null}
            <StyleBar/>
            <NavBar/>
        </div>
    );
  }
}
