import React, { Component } from 'react';
import Icon from '../../elements/Icon';
import Input from '../../elements/Input';

class TodoItem extends Component {
    render() {

        let {id,name,activateTask,completed}= this.props;
        return (
            <div className="row list-item todo-list-item">
                <Input type={"checkbox"} isChecked={completed} isDisabled={true} stylesKey={"todoCheckbox"} />
                <span>{name}</span>
                <Icon stylesKey={"iconEditTodo"}
                      handleClick={()=>activateTask(id)}
                      classNames="glyphicon glyphicon-edit pull-right"/>
            </div>
        );
    }
}

export default TodoItem;