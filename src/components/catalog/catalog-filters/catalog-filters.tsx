import FilterForm from '../../filters/filter-form/filter-form';

export default function CatalogFilters(): JSX.Element {
  return (
    <div className="catalog-filter" data-testid='catalog-filters'>
      <FilterForm />
    </div>
  );
}
