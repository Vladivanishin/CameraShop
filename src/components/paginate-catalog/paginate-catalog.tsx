import { useState } from 'react';
import Pagination from '../pagination/pagination';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog-process/selectors';
import Catalog from '../catalog/catalog';

export const PaginateCatalog = () => {
  const data = useAppSelector(getCameras);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const totalItems = data.length;

  const handlePageChange = (dataPage:{ selected: number }) => {
    setCurrentPage(dataPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <div data-testid='paginate-catalog'>
      <Catalog cameras={itemsToDisplay}/>
      <div className="pagination">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
