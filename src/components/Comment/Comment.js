import React, {Component} from 'react'
import styles from './Comment.css'
import theme from '../../theme'

class Comment extends Component {

	constructor (props) {
    	super(props)
  	}

  	render(){

  		return (
  		<div className={styles.commentContainer}>
  			
        <p style={{ fontFamily: 'Roboto', fontSize: '16px', margin: '12px 0' }}>
          <span style={{ color: theme.palette.primary1Color }}>{this.props.author}</span>
          &nbsp;
          <span style={{color:theme.palette.alternateTextColor}}>{'('+this.props.points } &nbsp;|&nbsp; {this.props.posted+')'}</span>
        </p>

  			<div className={styles.commentText} style={{ color:theme.palette.textColor }} dangerouslySetInnerHTML={{ __html:this.props.content }}></div>
  			
  			
  		</div>)
  	}

}


export default Comment