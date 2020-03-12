import React from "react";

const RestaurantListPagination = props => {
  return (
    <div className="pagination">
      <button
        onClick={e => {
          props.handleClick(e);
        }}
        type="button"
        value="-1"
        className="pagination__btn"
        disabled={!props.prevPageStatus}
      >
        &larr; Prev Page
      </button>
      <button
        onClick={e => {
          props.handleClick(e);
        }}
        type="button"
        value="1"
        className="pagination__btn"
        disabled={!props.nextPageStatus}
      >
        Next Page &rarr;
      </button>
    </div>
  );
};

export default RestaurantListPagination;
