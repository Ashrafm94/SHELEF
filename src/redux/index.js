import {createStore, combineReducers} from 'redux';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    cartReducer
});

const configureStore = () => createStore(rootReducer);
export default configureStore;



