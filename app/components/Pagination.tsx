import { Link } from "react-router";
import { getVisiblePages } from "~/lib/pagination";
import { buildProductsUrl } from "~/lib/url";

type Props = {
  currentPage: number;
  totalPages: number;
  category: string;
  sort: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  category,
  sort,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav className="pagination" aria-label="Pagination">
      {isFirstPage ? (
        <span
          className="pagination__arrow is-disabled"
          aria-disabled="true"
          aria-label="Previous page unavailable"
        >
          ‹
        </span>
      ) : (
        <Link
          to={buildProductsUrl({
            page: currentPage - 1,
            category,
            sort,
          })}
          className="pagination__arrow"
          aria-label="Go to previous page"
        >
          ‹
        </Link>
      )}

      <div className="pagination__pages">
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="pagination__ellipsis"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              to={buildProductsUrl({
                page,
                category,
                sort,
              })}
              className={`pagination__page ${page === currentPage ? "is-active" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={
                page === currentPage
                  ? `Current page, page ${page}`
                  : `Go to page ${page}`
              }
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {isLastPage ? (
        <span
          className="pagination__arrow is-disabled"
          aria-disabled="true"
          aria-label="Next page unavailable"
        >
          ›
        </span>
      ) : (
        <Link
          to={buildProductsUrl({
            page: currentPage + 1,
            category,
            sort,
          })}
          className="pagination__arrow"
          aria-label="Go to next page"
        >
          ›
        </Link>
      )}
    </nav>
  );
}