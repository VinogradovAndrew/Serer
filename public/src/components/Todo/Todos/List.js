import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Todo from './Todo';

class List extends Component {
    render() {
        let {todos,activateTask} = this.props;
        let showOnlyActive = this.props.params.filter === 'active';
        let {search} = this.props.params;
        let searchRegEx = new RegExp(search,'gi');

        todos = showOnlyActive ? todos.filter((todo) => !todo.completed) : todos;
        todos = search ? todos.filter((todo) => todo.name.match(searchRegEx)) : todos;

        if(todos.length){
            return (
                <div className="col-sm-12 list">
                    {todos.map(todo =>
                        <Todo key={todo.id}
                              activateTask={activateTask}
                            {...todo}/>)}
                </div>
            );
        }
        return (
            <div style={{display:"flex"}} className="col-sm-12 list">
                <p style={{margin:"auto"}}>Here is no tasks yet</p>
            </div>
        )
    }
}

export default withRouter(List);