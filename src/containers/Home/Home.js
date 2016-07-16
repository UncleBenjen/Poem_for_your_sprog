import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/comments'
import styles from './Home.css'
import { isEmpty, timeSincePosted } from '../../utils'

import FlatButton from 'material-ui/FlatButton';

import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Poem from '../../components/Poem/Poem'

class Home extends Component {
  
  static fetchData({ params, store, url }) {
    return store.dispatch( actionCreators.fetchComments(url) )
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if(!this.props.loading && this.props.comments.length == 0){
      this.props.actions.fetchComments(location.origin)
    }
    
  }

  render () {

    const { comments } = this.props
    let poem = null

    if( isEmpty(comments) ){
      /* npm packages not loaded yet... */
    } else {

      poem = <Poem title={comments[this.props.id].parent_thread.title} posted={timeSincePosted(comments[this.props.id].created)} content={comments[this.props.id].body} author="Poem_for_your_sprog" />
      
    }

    return (
      <div className={styles.home} style={{width:'100%',flex:'1 0 auto'}}>
          {poem}
          <div className={styles.navButtonContainer}>
            <FlatButton disabled={this.props.id == 0} onTouchTap={ (e) => { this.props.actions.prevComment(); window.scrollTo(0, 0) } } label="Prev" secondary={true} icon={<ArrowBack />}></FlatButton>
            <FlatButton disabled={this.props.id >= comments.length - 1} onTouchTap={ (e) => { this.props.actions.nextComment(); window.scrollTo(0, 0) } } label="Next" labelPosition="before" secondary={true} icon={<ArrowForward /> }></FlatButton>

          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    comments: state.comments.list,
    loading: state.comments.loading,
    id: state.comments.selected
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
