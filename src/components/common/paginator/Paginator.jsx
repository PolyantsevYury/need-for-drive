import React, { useState } from "react";
import "./Paginator.scss";
import nextPage from "../../../assets/images/icons/next_page_icon.svg";
import prevPage from "../../../assets/images/icons/prev_page_icon.svg";

const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 3,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  const lastPage = pages[pages.length - 1];
  return (
    <div className="paginator">
      {portionNumber > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          >
            <img className="arrow" src={prevPage} alt="" />
          </button>
          <button
            type="button"
            className={`pageNumber ${currentPage === 1 ? "selectedPage" : ""}`}
            key={1}
            onClick={() => {
              setPortionNumber(1);
              onPageChanged(1);
            }}
          >
            1
          </button>
          ...
        </>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <button
              type="button"
              className={`pageNumber ${
                currentPage === p ? "selectedPage" : ""
              }`}
              key={p}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {p}
            </button>
          );
        })}
      {portionCount > portionNumber && (
        <>
          ...
          <button
            type="button"
            className={`pageNumber ${
              currentPage === lastPage ? "selectedPage" : ""
            }`}
            key={lastPage}
            onClick={() => {
              setPortionNumber(portionCount);
              onPageChanged(lastPage);
            }}
          >
            {lastPage}
          </button>
          <button
            type="button"
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          >
            <img className="arrow" src={nextPage} alt="" />
          </button>
        </>
      )}
    </div>
  );
};

export default Paginator;
