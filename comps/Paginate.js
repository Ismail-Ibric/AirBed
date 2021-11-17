import { useState, useEffect } from "react"

function Paginate(props) {
  const { data, RenderComponent, title, pageLimit, dataLimit, redraw } = props;
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getStartIndex = () => {
    return currentPage * dataLimit - dataLimit;
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  function updateHearted(id, hearted) {
    console.log( "updateHearted  id hearted", id, hearted );
    data[id].hearted = hearted;
    setCurrentPage(currentPage);
  }

  function getIsHearted(id) {
    return data[id].hearted??false;
  }
  
  useEffect( () => {
    const startFrom = currentPage * dataLimit - dataLimit;
    redraw( startFrom );
  }, [currentPage])

  return (
    <div>
      <h1>{title}</h1>

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>
  
        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
  
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>

      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        { getPaginatedData().length > 0 ? 
          getPaginatedData().map((rec, idx) => {
          const item = {
            img: rec.fields.xl_picture_url,
            altimg: rec.fields.xl_picture_url ?? "https://a0.muscache.com/im/pictures/" + rec.fields.picture_url?.filename,
            loc: rec.fields.geolocation[0] + ", " + rec.fields.geolocation[1],
            title: rec.fields.name,
            desc: rec.fields.summary,
            star: rec.fields.star,
            price: rec.fields.price,
            total: rec.fields.total,
            country: rec.fields.country_code
          };
          
          return (
            <div className="dataItem" key={idx}>
              <RenderComponent record={item} id={getStartIndex(idx) + idx} updateHearted={updateHearted} getIsHearted={getIsHearted} />
            </div>
          )
        })
        : "No Additional Listings"
        }
      </div>
  
      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>
  
        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
  
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>


    </div>
  );
}

export default Paginate
