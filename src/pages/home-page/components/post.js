
import React, { Component } from 'react';
import Avatar from '@atlaskit/avatar';
import Textfield from '@atlaskit/textfield';

import './styles/post.css';

import { addComment, loadComments, likePost } from '../../../services/postServices';

export default class Post extends Component {
    comments;
    nextComments;
    componentWillMount() {
        this.setState({
            isLiked: (this.props.value.latest_reactions.like === undefined) ? false : this.props.value.latest_reactions.like.filter((x) => x.user_id === window.localStorage.getItem('user')).length > 0,
            isLoading: false,
            hide: (this.props.value.latest_reactions.comment && this.props.value.latest_reactions.comment.length === 5 && this.props.value.latest_reactions_extra.comment.next !== '') ? false : true
        });
        this.forceUpdate();
    }

    like = async () => {
        this.state.isLoading = true;
        this.forceUpdate();
        if (this.state.isLiked) {
            this.props.value.reaction_counts.like--;
            this.state.isLiked = false;
            this.forceUpdate();
            await likePost(this.state.isLiked, this.props.value.id, this.props.value.latest_reactions.like.filter(liked => liked.user_id === window.localStorage.getItem('user'))[0].id);
            this.state.isLoading = false;
            this.forceUpdate();
        } else {
            (this.props.value.reaction_counts.like) ? this.props.value.reaction_counts.like++ : this.props.value.reaction_counts.like = 1;
            this.state.isLiked = true;
            this.forceUpdate();
            const liked = await likePost(this.state.isLiked, this.props.value.id, null);
            this.props.value.latest_reactions.like = [{
                user_id: window.localStorage.getItem('user'),
                id: liked.data.activityId
            }];
            this.state.isLoading = false;
            this.forceUpdate();
        }
    }

    handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            const val = event.target.value
            event.target.value = '';
            await addComment(val, this.props.value.id)
                .then((res => {
                    if (!this.props.value.latest_reactions.comment) {
                        this.props.value.latest_reactions.comment = [{
                            created_at: new Date().toISOString(),
                            data: {
                                text: val
                            },
                            user_id: window.localStorage.getItem('user'),
                            id: res.data.id
                        }]
                    } else {
                        this.props.value.latest_reactions.comment.unshift({
                            created_at: new Date().toISOString(),
                            data: {
                                text: val
                            },
                            user_id: window.localStorage.getItem('user'),
                            id: res.data.id
                        });
                    }
                    this.forceUpdate();
                }))
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    createComment(commentData) {
        const today = new Date();
        return commentData.map((value) => {
            return (
            <li key={value.id}>
                <div className="comment-creation-date">{Math.round((today.getTime() - new Date(value.created_at).getTime()) / (24*60*60*1000))} day ago</div>
                <div className="comment-description">
                    <div className="comment-owner">{value.user_id}</div>
                    <div className="comment-description-text">{value.data.text}</div>
                </div> 
            </li>)
        });
    }

    loadMoreComments = async () => {
        this.state.isLoading = true;
        this.forceUpdate();
        if (this.props.value.latest_reactions_extra.comment && !this.state.nextComments && this.state.nextComments !== null) {
            await loadComments(this.props.value.latest_reactions_extra.comment.next.split('v1.0/')[1])
                .then((newComments) => {
                    if (newComments.data !== 404 && (newComments.data.results.length < 5 || !newComments || newComments.data.next === '' || !newComments.data.next)) {
                        this.props.value.latest_reactions.comment = newComments.data.results.concat(this.props.value.latest_reactions.comment);                        
                        this.setState({
                            nextComments: null
                        });
                        this.state.isLoading = false;
                        this.forceUpdate();
                    } else {
                        this.props.value.latest_reactions.comment = newComments.data.results.concat(this.props.value.latest_reactions.comment);
                        this.setState({
                            nextComments: newComments.data.next
                        });
                        this.state.isLoading = false;
                        this.forceUpdate();
                    }
                });
        } else if (this.props.value.latest_reactions_extra.comment && this.state.nextComments !== null) {
            await loadComments(this.state.nextComments.split('v1.0/')[1])
                .then((newComments) => {
                    if (newComments.data.results.length < 5 || newComments.data.next === '' || !newComments.data.next) {
                        this.setState({
                            nextComments: null
                        });
                        this.state.isLoading = false;
                        this.forceUpdate();
                    } else {
                        this.props.value.latest_reactions.comment = newComments.data.results.concat(this.props.value.latest_reactions.comment);
                        this.setState({
                            nextComments: newComments.data.next
                        });
                        this.state.isLoading = false;
                    this.forceUpdate();
                    }
                });
        } else {
            
        }
    }

    render() {
        const date = new Date(this.props.value.time);
        const today = new Date();
        if (this.props.value.latest_reactions.comment) {
            this.comments = this.createComment(this.props.value.latest_reactions.comment);
        }
      return (
        <div className="post">
                <div className="container">
        <ul className="feed">
            <li>
                <div className="feed-item-header">
                    <div className="notification-icon"></div>
                    <div className="user-information">
                        <div className="user-image-container">
                            <Avatar href="/home/home" size="medium"></Avatar>
                        </div>
                        <div className="user-name">
                            {(this.props.value.actor.id) ? <span>{this.props.value.actor.id}</span> : this.props.value.actor}
                        </div>
                    </div>
                    <div className="creation-date">
                        {Math.round((today.getTime() - date.getTime()) / (24*60*60*1000))} Days ago
                    </div>
                </div>
                <p className="feed-item-body">
                    {this.props.value.object}
                </p>
                <div className="feed-icon-events">
                    <ul className="events-list">
                        <li>
                            <span className="icon">
                                <button className="clean_button" onClick={this.like} disabled={this.state.isLoading} style={{border: 'none'}}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYrkEd9DdUfPMDUkaFvrUD6ujjD65saiNUb6NS6DdqvOMM5YrDDQ" alt="" width="15" /></button>
                            </span> 
                            <span className="text-icon">  {(this.props.value.reaction_counts.like) ? this.props.value.reaction_counts.like : 0} likes</span>
                        </li>
                    </ul>
                    <Textfield value={this.state.newComment} id="comment-input" name="default" onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="feed-item-comments">
                    <ul className="comments-list">
                        {this.comments}
                    </ul>
                    <div className="feed-action">
                        {(!this.state.isLoading && this.state.nextComments !== null && !this.state.hide) ? <button className="btn btn-primary" disabled={this.state.isLoading}  onClick={this.loadMoreComments}> <span className="load-button">Load More</span> </button> : <div></div>}
                    </div>
                </div>
            </li>
        </ul>
    </div>
        </div>
      )
    }
  }