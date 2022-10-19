import '../stylesheet/HomePage.css'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'

const StartPage = () => {
    const data = useSelector(state => state.ads.ads)
    const [topWatches, setTopWatches] = useState()

    useEffect(() => {
        let products = []

        const brands = ['rolex', 'citizen', 'tcm',]
        for (let brand of brands) {
            products.push(...data.filter(el => el.brand.toLowerCase() === brand))
        }

        setTopWatches(products)

    }, [data])

    return (
        <div className="home-page">
            <div className='home-page-container'>
                <div className='home-page-inner-container'>
                    <h1>The Watch Mania</h1>
                    <p>Your site for watches. Find your dream watch on our site.</p>
                    <Link className='products-btn' to="/products">PRODUCTS</Link>
                </div>
            </div>

            <h1 className='top-watches-title'>TOP WATCHES</h1>
            <div className='top-watches none'>
                {topWatches?.slice(0, 4).map(el => (
                    <div key={el.id} className="product-container">
                        <Link to={`/${el.id}/details`} className="product-link-container">
                            <div className="img-container">
                                <img src={`http://localhost:8000${el.image}`} alt="watch photo" />
                            </div>
                            <div className="text-container">
                                <p>{el.title}</p>
                                <p>$ {el.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default StartPage




/*
<div className='home-page-inner-container'>
                    <h5>HELLO home PAGE</h5>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error expedita esse quis distinctio officia maiores minus vel officiis id ut.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error expedita esse quis distinctio officia maiores minus vel officiis id ut.</p>
                    <Link className='products-btn' to="/products">PRODUCTS</Link>
                </div>
                 */





/*

<div className='top-watches'>
                {topWatches?.slice(0, 4).map(el => (
                    <div key={el.id} className="product-container">
                        <Link to={`/${el.id}/details`} className="product-link-container">
                            <div className="img-container">
                                <img src={`http://localhost:8000${el.image}`} alt="watch photo" />
                            </div>
                            <div className="text-container">
                                <p>{el.title}</p>
                                <p>$ {el.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>


*/