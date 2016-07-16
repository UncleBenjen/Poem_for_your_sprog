import React, {Component} from 'react'
import styles from './Viewport.css'

class Viewport extends Component {

	constructor (props) {
    	super(props)
  	}

  	render (){
  		return (<main  className={styles.viewport}>{this.props.children}</main>)
  	}

}


export default Viewport