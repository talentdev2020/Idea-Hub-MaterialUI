import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../helpers/Utils";

import { BOARD_GET_LIST, BOARD_ADD_ITEM, BOARD_EDIT_ITEM } from "../actions";

import {
  getBoardListSuccess,
  getBoardListError,
  addBoardItemSuccess,
  addBoardItemError,
  editBoardItemSuccess,
  editBoardItemError
} from "./actions";
import { store } from "../../helpers/Firebase";

const getBoardListRequest = async () => {
  let boards = await store
    .collection("boards")
    .get()
    .then(querySnapshot => {
      let result = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      if (result.length === 0) return [];
      else return result;
    });

  return boards;
};

function* getBoardListItems() {
  try {
    const response = yield call(getBoardListRequest);
    yield put(getBoardListSuccess(response));
  } catch (error) {
    yield put(getBoardListError(error));
  }
}

const addBoardItemRequest = async item => {
  //let items = BOARDData.data;
  item.createDate = getDateWithFormat();
  item.updateDate = getDateWithFormat();
 // items.splice(0, 0, item);
  await store.collection("boards").add(item);
 
  return item;
};

function* addBoardItem({ payload }) {
  try {
    const response = yield call(addBoardItemRequest, payload);
    yield put(addBoardItemSuccess(response));
  } catch (error) {
    yield put(addBoardItemError(error));
  }
}
const editBoardItemRequest = async item => {
 
  item.updateDate = getDateWithFormat();
   let board_collection = store.collection('boards').doc(item.id);
  var data = Object.assign({}, item);
  delete data.id; 
  
  board_collection.get().then(function(thisdoc){
     if(thisdoc.exists){
      board_collection.update(data);
      }
   })
  return item;
};

function* editBoardItem({ payload }) {
   try {
    const response = yield call(editBoardItemRequest, payload);
    yield put(editBoardItemSuccess(response));
  } catch (error) {
    yield put(editBoardItemError(error));
  }
}
export function* watchGetList() {
  yield takeEvery(BOARD_GET_LIST, getBoardListItems);
}

export function* wathcAddItem() {
  yield takeEvery(BOARD_ADD_ITEM, addBoardItem);
}

export function* wathcEditItem() {
  yield takeEvery(BOARD_EDIT_ITEM, editBoardItem);
}
export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem),fork(wathcEditItem)]);
}
