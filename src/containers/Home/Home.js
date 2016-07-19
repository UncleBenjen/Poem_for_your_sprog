import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { routerActions } from 'react-router-redux'
import * as actionCreators from '../../actions/comments'
import styles from './Home.css'
import { isEmpty, timeSincePosted } from '../../utils'
import theme from '../../theme'

import Comment from '../../components/Comment/Comment'


import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class Home extends Component {
  
  static fetchData({ params, store, url }) {
    let state = store.getState()
    if(state.comments.list.length > 0){
      let thread_info = state.comments.list[state.comments.selected].parent_thread.url.split('/')
      return store.dispatch( actionCreators.fetchParentComment(url, thread_info[4], thread_info[6],  thread_info[7], state.comments.list[state.comments.selected].parent_comment.id) )
    }
    else{
      return
    }
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if(this.props.comment){
      
      if(!this.props.comment.parent_comment.body){
        let params = this.props.comment.parent_thread.url.split('/')
        this.props.actions.fetchParentComment(location.origin, params[4], params[6], params[7], this.props.comment.parent_comment.id)
      }
    }
    
  }

  render () {

    let poem = null
    let parent = null
    let title = null

    if( !isEmpty(this.props.comment) ){
      title = this.props.comment.parent_thread.title

      poem = <Comment points={this.props.comment.score + ' points'} posted={timeSincePosted(this.props.comment.created)} content={this.props.comment.body} author="Poem_for_your_sprog" />
      if(this.props.comment.parent_comment.body){
         parent = <Comment points={this.props.comment.parent_comment.score + ' points'} posted={timeSincePosted(this.props.comment.parent_comment.created)} content={this.props.comment.parent_comment.body} author={this.props.comment.parent_comment.author} />
      }
    }

    return (
      <div className={styles.home}>
          <h2 className={styles.title} style={{ color:theme.palette.textColor }}>{ title }</h2>
          { this.props.loadingParent ? <CircularProgress size={0.5} style={{alignSelf:'center'}}/> : parent}
          {poem}
          <div className={styles.navButtonContainer}>
            <FlatButton disabled={this.props.id == 0} onClick={ (e) => { this.props.actions.prevComment(); window.scrollTo(0, 0) } } label="Prev" secondary={true} icon={<ArrowBack />}></FlatButton>
            <FlatButton disabled={this.props.id >= this.props.numOfComments - 1} onClick={ (e) => { this.props.actions.nextComment(); window.scrollTo(0, 0) } } label="Next" labelPosition="before" secondary={true} icon={<ArrowForward /> }></FlatButton>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    comment: state.comments.list[state.comments.selected],
    numOfComments: state.comments.list.length,
    loadingParent: state.comments.subloading,
    id: state.comments.selected
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actionCreators, dispatch),
    routerActions: bindActionCreators(routerActions, )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
