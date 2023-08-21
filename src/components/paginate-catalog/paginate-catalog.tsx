// import { useState } from 'react';
// import Pagination from '../pagination/pagination';
// import { ITEMS_PER_PAGE } from '../../conts';
// import { Cameras } from '../../types/catalog';
// import CardList from '../product/card-list/card-list';

// type PaginateCatalogProps = {
//   cameras: Cameras;
// }

// export const PaginateCatalog = ({cameras}: PaginateCatalogProps) => {
//   const [currentPage, setCurrentPage] = useState(0);

//   if (!currentPage) {
//     setCurrentPage(1);
//   }

//   const pageCount = Math.ceil(cameras.length / ITEMS_PER_PAGE);

//   const itemsToDisplay = cameras.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//   // const handlePagesChange = (number: SetStateAction<number>) => {
//   //   setCurrentPage(number);
//   // };

//   return (
//     <div data-testid='paginate-catalog'>
//       <CardList cameras={itemsToDisplay}/>
//       <div className="pagination">
//         <Pagination
//           currentPage={currentPage}
//           pageCount={pageCount}
//           // onPageChange={handlePagesChange}
//         />
//       </div>
//     </div>
//   );
// };
