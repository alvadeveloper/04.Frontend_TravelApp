import './styles/main.css';

// date picker imports//
import 'jquery';
import './styles/daterangepicker.css';
import 'daterangepicker';
import './js/daterangepicker.js';

import {getDatesBetween, formatDate, rangecheck} from './js/dateHandler.js';


const input1 = document.getElementById('place');
const input2 = document.getElementById('nameoftrip');
const input3 = document.getElementById('daterange');
const entry = document.querySelector('.outputdata');


export const sendData = async (url ='', data={}) =>{

	try{

		const response = await fetch(url, {
	    method: 'POST', 
	    credentials: 'same-origin', 
	    headers: {
	        'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data),      
	  }).then(res => {
	    return data;
	  });

	}catch(e){
		console.log(e)
	}

}

export const getData = async(event) =>{

	event.preventDefault();

	try{	

        const data = await fetch('/getdata');
        const arraydata = data.json();
        const allarraydata = Promise.resolve(arraydata);

        // display the data in the array to HTML

        let displayArray = [];

        allarraydata.then(function(result){
            for (let arr of result){

            	// console.log(arr);

            	// list the dates between two dates

            	let arrDates = getDatesBetween(new Date(arr.datefrom0), new Date(arr.dateto0));

            	let arrSameDates = [];

            	// output data if in range

            	displayArray.push(`<div class="trip">`);

            	if (rangecheck(new Date(arr.datefrom)) === true) {

            	displayArray.push(`<div class="nameofthecity">${arr.cityname}</div><div>`);
                displayArray.push(`<div class="nameoftrip">${arr.nameoftrip}</div><div>`);

            	const dateTime = [
            						arr.datetime0,
            						arr.datetime1,
            						arr.datetime2,
            						arr.datetime3,
            						arr.datetime4,
            						arr.datetime5,
            						arr.datetime6,
            						arr.datetime7,
            						arr.datetime8,
            						arr.datetime9,
            						arr.datetime10,
            						arr.datetime11,
            						arr.datetime12,
            						arr.datetime13,
            						arr.datetime14,
            						arr.datetime15
            						]
            	const weatherTime = [

            						arr.weather0,
            						arr.weather1,
            						arr.weather2,
            						arr.weather3,
            						arr.weather4,
            						arr.weather5,
            						arr.weather6,
            						arr.weather7,
            						arr.weather8,
            						arr.weather9,
            						arr.weather10,
            						arr.weather11,
            						arr.weather12,
            						arr.weather13,
            						arr.weather14,
            						arr.weather15

            	]
            	
            	// Display the weather information if the data is available

            	arrDates.forEach((arrD, i) => {

            		displayArray.push(`<div class="dateTrip">${formatDate(arrD)}</div>`);
            		
            		//datetime0: "2020-04-13"

            		for (let j = 0; j < 15; j++){

            		
            		    let today = new Date();
                		today = new Date(today.getTime() + (j) * 24 * 60 * 60 * 1000);

            			if (arrD.getMonth()+ 1 == today.getMonth() +1 ){
            				if(arrD.getDate()== today.getDate()){
            				
				                	displayArray.push(`<div class="dateResult">${weatherTime[j+1]}</div>`);
            				} 
            				
            			} 
            		}
            	})
            	displayArray.push(`</div>`);
            	displayArray.push(`<div class="pic"><img src="${arr.picref}"></div></div>`);
                displayArray.push(`<br />`);
                console.log(displayArray)
            	entry.innerHTML = displayArray.join(" ")

            	}
 

            	// output data if not in range
            	if (rangecheck(new Date(arr.datefrom)) === false) {
            	displayArray.push(`<div class="nameofthecity">${arr.cityname}</div><div>`);
                displayArray.push(`<div class="nameoftrip">${arr.nameoftrip}</div><div>`);
                arrDates.forEach(arrD => {
                	displayArray.push(`<div class="dateTrip">${formatDate(arrD)}</div>`);
                	displayArray.push(`<div class="dateResult">No Weather Data</div>`);
                })
                displayArray.push(`</div>`);
                displayArray.push(`<div class="pic"><img src="${arr.picref}"></div></div>`);
                displayArray.push(`<br />`);
                entry.innerHTML = displayArray.join(" ")

            	}


            }
        })

	} catch(e){
		console.log(e);
	}

}

export const geosenddata = (event) =>{

	event.preventDefault();

	let placename = input1.value;
    let nameoftrip = input2.value;

	console.log(placename)

	sendData('/geodata', {placename, nameoftrip});

}

// Disable field if other field is null

	input2.disabled = true;
	input3.disabled = true;

	function activeField(fieldname1, fieldname2){
		fieldname1.addEventListener('input', ()=>{
			if (fieldname1 != '' || fieldname1.value.length != 0 ){fieldname2.disabled = false}
			if (fieldname1 == '' || fieldname1.value.length == 0 ){fieldname2.disabled = true}
		}) }

	activeField(input1, input2);
	activeField(input2, input3);

// run the two aysnc functions

export function sendAndGetData(event){
	event.preventDefault();
	geosenddata(event);
	setTimeout(function(){
            Client.getData(event);
    },5000);
};

export const 








