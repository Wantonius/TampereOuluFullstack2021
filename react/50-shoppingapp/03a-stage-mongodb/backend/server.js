const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001

const mongo_user = process.env.MONGOCLOUD_USER;
const mongo_password = process.env.MONGOCLOUD_PASSWORD;
const mongo_url = process.env.MONGOCLOUD_URL;

mongoose.connect("mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/toshopping?retryWrites=true&w=majority").then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB, reason:"+error)
)

let time_to_live_diff = 3600000;

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"forbidden"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			let now = Date.now();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"forbidden"});
			}
			loggedSessions[i].ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = loggedSessions[i].user;
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"});
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request 1"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request 2"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request 3"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad request 4"});
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		});
		user.save(function(err,user) {
			if(err) {
				console.log("Failed to register new user. Reason:"+err)
				if(err.code === 11000) {
					return res.status(409).json({message:"Username is already in use"})
				}
				return res.status(500).json({message:"Internal server error"});
			}
			if(!user) {
				return res.status(500).json({message:"Internal server error"});
			}
			return res.status(201).json({message:"User registered"});
		})		
	})
});

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request 1"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request 2"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request 3"});
	}
	userModel.findOne({"username":req.body.username}, function(err,user) {
		if(err) {
			console.log("Failed in finding user. Reason:"+err)
			return res.status(500).json({message:"Internal server error"})
		}
		if(!user) {
			return res.status(401).json({message:"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log("Comparing passwords failed. Reason:",err)
				return res.status(500).json({message:"Internal server error"})
			}
			if(!success) {
				return res.status(401).json({message:"Unauthorized"});
			}
		})
	})
});

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"not found"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"logged out!"})
		}
	}
	return res.status(404).json({message:"not found"});
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port "+port);