import React, { Component } from 'react';
import AddItem from '../../common/AddItem';
import List from './List';
import EditTask from './EditTodo';
import {withRouter} from 'react-router';
import {updateAppURL} from '../../../tools';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks
        };
    }

    activateTask(id) {
        updateAppURL(this.props.router, {...this.props.params, taskId: id});
    }

    render() {
        let {taskId} = this.props.params;
        let activeTask = taskId ? this.props.tasks.find(task => task.id === taskId) : null;

        if(!activeTask){
            return (
                <div className="col-sm-8">
                    <AddItem placeholderText={"Введите название задания"}
                             classNames={"input-group col-sm-6 pull-right"}
                             handleClick={this.props.addTodo}/>
                    <List todos={this.props.tasks}
                          activateTask={this.activateTask.bind(this)}
                          search={this.props.search}/>
                </div>
            );
        }

        return (
            <div className="col-sm-8">
                <EditTask editTask={this.props.editTask} task={activeTask}/>
            </div>
        )
    }
}

export default withRouter(TodoList);