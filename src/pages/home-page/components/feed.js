import React, { Component } from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';

import Post from './post';

import { listPost } from '../../../services/postServices';

export default class Feed extends Component {

    async componentWillMount() {
        await this.setState({
            pagination: 1
        });
        this.getPosts();
    }

    async getPosts() {
        return await listPost(this.state).then(x => {
            if (x.data.next === '') {
                this.setState({
                    bottomOff: true
                });
            }
            if (!this.state.posts) {
                this.setState({ posts: x.data.posts });
            }
            else {
                this.setState({
                    posts: this.state.posts.concat(x.data.posts)
                })
            }
            this.forceUpdate();
        }).catch((err) => {
            console.log(err);
            // this.setState({ posts: null })
            // if (!err || !err.response || err.response.status === 401) {
            //     window.localStorage.clear();
            //     window.location.replace('/');
            // }
        })
    }
    render () {
        if (this.state && this.state.posts) {
            const posts = this.state.posts.map((post) => {
                    return (
                        <Post key={post.id} postid={post.id} value={post}/>
                    )
            });
            return (
                <div style={{
                    marginLeft: '18%',
                    marginTop: '2%',
                    position: 'relative'
                }}>
                    {posts}
                <BottomScrollListener onBottom={() => this.getPosts()} />
                </div>
            )
        } else {
            return <div></div>
        }
    }
}