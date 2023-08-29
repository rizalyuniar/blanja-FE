import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import { productReducer } from './productsReducer';

const rootReducer = combineReducers({
    auth: userReducer,
    product: productReducer,
});

export default rootReducer