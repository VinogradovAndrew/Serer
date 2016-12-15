export const updateAppURL = (router, {categoryId='', taskId='', filter='', search=''}) => {
    let url = `/category=${categoryId}&task=${taskId}&filter=${filter}&search=${search}`;

    router.push(url);
};

export function deepFindCategory(collection, id){
    return collection.reduce(function(result,currentVal,index,collection){
        if(result && result.id){
            return result;
        }
        if(currentVal.id === id){
            return currentVal;
        }
        if(currentVal.subCategories){
            return deepFindCategory(currentVal.subCategories,id);
        }
    },null)
}

export function deepFindSubCategoryParent(collection, id){
    return collection.reduce(function(result,currentVal,index,collection){
        if(result && result.length){
            return result;
        }
        if(currentVal.id === id){
            return collection;
        }
        if(currentVal.subCategories){
            return deepFindSubCategoryParent(currentVal.subCategories,id);
        }
    },{})
}