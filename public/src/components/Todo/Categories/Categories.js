import React, {Component} from 'react';
import List from './List';
import AddItem from '../../common/AddItem';
import {deepFindCategory} from '../../../tools';
import {withRouter} from 'react-router';

class CategoriesList extends Component {
    shouldComponentUpdate(nextProps) {
        let {activeCategoryId} = this.props.params;
        let nextActiveCategoryId = nextProps.params.activeCategoryId;

        return (nextActiveCategoryId && nextActiveCategoryId) ?
            (activeCategoryId !== nextActiveCategoryId) :
            true;
    }

    render() {
        let {taskId,categoryId} = this.props.params;
        let activeCategory = deepFindCategory(this.props.categories,categoryId);
        let activeTask = activeCategory ? activeCategory.tasks.find(task => task.id === taskId) : null;

        return (
            <div className="col-sm-4">
                <AddItem handleClick={this.props.addCategory}
                         classNames="input-group col-sm-10"
                         placeholderText="Введите название категории "/>
                <List handleDelete={this.props.deleteCategory}
                      setProgressBarData={this.props.setProgressBarData}
                      addNestedCategory={this.props.addNestedCategory}
                      handleEdit={this.props.editCategory}
                      moveTaskToAnotherCategory={this.props.moveTaskToAnotherCategory}
                      categories={this.props.categories}
                      activeTask={!!activeTask}/>
            </div>
        );
    }
}

export default withRouter(CategoriesList);