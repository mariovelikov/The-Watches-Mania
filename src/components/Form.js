import { useLayoutEffect, useState } from "react";

const Form = ({ handlerSubmit, handlerChange, ad }) => {
    const [data, setData] = useState(ad)

    useLayoutEffect(() => {
        if (!data && !ad) {
            setData([])
        } else {
            setData(ad)
        }
    }, [])

    if (!data) {
        return (
            <h5>Loading...</h5>
        )
    }
    return (
        <form onSubmit={handlerSubmit}>

            {/* title */}
            <label htmlFor="title">Title</label>
            <input type='text' name="title" onChange={handlerChange} defaultValue={data[0]?.title}></input>

            {/* brand */}
            <label htmlFor="brand">Brand</label>
            <input type='text' name="brand" onChange={handlerChange} defaultValue={data[0]?.brand} ></input>

            {/* description */}
            <label htmlFor="description">Description</label>
            <input type='text' name="description" onChange={handlerChange} defaultValue={data[0]?.description}></input>

            {/* price */}
            <label htmlFor="price">Price</label>
            <input type='float' name="price" onChange={handlerChange} defaultValue={data[0]?.price}></input>

            {/* main image */}
            <label htmlFor="image">Main Image</label>
            <input type='file' name="image" onChange={handlerChange} defaultValue={data[0]?.image}></input>

            {/* images */}
            <label htmlFor="images">Additional Images</label>
            <input type='file' name="images" onChange={handlerChange} defaultValue={data[0]?.images} multiple></input>

            <button onClick={handlerSubmit}>Ok</button>
        </form>
    );
}

export default Form