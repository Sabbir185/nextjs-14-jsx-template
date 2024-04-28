import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CustomPagination = ({ data, setData }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => setData({ page: data?.page - 1 })}
        disabled={data?.page === 1}
        className={`text-sm border border-primary font-semibold h-8 flex items-center justify-center w-8 rounded-l ${
          data?.page === 1 ? "" : "hover:bg-primary hover:text-white"
        }`}
      >
        <FiChevronLeft />{" "}
      </button>
      <div className="flex">
        {Array.from({ length: data?.totalPages }, (_, i) => (
          <div
            onClick={() => setData({ page: i + 1 })}
            key={i}
            className={`cursor-pointer text-sm border border-primary mx-1 hover:bg-primary hover:!text-white text-primary font-semibold h-8 w-8 flex justify-center items-center ${
              data?.page === i + 1 ? "bg-primary !text-white" : ""
            }`}
          >
            <h>{i + 1}</h>
          </div>
        ))}
      </div>
      <button
        onClick={() => setData({ page: data?.page + 1 })}
        disabled={data?.page === data?.totalPages}
        className={`text-sm border border-primary font-semibold h-8 flex items-center justify-center w-8 rounded-r ${
          data?.page === data?.totalPages
            ? ""
            : "hover:bg-primary hover:text-white"
        }`}
      >
        {" "}
        <FiChevronRight />
      </button>
    </div>
  );
};

export default CustomPagination;
