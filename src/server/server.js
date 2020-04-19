// Elementary Server Settings

var path = require('path')
const express = require('express')

const app = express()

const port = 8080;

app.use(express.static('dist'))

app.listen(8080);

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');

const fetch = require('node-fetch');

require('dotenv').config();

const APIKEY = process.env.APIKEY;

const PICAPIKEY = process.env.PICAPIKEY;

let alldata = [];

let pertripdata = {};

const dates = {
				startdate: '',
				enddate: ''
			   };

function updatedata(data){
	alldata.push(data);
}

export function updatetest(data){
	alldata.push(data);
	return alldata;
}

let lat = '';
let lng = '';

let lowtemp = ''
let maxtemp = ''
let datetime =''
let weather = ''



// Get Geoname data
// Get Weatherbit data

app.post('/geodata', async function(req, res){

	let placename = req.body.placename
	let nameoftrip = req.body.nameoftrip
	let asciiName = ''
	let countryName = ''


	let url = `http://api.geonames.org/searchJSON?style=full&maxRows=1&name_startsWith=${placename}&username=alhui`

	try{

		const request = await fetch(url);

		const rawdata = request.json();
	    const alldata = Promise.resolve(rawdata).then(
	    	data => {
	    		// First API to get the lat and lng of a place
	    		 asciiName = data.geonames[0].asciiName,
	    		 countryName = data.geonames[0].countryName,
	    		 lat = data.geonames[0].lat,	
	    		 lng = data.geonames[0].lng;
	    		// log result
	    		// console.log(`API 1: ${lat} ${lng}`);
	    		 return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${APIKEY}&lat=${lat}&lon=${lng}`)
	    		}).then(response =>{
	    			return response.json()
	    		}).then(data2 => {
	    		// Second API to get the weather result
					

	    			for(let i =0; i <= 15; i++){
	    				
	    				pertripdata['id'+i] = new Date();
	    				pertripdata['location'+i]= countryName;
	    				pertripdata['datefrom'+i]=dates['startdate'];
	    				pertripdata['dateto'+i]=dates['enddate'];
	    				pertripdata['lowtemp'+i] = data2['data'][i]['low_temp'];
	    				pertripdata['maxtemp'+i] = data2['data'][i]['max_temp'];
	    				pertripdata['datetime'+i] = data2['data'][i]['datetime'];
	    				pertripdata['weather'+i] = data2['data'][i]['weather']['description'];
	    				pertripdata['cityname'] = data2['city_name'];


	    			}


	    		
	    			

	    			return fetch(`https://pixabay.com/api/?key=${PICAPIKEY}&q=${countryName}&category=places&image_type=photo`)
	    		}).then(
	    			response =>{
	    				return response.json();
	    			}
	    		).then(
	    			data3 => {
	    				//get the data from pixabay
	    				let locationpic = data3['hits'][0]['webformatURL'];
	    				pertripdata['picref'] = locationpic;
	    				pertripdata['nameoftrip'] = nameoftrip;
 						
	    			}
	    		)
	    		} catch(err){
	    			// console.log(err);
	    		}
	   			

	    })

// send all result to the client 
app.get('/getdata', function (req, res){

	let savetrip = {...pertripdata}
	alldata.unshift(savetrip);
	console.log(alldata);
	res.send(alldata);

})


//get date
app.post('/dates', (req, res)=>{

	const datestart1 = req.body.start1;
	const dateend1 = req.body.end1;

	dates['startdate'] = datestart1;
	dates['enddate'] = dateend1;
})










