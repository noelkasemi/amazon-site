//Sorting function
const sortFunctions = {
    default: (a, b) => a.id - b.id,
    asc: (a, b) => a.price - b.price,
    desc: (a, b) => b.price - a.price,
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };

  //Values for the options in the sort feature
  const priceOptions = [
    { label: "Default", value: "default" },
    { label: "Price (Low to High)", value: "asc" },
    { label: "Price (High to Low)", value: "desc" },
  ];

  const titleOptions = [
    { label: "Default", value: "default" },
    { label: "Title (A-Z)", value: "titleAsc" },
    { label: "Title (Z-A)", value: "titleDesc" },
  ];

  //Sorts products from the lowest price to the highest and vice versa
  const handleSortPriceChange = (selectedSort, products, setSortOrderPrice, setSortedProducts) => {
    setSortOrderPrice(selectedSort);
  
    if (sortFunctions.hasOwnProperty(selectedSort)) {
      const sortingFunction = sortFunctions[selectedSort];
      const sortedItems = [...products].sort(sortingFunction);
      setSortedProducts(sortedItems);
    }
  };

  //Sorts products in alphabetical order from a-z and z-a
  const handleSortTitleChange = (selectedSort, products, setSortOrderTitle, setSortedProducts) => {
    setSortOrderTitle(selectedSort);
  
    if (sortFunctions.hasOwnProperty(selectedSort)) {
      const sortingFunction = sortFunctions[selectedSort];
      const sortedItems = [...products].sort(sortingFunction);
      setSortedProducts(sortedItems);
    }
  };


  export { priceOptions, titleOptions, handleSortPriceChange, handleSortTitleChange}