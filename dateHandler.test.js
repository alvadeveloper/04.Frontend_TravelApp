import {rangecheck, getDatesBetween} from './src/client/js/dateHandler.js';


test('return true if it is a date', ()=>{

	const date = rangecheck('2020-10-20')
	expect(date).toBe(true);

})

