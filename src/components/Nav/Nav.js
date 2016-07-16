import React, {Component} from 'react'
import styles from './Nav.css'

class Nav extends Component {

	constructor (props) {
    	super(props)
  	}

  	render (){
  		return (<nav className={styles.container}>{this.props.children}</nav>)
  	}

}


export default Nav