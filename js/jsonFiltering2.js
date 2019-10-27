// your code goes here

const json = {
	p: {
		pid: 123,
		items:[ 
		{
			itemId: 1,
			itemValue: 23,
			itemK: 20
		},
		{
			itemId: 2,
			itemValue: 34,
			itemK: 30
		}
		],
		soldItems: [ 
		{
			itemId: 1,
			itemValue: 23,
			itemK: 20
		},
		{
			itemId: 2,
			itemValue: 34,
			itemK: 30
		}
		]
	},
	aId: 2342
}

const inclusion = ["p.pid", "p.items.itemId", "aId","p.soldItems.itemK"];
const levelFilterParam = [];
const maxLevelInclusionLength = inclusion.reduce((acc,incl) => Math.max(acc,incl.split(".").length) , 0);
const inclusionObjFilter= {};

for(const filter of inclusion){
	let currentLevelFilter = inclusionObjFilter;
	for(const key of filter.split(".")){
		if(!inclusionObjFilter.hasOwnProperty(key)){
			currentLevelFilter[key]={};
		}
		currentLevelFilter = currentLevelFilter[key];
	}
}
/*
inclusionObjFilter = {"p":{"pid":{},"items":{"itemId":{}},"soldItems":{"itemK":{}}},"aId":{}}
*/
function getResultJson(json, filter){
	let result = {};
	if( !filter || typeof json !== "object"){
		return json;
	}
	
	let levelFilter = Object.keys(filter);
	
	if(typeof json === "object"){
		
		for(let i=0; i<levelFilter.length; i++){
			result[levelFilter[i]] = getResultJson(json[levelFilter[i]], filter[levelFilter[i]]);
			}
	}
	
	if(Array.isArray(json)){
		result = [];
		for(var i=0;i< json.length;i++){
			result[i]= getResultJson(json[i], filter);
		}	
	}
	
	return result;
}

console.log(JSON.stringify(getResultJson(json, inclusionObjFilter)));
