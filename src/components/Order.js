import '../stylesheet/Order.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { orderProducts } from "../store/reducers/productsSlice"
import { useNavigate } from 'react-router-dom'

const Checkouts = () => {
    const [state, setState] = useState({ products: JSON.parse(localStorage.getItem('products')) })
    const error = useSelector(state => state.ads.error)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    let redirect = useNavigate()
    const [finishOrder, setFinishOrder] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuthenticated === null) {
            redirect('../cart')
        } else {
            setQuantity()
        }
    }, [])

    const setQuantity = () => {
        const products = JSON.parse(localStorage.getItem('products'));

        for (let index in products) {

            if ('quantity' in products[index] === false) {
                products[index].quantity = "1"
            }
        }

        localStorage.setItem('products', JSON.stringify(products))
    }

    function handlerSubmit(e) {
        e.preventDefault()

        dispatch(orderProducts(state))

        setFinishOrder(true)
    }

    function handlerChange(e) {
        setState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    if (finishOrder) {
        return <>
            <FinishedOrder />
        </>
    }

    return (
        <>
            <p className='error none'>{error}</p>
            <div className='order-container'>
                <Form handlerSubmit={handlerSubmit} handlerChange={handlerChange} error={error} />
                <Products />
            </div>
        </>
    )
}

export default Checkouts


// FORM
const Form = ({ handlerSubmit, handlerChange, error }) => {

    return (
        <form className='address-form' onSubmit={handlerSubmit}>

            {/* email */}
            <input className={error ? 'border-red' : ''} type='email' placeholder='Email' name="email" onChange={handlerChange} required></input>

            {/* Country */}
            <input className={error ? 'border-red' : ''} type='text' placeholder='Country' name="country" onChange={handlerChange} required></input>

            {/* first name */}
            <input className={error ? 'border-red' : ''} type='text' placeholder='First Name' name="firstName" onChange={handlerChange} required></input>

            {/* last name */}
            <input className={error ? 'border-red' : ''} type='text' placeholder='Last Name' name="lastName" onChange={handlerChange} required></input>

            {/* street */}
            <input className={error ? 'border-red' : ''} type='street' placeholder='Street' name="street" onChange={handlerChange} required></input>

            {/* post code */}
            <input className={error ? 'border-red' : ''} type='text' placeholder='Post Code' name="postCode" onChange={handlerChange} required></input>

            <button className='order-cart--btn' onClick={handlerSubmit}>Finish</button>
        </form>
    )
}


// Products
const Products = () => {
    const data = JSON.parse(localStorage.getItem('products'))
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setPrice()
    })

    const setPrice = () => {
        if (data) {
            let total = 0
            for (let product of data) {
                total += product.quantity * product.price
            }
            setTotalPrice(total.toFixed(2))
        }
    }


    return (
        <>

            <div className='ordered-products'>
                {data?.map((el) => (
                    <div key={el.id} className="ordered-product-box">
                        <div className='order-img-box'>
                            <div className='quantity'>{el.quantity}</div>
                            <img src={`http://localhost:8000${el.image}`} alt="watch" />
                        </div>
                        <p className='ordered-product-title'>{el.title}</p>
                        <p className="ordered-product-quantity">{`Quantity: ${el.quantity}`} x {el.price} = <span>$ {(Number(el.quantity) * el.price).toFixed(2)}</span></p>
                    </div>
                ))}
            </div>
            <p className='ordered-product-total'>Total: <span>${totalPrice}</span></p>
        </>
    )
}

// when order is finished
const FinishedOrder = () => {
    const redirect = useNavigate()

    const returnToProducts = () => {
        redirect('/products')
    }

    return (
        <div className='finished-order'>
            <p>Your order is complete !</p>
            <p>Check your e-mail for details.</p>
            <ion-icon class="check-green" name="checkmark-circle"></ion-icon>
            <button onClick={() => returnToProducts()}>OK</button>
        </div>
    )
}
