import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { PaginationType } from "../../../../types/components/layouts/admin/dashboard";

const Pagination: React.FC<PaginationType> = ({
  totalPages = 7,
  currentPage = 1,
  rowsPerPage = 10,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rowOptions = [10, 25, 50, 100];

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleRowsChange = (rows: number) => {
    onRowsPerPageChange(rows);
    setIsDropdownOpen(false);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between w-full bg-gray-50 px-4 py-3 border-t border-gray-200">

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700 font-medium">Show</span>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex text-foreground-black items-center justify-between w-16 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <span>{rowsPerPage}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mt-1 w-16 bg-white border border-gray-200 rounded shadow-lg z-10">
              {rowOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleRowsChange(option)}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 focus:bg-gray-50 text-foreground-black focus:outline-none"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-700 font-medium">Rows</span>
      </div>


      <div className="flex items-center space-x-1">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {visiblePages.map((page, index) => {
          const isCurrentPage = page === currentPage;

          return (
            <React.Fragment key={page}>
              {index === 0 && page > 1 && (
                <>
                  <button
                    onClick={() => handlePageClick(1)}
                    className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                  >
                    1
                  </button>
                  {page > 2 && (
                    <span className="px-2 py-2 text-sm text-gray-500">...</span>
                  )}
                </>
              )}

              <button
                onClick={() => handlePageClick(page)}
                className={`px-3 py-2 text-sm rounded ${
                  isCurrentPage
                    ? "bg-orange-500 text-white font-medium"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>

              {index === visiblePages.length - 1 && page < totalPages && (
                <>
                  {page < totalPages - 1 && (
                    <span className="px-2 py-2 text-sm text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => handlePageClick(totalPages)}
                    className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </React.Fragment>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
