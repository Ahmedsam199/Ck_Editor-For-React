import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "redux";
import Data from "./Data";
const reducerFN = combineReducers({ Data });
const persistConfig = {
  // Local Storage Name
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "4AM",
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
  whitelist: ["Data"],
};
// ///// /////////////////////
const persistedReducer = persistReducer(persistConfig, reducerFN);
// Export Them To The Index.js File
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
