function isEmpty (data) {
	if(data === undefined || !Object.keys(data).length ){
		return true
	}
	return false
}

function timeSincePosted(originalTimeStamp){
	//console.log(originalTimeStamp) 

	 return Math.floor((Date.now() - originalTimeStamp) / (1000 * 60 * 60)) + ' hours ago.'
}

module.exports = { isEmpty, timeSincePosted }