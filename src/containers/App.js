import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import * as actionCreators from '../actions/comments'
import { connect } from 'react-redux'
import Viewport from '../components/Viewport/Viewport'
import Section from '../components/Section/Section'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'

/* generic styles */
import styles from '../styles/base.css'
import normalize from '../styles/normalize.css'
Object.assign(styles, normalize)

import theme from '../theme'

import IconButton from 'material-ui/IconButton';
import ViewCarousel from 'material-ui/svg-icons/action/view-carousel';
import ViewList from 'material-ui/svg-icons/action/view-list';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import CircularProgress from 'material-ui/CircularProgress';

const customStyles = {
  menuWidth: {
    width: 150,
  },
};

class App extends Component {
    static fetchData({ params, store, url }) {
      return store.dispatch( actionCreators.fetchComments(url) )
    }

    constructor (props) {
      super(props)
    }

    componentDidMount () {
      this.props.actions.fetchComments(location.origin)
      //this.props.dispatch(actionCreators.fetchComments(location.origin))
    }

    render (){

       

      return (
          <Viewport> 

            <Nav>

              <div style={{marginLeft:'16px'}}>
                  <Link to="/" activeClassName=""><IconButton tooltip=""><ViewCarousel color={ this.props.currentRoute === "/" ? theme.palette.accent1Color : theme.palette.textColor }/></IconButton></Link>

                  <Link to="/list" activeClassName=""><IconButton tooltip=""><ViewList color={ this.props.currentRoute === "/list" ? theme.palette.accent1Color : theme.palette.textColor } /></IconButton></Link>
              </div>

              <div style={{marginRight:'16px'}}>
                <SelectField
                    value={this.props.filter}
                    style={customStyles.menuWidth}
                    onChange={ (event, index, value) => { this.props.actions.changeFilter(location.origin, value) } }>
                    <MenuItem value="new" primaryText="New" />
                    <MenuItem value="top" primaryText="Top" />
                    <MenuItem value="controversial" primaryText="Controversial" />
                  </SelectField>
              </div>

            </Nav>    

            <Section>{ this.props.loading ? <CircularProgress color={theme.palette.accent1Color} /> : this.props.children }</Section>

            <Footer><p>Developed by Benjamin j. Speir  |  View on GitHub</p></Footer>
          </Viewport>
      );
    }
  
};

function mapStateToProps(state) {

  return { 
    filter: state.comments.filter,
    currentRoute: state.routing.locationBeforeTransitions.pathname,
    loading: state.comments.loading
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
