"use client";

import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-9 w-9 rounded-md border border-[#ead7ce] ${
            page === currentPage
              ? "bg-[#8b4a2f] text-white"
              : "bg-white text-[#5f4338]"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 rounded-md border border-[#ead7ce] bg-white px-4 text-[#5f4338] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Next Page
      </button>
    </div>
  );
}
