import React, { Component } from 'react';

const getProgressBarWidth = (category ,result ={total:0,active:0}) => {
    result = {
        total:category.tasks.length,
        active:category.tasks.filter(t => t.completed).length
    };

    if (category.subCategories.length) {
        return category.subCategories.reduce((prevResult, subCategory) => {
            if (!subCategory.subCategories.length) {
                return {
                    total: prevResult.total + subCategory.tasks.length,
                    active:prevResult.active + subCategory.tasks.filter(t => t.completed).length
                };
            }
            if (subCategory.subCategories.length) {
                let result = {
                    total: prevResult.total + subCategory.tasks.length,
                    active:prevResult.active + subCategory.tasks.filter(t => t.completed).length
                };
                return getProgressBarWidth(subCategory,result);
            }
        }, result)
    }
    else {
        return result;
    }
};

class ProgressBar extends Component {
    render() {
        let data = this.props.activeCategory ? getProgressBarWidth(this.props.activeCategory) : {total:0,active:0};
        let width = data.total ? Math.round((data.active/data.total) * 100) +'%' :"0%";

        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                     aria-valuemin="0" aria-valuemax="100" style={{width:width}}>
                    <span className="sr-only">&nbsp;</span>
                </div>
            </div>
        );
    }
}
export default ProgressBar;
