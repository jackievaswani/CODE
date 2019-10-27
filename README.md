# CODE
Repo Description: Some random problems & their solutions

Problem 1 - n level deep filtering in json

<b>Input:</b>

json = {
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


inclusionFilter = ["p.pid", "p.items.itemId", "aId"];  // add only mentioned keys in output json <br/>

<b>Output:</b>
{"p":{"pid":123,"items":[{"itemId":1},{"itemId":2}]},"aId":2342}


CODE : https://ideone.com/dZm6or <br/>
PATH : js/jsonFiltering.js

<b>Known Bugs</b>
1. When 2 sibling json having same key values & included in filter-<br/>
<b>Input: </b> {
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

<b>Inclusion filter: </b> ["p.pid", "p.items.itemId", "aId","p.soldItems.itemK"]

<b>Output: </b> {"p":{"pid":123,"items":[{"itemId":1,"itemK":20},{"itemId":2,"itemK":30}],"soldItems":[{"itemId":1,"itemK":20},{"itemId":2,"itemK":30}]},"aId":2342}

