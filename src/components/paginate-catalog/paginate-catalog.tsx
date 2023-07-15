import { SetStateAction, useState } from 'react';
import Pagination from '../pagination/pagination';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog-process/selectors';
import Catalog from '../catalog/catalog';
import { ITEMS_PER_PAGE } from '../../conts';

export const PaginateCatalog = () => {
  const cameras = useAppSelector(getCameras);
  const [currentPage, setCurrentPage] = useState(0);

  if (!currentPage) {
    setCurrentPage(1);
  }

  const pageCount = Math.ceil(cameras.length / ITEMS_PER_PAGE);

  const itemsToDisplay = cameras.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePagesChange = (number: SetStateAction<number>) => {
    setCurrentPage(number);
  };

  return (
    <div data-testid='paginate-catalog'>
      <Catalog cameras={itemsToDisplay}/>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePagesChange}
        />
      </div>
    </div>
  );
};
