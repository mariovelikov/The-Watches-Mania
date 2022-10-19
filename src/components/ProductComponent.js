import '../stylesheet/ProductComponent.css'
import { Link, useNavigate } from "react-router-dom"
import addProductToFavorites from "../store/actions/ads/addProductToFavorites"
import removeProductFromFavorites from "../store/actions/ads/removeProductFromFavorites"
import { useDispatch, useSelector } from "react-redux"


const ProductComponent = ({ e }) => {
    const data = useSelector(state => state.ads)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const redirect = useNavigate()


    const addToFavorites = (id, event) => {
        if (!isAuthenticated) {
            redirect('/signin')
        } else {
            if (checkProduct(id)) {
                event.target.name = 'heart-outline'
                event.target.style.color = "#333"

                const data = { productId: id }
                dispatch(removeProductFromFavorites(data))
            } else {
                event.target.name = 'heart'
                event.target.style.color = 'red'

                const data = { productId: id }
                dispatch(addProductToFavorites(data))
            }
        }
    }

    // check if product exists in favorites
    const checkProduct = (id) => {
        for (let x of data.favorites) {
            if (x.productId === id) {
                return true
            }
        }
    }

    return (
        <div key={e.id} className="product-container">
            <Link to={`/${e.id}/details`} className="product-link-container">
                <div className="img-container">
                    <img src={`http://localhost:8000${e.image}`} alt="watch photo" />
                </div>
                <div className="text-container">
                    <h1>{e.title}</h1>
                    <p>$ {e.price}</p>
                </div>
            </Link>

            <ion-icon name="heart-outline" class="heart-icon" id={e.id} onClick={(event) => { addToFavorites(e.id, event) }}></ion-icon>
        </div>
    )
}

export default ProductComponent