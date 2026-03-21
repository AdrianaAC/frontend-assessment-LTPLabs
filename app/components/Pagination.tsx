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
    <nav className="pagination" aria-label="Pagination">
      <Link
        to={buildProductsUrl({
          page: currentPage - 1,
          category,
          sort,
        })}
        className={`pagination__arrow ${currentPage === 1 ? "is-disabled" : ""}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        ‹
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
              to={buildProductsUrl({
                page,
                category,
                sort,
              })}
              className={`pagination__page ${page === currentPage ? "is-active" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <Link
        to={buildProductsUrl({
          page: currentPage + 1,
          category,
          sort,
        })}
        className={`pagination__arrow ${currentPage === totalPages ? "is-disabled" : ""}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        ›
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
