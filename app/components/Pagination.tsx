import { Link } from "react-router";
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

  return (
    <nav className="pagination" aria-label="Products pagination">
      <Link
        className={`pagination__button ${currentPage === 1 ? "pagination__button--disabled" : ""}`}
        to={buildProductsUrl({
          page: currentPage - 1,
          category,
          sort,
        })}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        ← Previous
      </Link>

      <div className="pagination__pages">
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis">
              …
            </span>
          ) : (
            <Link
              key={page}
              className={`pagination__page ${page === currentPage ? "pagination__page--active" : ""}`}
              to={buildProductsUrl({
                page,
                category,
                sort,
              })}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <Link
        className={`pagination__button ${currentPage === totalPages ? "pagination__button--disabled" : ""}`}
        to={buildProductsUrl({
          page: currentPage + 1,
          category,
          sort,
        })}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        Next →
      </Link>
    </nav>
  );
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages: Array<number | "ellipsis"> = [];

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}