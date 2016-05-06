import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Template } from 'meteor/templating';
import {Blaze } from 'meteor/blaze';

export default class AccountWrapper extends Component{
	//这些个react好像object c里面的一样
	//注意大小写，loginButtons!
	componentDidMount() {
	    this.view = Blaze.render(Template.loginButtons,
	    	ReactDOM.findDOMNode(this.refs.container));  
	}
	componentWillUnmount() {
	    Blaze.remove(this.view); 
	}
	render(){
		return <span ref="container"/>;
	}
}

