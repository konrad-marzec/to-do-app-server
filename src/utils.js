import {
  escapeRegExp,
  orderBy as lodashOrderBy,
} from 'lodash';

export const filterByName = (collection, search) => {
  if (search) {
    const regex = new RegExp(escapeRegExp(search), 'gi');
    return collection.filter(element => regex.test(element.name))
  }

  return collection;
}

export const orderBy = (collection, direction, key = 'name') => {
  if (direction && Object.values(SORT_KEYS).indexOf(direction) >= 0) {
    return lodashOrderBy(collection, [key], [direction]);
  }

  return collection;
}

const SORT_KEYS = {
  NONE: undefined,
  DESC: 'desc',
  ASC: 'asc',
};
