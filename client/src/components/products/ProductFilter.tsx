interface ProductFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function ProductFilter({ activeFilter, onFilterChange }: ProductFilterProps) {
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'pastries', label: 'Pastries' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'catering', label: 'Catering' },
  ]

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-4 py-2 rounded-full transition-colors
              ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}