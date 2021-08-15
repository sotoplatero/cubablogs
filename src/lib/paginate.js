export default (items, page = 1, per_page = 10) => {
	
 	page = parseInt(page)
  offset = (page - 1) * per_page,
 
  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page);

  return {
	  page: page,
	  per_page: per_page,
	  prev_page: page - 1 ? page - 1 : null,
	  next_page: (total_pages > page) ? page + 1 : null,
	  total: items.length,
	  total_pages: total_pages,
	  data: paginatedItems
  };
}