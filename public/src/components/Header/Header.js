import React, { Component } from 'react';
import AppHeading from './AppHeading';
import Search from './Search';

class Header extends Component {
    render() {
        return (
            <div className="row clearfix header">
                <AppHeading/>
                <Search changeSearch={this.props.changeSearch} changeFilter={this.props.changeFilter}/>
            </div>
        );
    }
}

export default Header;