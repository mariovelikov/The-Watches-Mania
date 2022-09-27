import "swiper/css";
import "swiper/css/pagination";
import '../stylesheet/ProductDetails.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addToCart, fetchData, removeFromCart } from "../store/reducers/productsSlice"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";



const ProductDetails = () => {
    const { id } = useParams()
    const [renderedProduct, setRenderedProduct] = useState()
    const [allImages, setAllImgs] = useState([])
    const [activeThumb, setActiveThumb] = useState()
    const [btnExpression, setBtnExpression] = useState('Add to Cart')
    const data = useSelector(state => state.ads.ads)
    const dispatch = useDispatch()
    const product = data.filter(pr => pr?.id === Number(id));

    useEffect(() => {
        if (!renderedProduct && product[0]) {
            setRenderedProduct(product[0])
            checkProductInCart()
        }

        if (!renderedProduct && !product[0]) {
            dispatch(fetchData())
        }

    }, [data])

    useEffect(() => {
        // list of all images of the current product
        let imgs = []

        if (renderedProduct) {
            // first we need to push main photo because its separate from the others
            imgs.push(renderedProduct.image)

            // push all images in one list for the image slider
            for (let img of renderedProduct.images) {
                imgs.push(img.image)
            }
            setAllImgs(imgs)
        }
    }, [renderedProduct])

    const checkProductInCart = () => {
        if (localStorage.getItem('products')) {
            let data = JSON.parse(localStorage.getItem('products'))

            if (data.some(product => product.id === Number(id))) {
                setBtnExpression('Added to Cart')
            }
        }
    }

    const addProductToCart = () => {
        if (localStorage.getItem('products')) {
            let data = JSON.parse(localStorage.getItem('products'))
            if (data.length) {
                if (data.some(product => product.id === Number(id))) {
                    dispatch(removeFromCart(id))
                    setBtnExpression('Add to Cart')

                } else {
                    dispatch(addToCart(...product))
                    setBtnExpression('Added to Cart')
                }
            } else {
                dispatch(addToCart(...product))
                setBtnExpression('Added to Cart')
            }
        } else {
            dispatch(addToCart(...product))
            setBtnExpression('Added to Cart')
        }
    }

    if (!renderedProduct) {
        return (
            <h5>Loading...</h5>
        )
    }

    return (
        <article className="product-details-container">
            {/* rendered img */}
            <Swiper
                loop={true}
                spaceBetween={10}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{ swiper: activeThumb }}
                className="details-img-container">

                {allImages?.map((img, id) => (
                    <SwiperSlide key={id}><img src={`http://localhost:8000${img}`} alt='watch'></img></SwiperSlide>
                ))}
            </Swiper>

            <div className="product-details-simple-information">
                <p className="title">{renderedProduct?.title}</p>
                <div className="product-info">
                    <p><span>Price:</span> ${renderedProduct?.price} USD</p>
                    <p><span>Gender: </span>{renderedProduct?.gender}</p>
                    <p><span>Movement_type: </span>{renderedProduct?.movement_type}</p>
                </div>
                <button className="order-cart--btn" onClick={addProductToCart}>{btnExpression}</button>
            </div>

            {/* thumbs */}
            <Swiper
                onSwiper={setActiveThumb}
                loop={false}
                spaceBetween={10}
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
                slidesPerView={5}
                modules={[Navigation, Thumbs]}
                className="images-container">

                {allImages?.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="img-box">
                            <img src={`http://localhost:8000${img}`} alt='watch'></img>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="description-container">
                <p className="title">Description</p>
                <p>{renderedProduct?.description}</p>
            </div>
        </article >
    )
}


export default ProductDetails
