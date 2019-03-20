import { ADD_EVENT, ADD_PAYMENT, DELETE_PROMO } from './reducer.types';
import lodash from 'lodash';

const Event = (state = {}, action) => {
  	switch (action.type) {
        case 'ADD_EVENT':		  
		  return action.data;
      	default:
          	return state;
	  }
}

export const checkOutEvent = (state = {}, action) => {
	switch (action.type) {
	  case 'ADD_CHECKOUT':
		return  action.data;
		case 'DELETE_PROMO':
			delete state.totalAfterDiscount
			return {...state, discountAmount: 0,}
		default:
			return state;
	}
}

export const EventPayment = (state = {}, action) => {
	switch (action.type) {
	  case 'ADD_PAYMENT':
		return  action.data;
	  default:
	    return state;
	}
}

export default Event;