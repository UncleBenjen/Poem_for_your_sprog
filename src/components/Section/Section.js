import React, {Component} from 'react'
import styles from './Section.css'

class Section extends Component {

  constructor (props) {
      super(props)
    }

    render (){
      return (<section  className={styles.section}>{this.props.children}</section>)
    }

}


export default Section