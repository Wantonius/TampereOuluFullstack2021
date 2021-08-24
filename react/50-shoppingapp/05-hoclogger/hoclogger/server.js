const express = require("express");
const mongoose = require("mongoose");
const logitem = require("./models/logitem");

let app = express();

app.use(express.json());

const mongo_user = process.env.MONGOCLOUD_USER;
const mongo_password = process.env.MONGOCLOUD_PASSWORD;
const mongo_url = process.env.MONGOCLOUD_URL;

mongoose.connect("mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/hoclogger?retryWrites=true&w=majority").then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB, reason:"+error)
)

app.get("/hoclog",function(req,res) {
	let query = {};
	if(req.query.severity) {
		query["severity"] = req.query.severity
	}
	if(req.query.date) {
		query["date"] = {"$gte":req.query.date}
	}
	logitem.find(query,function(err,items) {
		if(err) {
			console.log("Failed to query for logs. Reason:",err);
			return res.status(500).json({message:"database error"})
		}
		return res.status(200).json(items);
	})
})

app.post("/hoclog",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"incomplete log"})
	}
	if(!req.body.severity) {
		return res.status(422).json({message:"incomplete log"})
	}
	let now = Date.now();
	let templog = new logitem({
		severity:req.body.severity,
		tag:req.body.tag,
		desc:req.body.desc,
		date:now
	})
	templog.save(function(err) {
		if(err) {
			console.log("Failed to save log. Reason:",err);
			return res.status(500).json({message:"database error"})
		}
		return res.status(201).json({message:"logged!"});		
	})
})

app.listen(3002);
console.log("Running in port 3002");