var mapFunction = function() {
	emit(this.custID,this.price);
}

var reduceFunction = function(keyCustID,valuesPrice) {
	return Array.sum(valuesPrice);
}

var conn = new Mongo();
var db = conn.getDB("tomapreduce");

db.data.mapReduce(mapFunction,reduceFunction, {out:"results"});