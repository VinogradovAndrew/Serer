import React, {Component} from 'react';
import Icon from '../../elements/Icon';
import {updateAppURL} from '../../../tools';
import {withRouter} from 'react-router';
import List from './List';


class Category extends Component {

    activateCategory() {
        this.props.setProgressBarData(this.props.id);

        updateAppURL(this.props.router, {...this.props.params, categoryId: this.props.id, taskId: ""});
    }

    render() {
        let {activeTask, deleteItem,editItem,addNestedCategory, id, name,subCategories} = this.props;
        let isActive = this.props.params.categoryId === id;

        if (!activeTask) {

            return (
                <div  className="row list-item categories-list-item">
                    <span style={isActive ? {color:"red"}:{}}
                          onClick={this.activateCategory.bind(this)}
                          className="clickAble">{name}</span>
                    <Icon handleClick={() => editItem(id)} stylesKey={"icon"} classNames="glyphicon glyphicon-edit"/>
                    <div className="pull-right ">
                        <Icon handleClick={() => deleteItem(id)} classNames="glyphicon glyphicon-trash" stylesKey={"icon"}/>
                        <Icon handleClick={() => addNestedCategory(id)} classNames="glyphicon glyphicon-plus" stylesKey={"icon"}/>
                    </div>
                    <div className="nested-categories">
                        { subCategories.length ? <List stylesKey="nestedList"
                                                       isSubList={true}
                                                       categories={subCategories}
                                                    {...this.props.nestedListProps} /> : null}
                    </div>
                </div>
            );
        }
        return (
            <div  className="row list-item categories-list-item">
                <span style={isActive ? {color:"red"}:{}}>{name}</span>
                <div className="pull-right">
                    <Icon classNames="glyphicon glyphicon-share-alt move-to-category"
                          stylesKey={"icon"}
                          handleClick={()=> this.props.moveTaskToAnotherCategory(id)}/>
                </div>
                <div className="nested-categories">
                    { subCategories.length ? <List stylesKey="nestedList"
                                                   isSubList={true}
                                                   categories={subCategories}
                        {...this.props.nestedListProps} /> : null}
                </div>
            </div>
        )

    }
}

export default withRouter(Category);