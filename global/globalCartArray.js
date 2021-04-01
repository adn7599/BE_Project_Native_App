import {useState} from 'react';

const CartArray = () =>{
    var [CartList,setCartList] = useState([]);
    //var [Order,setOrder] = useState([]);


    const addToCart = (action) =>{
        const item = action
        const array = CartList
        console.log(typeof(array))
        console.log(array)
        array.push(item)
        console.log(array)
        setCartList(CartList = array)
        console.log(CartList)
    }

    
    return {CartList,addToCart}
}

export default CartArray;