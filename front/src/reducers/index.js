import { combineReducers } from 'redux'
import Event, {checkOutEvent, EventPayment} from './user.reducer';

export default combineReducers({
	Event,
	checkOutEvent,
	EventPayment
})