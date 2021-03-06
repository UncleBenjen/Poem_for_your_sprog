import React, { Component, PropTypes } from 'react'
import styles from './Footer.css'

export default class Footer extends Component {

  render () {
    return (
    	<footer className={styles.footer}>
    		{this.props.children}
    	</footer>
    )
  }

  constructor (props) {
    super(props)
  }
}
