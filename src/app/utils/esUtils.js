// Elasticsearch utils
import clone from 'clone';
import ListTypes from '../common/constants/listTypes';
import FilterTypes from '../common/constants/filterTypes';

/**
 * Append extra filters into Elasticsearch Query DSL.
 * Assume the query has following structure:
 * ```
 *  {
 *    bool: {
 *      ...
 *      filter: [
 *        { term: { ... } }
 *        // will be appended at here
 *      ]
 *    }
 *  }
 * ```
 * 
 * @param {*} query   the query object in Elasticsearch Query DSL format
 * @param {*} filters filters to append
 */
const appendFilters = (query, filters) => {
  if (!(filters instanceof Array)) { filters = [filters] }
  query = clone(query);

  if (query.bool.filter) {
    query.bool.filter = [...query.bool.filter, ...filters];
  } else {
    query.bool.filter = [...filters];
  }
  return query;
};

const combineQueries = (query, listType, advFilters) => {
  let filters = [];
  if (listType === ListTypes.Phishing) {
    filters.push({ term: { 'initResult': true } });
  }
  if (listType === ListTypes.Normal) {
    filters.push({ term: { 'initResult': false } });
  }
  for (let [filterType, filterVal] of Object.entries(advFilters)) {
    if (filterVal === undefined || filterVal === null) { continue; }

    switch (filterType) {
      case FilterTypes.Marked:
        filters.push({ term: { 'marked': filterVal } });
        break;

      default:
        // nothing
    }
  }
  return appendFilters(query, filters);
};

export { appendFilters, combineQueries };
