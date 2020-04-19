import {updatetest} from './src/server/server.js';

test('server test check if one data update success', ()=>{

	const data = updatetest({name: 'New York'});
	expect(data).toEqual([{name: 'New York'}]);

})