import { getGoods, getMyBag, addToBag, deletedBag, deletedGoods, editData, addToGoods, searchGoodsAdmin, searchGoodsFailure, searchGoodsGoods, updateDataforCount, addToOrders, getOrders } from './reducer'


export function fetchGetGoods() {
    return function (dispatch) {
        fetch('http://localhost:5000/goods')
            .then(res => res.json())
            .then(data => dispatch(getGoods(data)))
    }
}


export function fetchGetMyBag() {
    return function (dispatch) {
        fetch('http://localhost:5000/my-bag')
            .then(res => res.json())
            .then(data => dispatch(getMyBag(data)))
    }
}



export function fetchAddToBag(obj) {
    return function (dispatch) {
        fetch('http://localhost:5000/add-mybag', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.text())
            .then(data => dispatch(addToBag(data)))
    }
}


export function fetchDeleteFromBag(obj) {
    return function (dispatch) {
        fetch(`http://localhost:5000/delete-mybag/${obj.id}`, {
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(data => dispatch(deletedBag(data)))
    }
}


export function fetchDeleteFromGoods(obj) {
    return function (dispatch) {
        fetch(`http://localhost:5000/delete-admin/${obj.id}`, {
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(data => dispatch(deletedGoods(data)))
    }
}


export function fetchEditData(changedObject, newObject) {
    let obj = { ...changedObject, ...newObject }
    return function (dispatch) {
        fetch(`http://localhost:5000/change-admin/${changedObject.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.text())
            .then(data => dispatch(editData(data)))
    }
}



export function fetchAddToGoods(newObject) {
    return function (dispatch) {
        fetch('http://localhost:5000/add-admin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
            .then(res => res.text())
            .then(data => dispatch(addToGoods(data)))
    }
}


export function fetchSearchGoods(searchValue) {
    return function (dispatch) {
        try {
            fetch(`http://localhost:5000/search-admin/${searchValue}`)
                .then(res => res.json())
                .then(data => dispatch(searchGoodsAdmin(data)))
        } catch (error) {
            dispatch(searchGoodsFailure(error.message))
        }
    }
}


export function fetchSearchGoodsinGoods(searchValue) {
    return function (dispatch) {
        fetch(`http://localhost:5000/search-goods/${searchValue}`)
            .then(res => res.json())
            .then(data => dispatch(searchGoodsGoods(data)))
    }
}


export function fetchUpdateCount(obj, newCount) {
    return function (dispatch){
        fetch(`http://localhost:5000/update-order-count/${obj.id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ count: newCount})
        })
            .then(res => res.text())
            .then(data => dispatch(updateDataforCount(data)))
    }
}



export function fetchAddToOrders(obj){
    return function (dispatch) {
        fetch('http://localhost:5000/add-orders', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.text())
            .then(data => dispatch(addToOrders(data)))
    }
}



export function fetchGetOrders(){
    return function (dispatch) {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => dispatch(getOrders(data)))
    }
}
