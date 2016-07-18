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
  			<p style={{ fontFamily: 'Roboto', color: theme.palette.primary1Color , fontSize: '18px', margin: '8px 0' }}>{this.props.author}</p>
  			<p style={{ fontFamily: 'Roboto', color:theme.palette.alternateTextColor, fontSize: '18px', margin: '8px 0' }}>{this.props.points}&nbsp;|&nbsp;{this.props.posted}</p>
  		</div>)
  	}

}


export default Poem