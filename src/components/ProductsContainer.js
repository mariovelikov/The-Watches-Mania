import React from 'react'
import FilterMenu from "./FilterMenu"
import ProductComponent from "./ProductComponent"

function ProductsContainer({ data }) {
    return (
        <div className="container">
            <section className="filter filter-section">
                <FilterMenu />
            </section>
            <section className="products-section grid--4cols">
                {data.map((e) => (
                    <ProductComponent e={e} key={e.id} />
                ))}
            </section>
        </div>
    )
}

export default ProductsContainer