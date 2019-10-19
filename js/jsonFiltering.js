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
		]
	},
	aId: 2342
}

const inclusion = ["p.pid", "p.items.itemId", "aId"];
const levelFilterParam = [];

let maxLevelInclusionLength = inclusion.reduce((acc,incl) => Math.max(acc,incl.split(".").length) , 0);
let inclusionFilter = inclusion.map(ele => ele.split("."));
/* inclusionFilter
	[
	["p","pid"],
	["P", "items", "itemId"]
	["aId"]
	]
*/
let inclusionLevelFilter = [];
for(let level=0; level < maxLevelInclusionLength; level++ ){
	inclusionLevelFilter[level] = [];
	for(let i =0;i < inclusionFilter.length; i++){
		inclusionLevelFilter[level].push(inclusionFilter[i][level]);	
	}
	inclusionLevelFilter[level] = [...new Set(inclusionLevelFilter[level])];
}

/* inclusionLevelFilter
	[
	["p", "aId"], // level 1 filter
	["pid", "items"] // level 2 filter
	["itemId"] // level 3 filter
	]
*/

function getResultJson(json, filter, level){
	let result = {};
	if( level  >= filter.length || typeof json !== "object"){
		return json;
	}
	
	if(typeof json === "object"){
		
		for(let i=0; i<filter[level].length; i++){
			result[filter[level][i]] = getResultJson(json[filter[level][i]], filter, level+1);
			}
	}
	
	if(Array.isArray(json)){
		result = [];
		for(var i=0;i< json.length;i++){
			result[i]= getResultJson(json[i], filter, level);
		}	
	}
	
	return result;
}

console.log(JSON.stringify(getResultJson(json, inclusionLevelFilter, 0)));
