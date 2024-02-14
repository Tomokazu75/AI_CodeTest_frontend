import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <li
        key={i}
        onClick={() => onPageChange(i)}
        className={`flex items-center justify-center px-3 h-8 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
          i === currentPage &&
          "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
        }`}
      >
        {i}
      </li>
    );
  }

  return (
    <div className="text-right">
      <ul className="inline-flex -space-x-1 text-sm mr-4">
        <li
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center px-3 h-8 leading-tight cursor-pointer text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <SlArrowLeft />
        </li>
        {pageNumbers}
        <li onClick={() => onPageChange(currentPage + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
          <SlArrowRight />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
