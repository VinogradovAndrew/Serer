import React, {Component} from 'react';
import Todos from './Todos/Todos';
import Categories from './Categories/Categories';
import {v4} from 'uuid';
import {withRouter} from 'react-router';
import {updateAppURL,deepFindCategory,deepFindSubCategoryParent} from '../../tools';
import data from './data';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: data
        };
        if(this.state.categories[0]){
            updateAppURL(props.router,{categoryId:this.state.categories[0].id});
            this.props.setProgressBarData(this.state.categories[0]);
        }

    }

    addCategory(name) {
        let category = {
            id: v4(),
            name,
            active: false,
            subCategories: [],
            tasks: []
        };

        this.setState({categories: [...this.state.categories, category]});
    }

    addNestedCategory(toCategoryId, name){
        let collection = deepFindSubCategoryParent(this.state.categories,toCategoryId);

        let category = collection.find(category => category.id === toCategoryId);

        let newCategory = {
            id: v4(),
            name,
            active: false,
            subCategories: [],
            tasks: []
        };

        category.subCategories.push(newCategory);

        this.setState({categories: this.state.categories});
    }

    deleteCategory(id) {
        let collection = deepFindSubCategoryParent(this.state.categories,id);

        let {categoryId} = this.props.params;

        collection.forEach((category,index) => {
            if(category.id === id){
                collection.splice(index,1);
            }
        });

        if(categoryId === id){
            updateAppURL(this.props.router, {...this.props.params, categoryId: ""});
        }
        this.setProgressBarDataWrapper(categoryId);

        this.setState({categories: this.state.categories});
    }

    editCategoryName(id, newName) {
        let category = this.findCategoryById(id);

        category.name = newName;

        this.setState({categories: this.state.categories});
    }

    findCategoryById(id) {
        return deepFindCategory(this.state.categories, id);
    }

    addSubCategory(id, name) {
        let category = this.findCategoryById(id);

        let subCategory = {
            id: v4(),
            name,
            active: false,
            subCategories: [],
            tasks: []
        };

        category.subCategories = [subCategory, ...category.subCategories];

        this.setState({categories: this.state.categories});
    }

    moveTaskToAnotherCategory(toCategoryId){

        let {categoryId,taskId} = this.props.params,
            task;

        if(toCategoryId === categoryId) return;

        let fromCategory = this.findCategoryById(categoryId);
        let toCategory = this.findCategoryById(toCategoryId);


        fromCategory.tasks.forEach((t,index) => {
            if(t.id === taskId){
                task = t;
                fromCategory.tasks.splice(index,1);
            }
        });

        toCategory.tasks.push(task);

        updateAppURL(this.props.router, {...this.props.params, categoryId: toCategoryId,taskId:''});

        this.props.setProgressBarData(toCategory);

        this.setState({categories: this.state.categories});
    }

    addTodo(name) {
        let {categoryId} = this.props.params;

        if (!categoryId)return;

        let category = this.findCategoryById(categoryId);

        let task = {
            id: v4(),
            name,
            completed: false,
            description:''
        };

        category.tasks = [task, ...category.tasks];

        this.props.setProgressBarData(category);

        this.setState({categories: this.state.categories});
    }

    editTask(task){
        let {categoryId} = this.props.params;
        let category = this.findCategoryById(categoryId);
        let editedTaskIndex = category.tasks.findIndex((t) => t.id === task.id);

        category.tasks[editedTaskIndex] = {...task};

        this.props.setProgressBarData(category);

        this.setState({categories: this.state.categories});
    }

    setProgressBarDataWrapper(id){
        let category = this.findCategoryById(id);

        this.props.setProgressBarData(category);
    }

    render() {
        let {categoryId} = this.props.params;
        let category = this.findCategoryById(categoryId);
        let tasks = category ? category.tasks : [];

        return (
            <div className="row">
                <Categories categories={this.state.categories}
                            addCategory={this.addCategory.bind(this)}
                            addSubCategory={this.addSubCategory.bind(this)}
                            addNestedCategory={this.addNestedCategory.bind(this)}
                            editCategory={this.editCategoryName.bind(this)}
                            setProgressBarData={this.setProgressBarDataWrapper.bind(this)}
                            moveTaskToAnotherCategory={this.moveTaskToAnotherCategory.bind(this)}
                            deleteCategory={this.deleteCategory.bind(this)}/>
                <Todos tasks={tasks}
                       addTodo={this.addTodo.bind(this)}
                       editTask={this.editTask.bind(this)}
                       search={this.props.search}/>

            </div>
        );
    }
}

export default withRouter(Todo);