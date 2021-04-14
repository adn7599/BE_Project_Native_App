import {useState} from 'react';

const GlobalVariable = () =>{
    const [CartList,setCartList] = useState([]);
    //var [Order,setOrder] = useState([]);
    let [TotalAmount,setTotalAmount] = useState(0);
    let [UserType,setUserType] = useState('Customer');


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

    const setUser = (User) =>{
        const user = User
        console.log(user)
        console.log(typeof(user))
        setUserType(UserType = user)
        console.log(UserType);
    }

    
    return {CartList,addToCart,TotalAmount,changeTotal,UserType,setUser}
}

export default GlobalVariable;