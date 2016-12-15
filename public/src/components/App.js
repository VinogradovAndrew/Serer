import React, { Component } from 'react';
import Header from './Header/Header';
import Todo from './Todo/Todo';
import ProgressBar from './Progress/ProgressBar';
import {withRouter} from 'react-router';
// eslint-disable-next-line
import css from './index.css';
import {updateAppURL,deepFindCategory,deepFindSubCategoryParent} from '../tools';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {category:null};
    }

    setProgressBarData(category) {

        this.setState({category: category});
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <ProgressBar activeCategory={this.state.category}/>
                <Todo setProgressBarData={this.setProgressBarData.bind(this)}/>
            </div>
        );
    }
}

export default withRouter(App);
