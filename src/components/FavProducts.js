import '../stylesheet/FavProducts.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import checkToken from "../store/actions/auth/checkToken"
import loadUser from "../store/actions/auth/loadUser"
import { fetchData, getFavoritesProducts } from "../store/reducers/productsSlice"
import ProductComponent from "./ProductComponent"
import { Link } from 'react-router-dom'


const FavProducts = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const userId = useSelector(state => state.auth.user?.id)
    const allProducts = useSelector(state => state.ads.ads)
    const favProductsIds = useSelector(state => state.ads.favorites) // here we have ids of favorite profucts from API
    const [RenderedProducts, setProducts] = useState([]) // loaded products
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(checkToken())
            dispatch(loadUser())
        } else {
            if (!favProductsIds[0] && !allProducts[0]) {

                // check if already have products because will duplicate the same products
                dispatch(getFavoritesProducts(userId))
                dispatch(fetchData())
            }
            else {
                if (allProducts.length) {
                    loopData()
                }
            }
        }
    }, [isAuthenticated, favProductsIds, allProducts])

    useEffect(() => {
        markFavorites()
    }, [RenderedProducts])

    function loopData() {
        setProducts([])

        // get id of fav products, filter and put them to the 'products' state !  
        for (let id of favProductsIds) {
            const pr = allProducts.filter(product => product.id === id.productId)
            setProducts(prev => ([
                ...prev,
                pr[0]
            ]))
        }
    }

    function markFavorites() {
        const products = document.getElementsByClassName('product-container')

        Object.values(products).forEach(element => {

            element.children[1].name = "heart"
            element.children[1].style.color = 'red'
        })
    }

    if (!RenderedProducts.length) {
        return (
            <div className='continue-shopping'>
                <p> YOU DON'T HAVE FAVORITES PRODUCTS</p>
                <Link to="/">Continue Shopping</Link>
            </div>
        )
    }

    return (
        <>
            <h3 className="favorite-products-title">FAVORITE PRODUCTS</h3>
            <div className="favorite-products-section grid--4cols">
                {RenderedProducts?.map((e) => (
                    <ProductComponent e={e} key={e.id} />
                ))
                }

            </div>
        </>
    )
}

export default FavProducts