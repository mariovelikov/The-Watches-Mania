import '../stylesheet/LandingPage.css'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductsContainer from './ProductsContainer'

import Pagination from "./Pagination"

const LandingPage = () => {
    const data = useSelector(state => state.ads)
    const filteredProducts = useSelector(state => state.ads.filteredAds)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostsPerPage] = useState(30)

    useEffect(() => {
        if (isAuthenticated && data.favorites.length) {
            markFavorites()
        }
    }, [data.favorites, isAuthenticated, filteredProducts])


    // if product is in favorites heart = red
    function markFavorites() {
        const products = document.getElementsByClassName('product-container')

        Object.values(products).forEach(element => {
            const favorteProduct = data.favorites.find(el => el.productId == element.children[1].id)

            if (favorteProduct) {
                const product = document.getElementById(`${favorteProduct.productId}`)

                // name = heart - is fullfilled heart 
                product.name = "heart"

                // with color red
                product.style.color = 'red'
            }
        });
    }

    // PAGINATION
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = filteredProducts.length ? filteredProducts.slice(indexOfFirstPost, indexOfLastPost) : data.ads.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber, e) => {

        setTimeout(() => {
            markFavorites()
        }, 200)

        const btns = document.querySelectorAll('.pagination-btn')

        Object.values(btns).forEach(btn => {
            btn.className = 'pagination-btn'
        })

        e.target.className += ' active'

        setCurrentPage(pageNumber)
    }


    if (data.status === 'loading') {
        return (
            <h5>Loading</h5>
        )
    }

    return (
        <>
            <ProductsContainer data={currentPosts} />
            <Pagination totalPosts={filteredProducts.length ? filteredProducts.length : data.ads.length} postsPerPage={postPerPage} paginate={paginate} />
        </>
    )
}

export default LandingPage
