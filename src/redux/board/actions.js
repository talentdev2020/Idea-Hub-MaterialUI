import {
  BOARD_GET_LIST,
  BOARD_GET_LIST_SUCCESS,
  BOARD_GET_LIST_ERROR,
  BOARD_GET_LIST_WITH_FILTER,
  BOARD_GET_LIST_WITH_ORDER,
  BOARD_GET_LIST_SEARCH,
  BOARD_ADD_ITEM,
  BOARD_ADD_ITEM_SUCCESS,
  BOARD_ADD_ITEM_ERROR,
  BOARD_EDIT_ITEM,
  BOARD_EDIT_ITEM_SUCCESS,
  BOARD_EDIT_ITEM_ERROR,
  BOARD_SELECTED_ITEMS_CHANGE
} from "../actions";



export const getBoardList = () => ({
  type: BOARD_GET_LIST
});

export const getBoardListSuccess = items => ({
  type: BOARD_GET_LIST_SUCCESS,
  payload: items
});

export const getBoardListError = error => ({
  type: BOARD_GET_LIST_ERROR,
  payload: error
});

export const getBoardListWithFilter = (column, value) => ({
  type: BOARD_GET_LIST_WITH_FILTER,
  payload: { column, value }
});

export const getBoardListWithOrder = column => ({
  type: BOARD_GET_LIST_WITH_ORDER,
  payload: column
});

export const getBoardListSearch = keyword => ({
  type: BOARD_GET_LIST_SEARCH,
  payload: keyword
});

export const addBoardItem = item => ({
  type: BOARD_ADD_ITEM,
  payload: item
});

export const addBoardItemSuccess = items => ({
  type: BOARD_ADD_ITEM_SUCCESS,
  payload: items
});

export const addBoardItemError = error => ({
  type: BOARD_ADD_ITEM_ERROR,
  payload: error
});
export const editBoardItem = item => ({
  type: BOARD_EDIT_ITEM,
  payload: item
});

export const editBoardItemSuccess = items => ({
  type: BOARD_EDIT_ITEM_SUCCESS,
  payload: items
});

export const editBoardItemError = error => ({
  type: BOARD_EDIT_ITEM_ERROR,
  payload: error
});
export const selectedBoardItemsChange = selectedItems => ({
  type: BOARD_SELECTED_ITEMS_CHANGE,
  payload: selectedItems
});
