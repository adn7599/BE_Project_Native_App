import {useState} from 'react';

const CartArray = () =>{
    var [CartList,setCartList] = useState([]);
    //var [Order,setOrder] = useState([]);
    var [TotalAmount,setTotalAmount] = useState(0);


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

    const changeTotal = (newPrice) =>{
        const price = newPrice
        console.log(typeof(price))
        setTotalAmount(TotalAmount = TotalAmount +parseInt( price))
        console.log(TotalAmount);
    }

    
    return {CartList,addToCart,TotalAmount,changeTotal}
}

export default CartArray;