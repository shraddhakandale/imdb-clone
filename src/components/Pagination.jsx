import React from "react";

function Pagination({handlePrevious, handleNext, pageNo, totalPages}) {
  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center">
      <div onClick={handlePrevious} className="px-8 hover:cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="font-bold">{pageNo}</div>
      <div onClick={handleNext} className="px-8 hover:cursor-pointer">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
