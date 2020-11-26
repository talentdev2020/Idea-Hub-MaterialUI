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

const INIT_STATE = {
  allBoardItems: null,
  boardItems: null,
  error: "",
   filter: null,
  searchKeyword: "",
  orderColumn: null,
  loading: false,
  orderColumns: [
    { column: "title", label: "Title" },
    { column: "status", label: "Status" },
    { column: "createDate", label: "Last Updated" }
  ],
  selectedItems: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case BOARD_GET_LIST:
      return { ...state, loading: false };
    

    case BOARD_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allBoardItems: action.payload,
        boardItems: action.payload
      };

    case BOARD_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case BOARD_GET_LIST_WITH_FILTER:
      
      if (action.payload.column === "" || action.payload.value === "") {
        return {
          ...state,
          loading: true,
          boardItems: state.allBoardItems,
          filter: null
        };
      } else {
        const filteredItems = state.allBoardItems.filter(
          item => item[action.payload.column] === action.payload.value
        );
         return {
          ...state,
          loading: true,
          boardItems: filteredItems,
          filter: {
            column: action.payload.column,
            value: action.payload.value
          }
        };
      }

    case BOARD_GET_LIST_WITH_ORDER:
      if (action.payload === "") {
        return {
          ...state,
          loading: true,
          boardItems: state.BoardItems,
          orderColumn: null
        };
      } else {
        const sortedItems = state.boardItems.sort((a, b) => {
          if (a[action.payload] < b[action.payload]) return -1;
          else if (a[action.payload] > b[action.payload]) return 1;
          return 0;
        });
        return {
          ...state,
          loading: true,
          boardItems: sortedItems,
          orderColumn: state.orderColumns.find(x => x.column === action.payload)
        };
      }

    case BOARD_GET_LIST_SEARCH:
      if (action.payload === "") {
        return { ...state, boardItems: state.allBoardItems };
      } else {
        const keyword = action.payload.toLowerCase();
        const searchItems = state.allBoardItems.filter(
          item =>
            item.title.toLowerCase().indexOf(keyword) > -1
            
        );
        return {
          ...state,
          loading: true,
          boardItems: searchItems,
          searchKeyword: action.payload
        };
      }

    case BOARD_ADD_ITEM:
      return { ...state, loading: false };

    case BOARD_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allBoardItems: [
          action.payload,
          ...state.allBoardItems
        ],
        boardItems: [action.payload,...state.boardItems]
      };

    case BOARD_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };
    case BOARD_EDIT_ITEM:
        return { ...state, loading: false };
  
    case BOARD_EDIT_ITEM_SUCCESS:
        let t_allBoardItems;
        t_allBoardItems = state.allBoardItems.map(item=>{
          if(item.id === action.payload.id)
            {
              return action.payload;
            }
          return item;
        })
        let t_boardItems ;
        t_boardItems = state.boardItems.map(item=>{
          if(item.id ===action.payload.id)
          return action.payload;
          return item;
        })
        return {
          ...state,
          loading: true,
          allBoardItems:t_allBoardItems,
          boardItems: t_boardItems
        };
  
    case BOARD_EDIT_ITEM_ERROR:
        return { ...state, loading: true, error: action.payload };
    case BOARD_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
