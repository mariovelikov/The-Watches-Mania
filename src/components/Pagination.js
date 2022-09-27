import './../stylesheet/Pagination.css'


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalPosts / postsPerPage); index++) {
        pageNumbers.push(index)
    }


    return (
        <ul className="pagination">
            {pageNumbers.map((number) => (
                <li key={number} className="pagination-item">
                    <span className='pagination-btn' onClick={(e) => paginate(number, e)}>{number}</span>
                </li>
            ))}
        </ul>)
}

export default Pagination