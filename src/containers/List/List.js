import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './List.css'
import { isEmpty, timeSincePosted } from '../../utils'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import * as actionCreators from '../../actions/comments'

import theme from '../../theme'

import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Stars from 'material-ui/svg-icons/action/stars';
import {amber500} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import Subheader from 'material-ui/Subheader';


class CommentList extends Component {

  /*static fetchData({ params, store, url }) {
    return store.dispatch( fetchComments(url) )
  }*/

  constructor (props) {
    super(props)
    this.selectComment = this.selectComment.bind(this)
  }

  componentDidMount () {
    //this.props.dispatch(fetchComments(location.origin))
  }

  selectComment(index){
    this.props.actions.selectComment(index)
    this.props.routerActions.push('/')
  }

  render () {

    let comments = null


    if( isEmpty(this.props.comments) ){
      /* npm packages not loaded yet... */
    } else {

      let select = this.selectComment

      comments = (this.props.comments.map(function(comment, index){
        let listItem = comment.gilded ? 
                <ListItem  
                onClick={ (e) => { select(index) }}
                key={comment.id}
                primaryText={comment.parent_thread.title}
                secondaryText={<span style={{color:theme.palette.alternateTextColor}}>{comment.score + ' points.'}</span>}
                leftIcon={ comment.gilded > 1 ? <Badge badgeStyle={{top:'40px', right:'8px', backgroundColor:theme.palette.primary1Color}} style={{top:'-8px', margin:0}} badgeContent={'x'+comment.gilded}><Stars style={{width:'32px', height:'32px'
              }}  /></Badge> : <Stars color={theme.palette.textColor} style={{top:'6px', width:'32px', height:'32px'}} /> }/>
          :  <ListItem  
               onClick={ (e) => { select(index) }}
                key={comment.id}
                primaryText={comment.parent_thread.title}
                secondaryText={<span style={{color:theme.palette.alternateTextColor}}>{comment.score + ' points.'}</span>}
                insetChildren={true}/>
        return(listItem)
      }))
     
    }

    return (<List className={styles.list} style={{flex:'1 0 auto'}}>{comments}</List>)
  }
}

function mapStateToProps(state) {
  return { 
    comments: state.comments.list
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch), routerActions: bindActionCreators(routerActions, dispatch) }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentList)
