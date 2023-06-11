import ReactPaginate from 'react-paginate';

type PaginationProps = {
  itemsPerPage : number;
  totalItems : number;
  onPageChange: (dataPage: { selected: number }) => void;
}

export default function Pagination ({itemsPerPage, totalItems, onPageChange}: PaginationProps) : JSX.Element {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  return (
    <ReactPaginate
      previousLabel={'Назад'}
      nextLabel={'Далее'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={'pagination__list'}
      activeLinkClassName={'pagination__link--active'}
      pageClassName={'pagination__item'}
      pageLinkClassName={'pagination__link'}
      previousClassName={'pagination__item'}
      nextClassName={'pagination__item'}
      previousLinkClassName={'pagination__link pagination__link--text'}
      nextLinkClassName={'pagination__link pagination__link--text'}
      disabledClassName={'visually-hidden'}
    />
  );
}
