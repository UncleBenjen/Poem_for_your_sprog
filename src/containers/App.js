import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { routerActions } from 'react-router-redux'
import * as actionCreators from '../actions/comments'
import { connect } from 'react-redux'
import Viewport from '../components/Viewport/Viewport'
import Section from '../components/Section/Section'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'

import appStyles from './App.css'

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

              <div className={appStyles.leftMargin}>
                  <Link to="/" activeClassName=""><IconButton tooltip=""><ViewCarousel color={ this.props.currentRoute === "/" ? theme.palette.accent1Color : theme.palette.textColor }/></IconButton></Link>
                  <Link to="/list" activeClassName=""><IconButton tooltip=""><ViewList color={ this.props.currentRoute === "/list" ? theme.palette.accent1Color : theme.palette.textColor } /></IconButton></Link>
              </div>

              <h1 className={appStyles.title} style={{ color:theme.palette.alternateTextColor }}>/u/poem_for_your_sprog</h1>

              <span className={appStyles.stretch} ></span>

              <div className={appStyles.rightMargin}>
                <SelectField
                    value={this.props.filter}
                    style={{width:140}}
                    onChange={ (event, index, value) => { 
                      this.props.actions.changeFilter(location.origin, value); 
                      this.props.routerActions.push("list"); 
                    } }>
                    <MenuItem value="new" primaryText="New" />
                    <MenuItem value="top" primaryText="Top" />
                    <MenuItem value="controversial" primaryText="Controversial" />
                  </SelectField>
              </div>

            </Nav>    

            <Section>
            { this.props.loading ? <CircularProgress color={theme.palette.accent1Color} /> : this.props.children }
            </Section>

            <Footer>
              <p>
                <span>Developed by <a href="http://benjaminspeir.com">Benjamin Speir</a></span>
                <span><a href="https://github.com/UncleBenjen/Poem_for_your_sprog">View on GitHub</a></span>
              </p>
            </Footer>

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
  return { actions: bindActionCreators(actionCreators, dispatch), routerActions: bindActionCreators(routerActions, dispatch) }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
