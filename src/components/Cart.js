import '../stylesheet/Cart.css'
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loadUser from '../store/actions/auth/loadUser'
import { editAd, fetchData, loadProductsInCart, removeFromCart } from "../store/reducers/productsSlice";


const Cart = () => {
    const [totalPrice, setTotalPrice] = useState()
    const products = localStorage.getItem('products')
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const productsInCart = useSelector(state => state.ads)
    const dispatch = useDispatch()
    const redirect = useNavigate()

    useLayoutEffect(() => {
        if (!isAuthenticated) {
            dispatch(loadUser())
        }

        if (productsInCart.status === 'idle') {
            dispatch(fetchData())
        }
    }, [])

    useEffect(() => {
        if (productsInCart.status === 'fulfilled') {

            // loop in localStorage and remove products if they don't exist in data base
            checkProducts()
        }

        dispatch(loadProductsInCart())

    }, [productsInCart.status])

    useEffect(() => {
        setPrice()
    }, [productsInCart.cart])

    const setPrice = () => {

        let total = 0
        for (let product of productsInCart.cart) {
            if ('quantity' in product) {
                total += Number(product.quantity) * product.price
            } else {
                total += 1 * product.price
            }
        }
        setTotalPrice(total.toFixed(2))
    }

    const changeTotalPrice = (price, event) => {
        let total = 0
        for (let product of productsInCart.cart) {
            total += product.price
        }
        total = total - (1 * price)

        total = total + (event.target.value * price)

        setTotalPrice(total.toFixed(2))

        setQuantity(event)
    }

    const setQuantity = (event) => {
        const products = JSON.parse(localStorage.getItem('products'));

        for (let index in products) {
            if (products[index].id === Number(event.target.id)) {
                products[index].quantity = event.target.value
            }
        }

        localStorage.setItem('products', JSON.stringify(products))
    }

    const checkProducts = () => {
        let arr = []

        // loop in localStorage and remove redundant products if they don't exist in data base
        if (products) {
            for (let product of JSON.parse(products)) {
                if (!productsInCart.ads.some(pr => pr.id === product.id)) {
                    arr.push(...JSON.parse(products))
                    arr.splice(product, 1)
                    localStorage.setItem('products', arr)
                }
            }
        }
    }

    const Buy = (e) => {
        if (!isAuthenticated) {
            redirect("/signin")
        } else {
            redirect("/order")
        }
    }

    const defaultValueQuantity = (product) => {
        if (JSON.parse(localStorage.getItem('products')).length) {
            const quantity = JSON.parse(localStorage.getItem('products')).find(el => el.id === product.id).quantity

            return quantity ? quantity : 1
        }
    }

    if (!productsInCart.cart || !productsInCart.cart.length) {
        return (
            <div className='empty-cart'>
                <p className='cart-title'>Cart</p>
                <p className='empty-cart-p'>Your cart is currently empty.</p>
                <Link to="/products ">Continue shoping</Link>
            </div>
        );
    }

    return (
        <>
            <p className='cart-title'>Cart</p>
            <div className='cart-products-container'>
                <table className='cart-table'>
                    <thead className='cart-table-head'>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsInCart.cart.map((product) => (
                            <tr className='cart-product' key={product.id}>
                                <th className='cart-image-box'><Link to={`/${product.id}/details`}><img src={`http://localhost:8000${product.image}`} alt="watch" /></Link></th>
                                <th className='cart-btn-title'> <p> {product.title}</p><button className='cart-remove-btn' onClick={() => dispatch(removeFromCart(product.id))}>Remove</button></th>
                                <th><input className='cart-quantity-input' id={product.id} onChange={(e) => changeTotalPrice(product.price, e)} type="number" defaultValue={defaultValueQuantity(product)} min='1' /></th>
                                <th><p className='cart-product-price'>$ {product.price}</p></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='cart-total'>
                    <p>Total: <span> $ {totalPrice}</span></p>
                    <button onClick={() => Buy()}>Buy</button>
                </div>
            </div>
        </>
    );
}

export default Cart