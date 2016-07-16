import React, {Component} from 'react'
import styles from './Poem.css'
import theme from '../../theme'
class Poem extends Component {

	constructor (props) {
    	super(props)
  	}

  	render(){

  		return (
  		<div className={styles.poemContainer}>
  			<h2 className={styles.poemTitle} style={{ color:theme.palette.textColor }}>{ this.props.title }</h2>
  			<div className={styles.poemText} style={{ color:theme.palette.textColor }} dangerouslySetInnerHTML={{ __html:this.props.content }}></div>
  			<span style={{ fontFamily: 'Raleway', color:theme.palette.alternateTextColor, fontSize: '18px' }}>{this.props.posted}</span>
  			<br/>
  			<span style={{ fontFamily: 'Raleway', color: theme.palette.primary1Color , fontSize: '18px' }}>{this.props.author}</span>
  		</div>)
  	}

}


export default Poem