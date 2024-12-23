// VWorksExtLib follows
// Mauro A. Cremonini - Agilent Technologies
// (Credits where credit is due.)

// ======================== FUNCTIONS FOR ARRAYS ===============================

// isArray returns true or false
// if the passed argument is an array
function isArray(a) {
	return Object.prototype.toString.call(a) === "[object Array]";
}

// isWSArray returns true if the passed argument is an array 
// of 2-element arrays that can be used for task.Wellselection
function isWSArray(a) {
	if (!isArray(a)) return false;
	// check all elements for "Array-ness"
	for (var i = 0; i < a.length; i++) {
		if (!isArray(a[i]) || a[i].length !== 2 || typeof a[i][0] !== "number" || typeof a[i][1] !== "number" ) return false;
	}
	return true
}

// WSArray2String returns a "task.wellselection-like" string 
// useful when checking AoA's for multiAsp or multiDisp
	function WSArray2String(a) {
	if (!isWSArray(a)) return "Not WS Array!";
	var tmp = [];
	for (var i = 0; i < a.length; i++) tmp.push("["+a[i][0]+","+a[i][1]+"]");
	return tmp.join(" , ");
}

// ======================== POLYFILLS FOR ARRAYS ===============================

Array.prototype.indexOf = function (x, fromIndex) {
	// Return value:
	// The first index of x in the array; -1 if not found.
	var len = this.length;
	var fromIndex = Number(fromIndex);
	if (fromIndex >= len) return -1;
	if (!fromIndex || fromIndex < -len) fromIndex = 0;
	for (var i = fromIndex + (fromIndex < 0)*len; i < len; i++) {
		if (this[i] === x) return i;
	};
	return -1;
}
	
Array.prototype.lastIndexOf = function (x, fromIndex) {
	// Return value:
	// The last index of x in the array; -1 if not found.
	// --> to be checked !!!!
	var len = this.length;
	var fromIndex = Number(fromIndex);
	if (fromIndex < -len) return -1;
	if (!fromIndex || fromIndex >= len) fromIndex = len-1;
	for (var i = fromIndex + (fromIndex < 0)*len; i >= 0; i--) {
		if (this[i] === x) return i
	}
	return -1
}

Array.prototype.findIndex = function (callback, thisArg) {
	// Return value:
	//The index of the first element in the array that passes the test. Otherwise, -1.
	for (var i = 0; i < this.length; i++) {
		if (callback.apply(thisArg, [this[i], i, this])) return i
	}
	return -1
}

Array.prototype.findLastIndex = function (callback, thisArg) {
	// Return value:
	//The index of the last element in the array that passes the test. Otherwise, -1.
	for (var i = this.length-1; i >=0; i--) {
		if (callback.apply(thisArg, [this[i], i, this])) return i
	}
	return -1
}

Array.prototype.map = function(callback, thisArg){
	// Return value:
	// A new array with each element being the result of the callback function.
    var arr = [];
    for(var i=0; i<this.length; i++) {
        arr.push(callback.apply(thisArg, [this[i], i, this]));
    }
    return arr;
}

Array.prototype.filter = function(callback, thisArg) {
	// Return value:
	// A shallow copy of the given array containing just the elements that pass the test. 
	// If no elements pass the test, an empty array is returned.
    var arr = [];
    for(var i=0; i<this.length; i++) {
        if (callback.apply(thisArg, [this[i], i, this])) arr.push(this[i]);
    }
    return arr;
}

Array.prototype.forEach = function(callback, thisArg) {
	// Return value:
	// None.
    for(var i=0; i<this.length; i++){
        callback.apply(thisArg, [this[i], i, this]);
    }
}

Array.prototype.find = function(callback, thisArg) {
	// Return value: 
	// The first element in the array that satisfies the provided testing function. 
	// Otherwise, undefined is returned.
    for(var i=0; i<this.length; i++){
    	if (callback.apply(thisArg, [this[i], i, this])) return this[i];
    }
    return undefined;
}

Array.prototype.every = function(callback, thisArg){
	// Return value:
	// true unless callback returns a falsy value for an array element, 
	// in which case false is immediately returned.
    for(var i=0; i<this.length; i++){
        if (!callback.apply(thisArg, [this[i], i, this])) return false;
    }
    return true;
}

Array.prototype.some = function(callback, thisArg){
	// Return value:
	// false unless callback returns a truthy value for an array element, 
	// in which case true is immediately returned.
    for(var i=0; i<this.length; i++){
        if (callback.apply(thisArg, [this[i], i, this])) return true;
    }
    return false;
}

// TBD from here

Array.prototype.reduce = function(){
    var callback = arguments[0];
    var currentVal = arguments[1];
	var startElem = 0
	if (currentVal === undefined) {
		currentVal = this[0]
		startElem = 1
	}
    for(var i=startElem; i<this.length; i++){
      var result = callback(currentVal, this[i], i ,this);
      currentVal = result;
    }
    return currentVal;
}

// modified from https://siddhigate.hashnode.dev/i-wrote-polyfills-for-32-javascript-array-methods

Array.prototype.fill = function (value, start, end) {
	var start = Number(start) || 0
	var end = Number(end)
  	var end = end === 0 ? 0 : (end || this.length)
  	if (start < -this.length) start = 0
  	if (start >= this.length) return this
  	if (end <= start) return this
  	if (end < -this.length) end = 0
  	if (start < 0) start = this.length + start
  	if (end < 0) end = this.length + end
  	for (var i = start; i < end; i++) this[i] = value
  	return this
}

// this is useful for shuffling an array
// (Fisher-Yates Shuffle Algorithm)
Array.prototype.shuffle = function () {
    var arr = this.slice() //shallow copy
    var len = arr.length
    var i, j, tmp
    for (i = len-1; i > 0 ; i--) {
       j = Math.floor(Math.random() * (i+1))
       tmp = arr[i]
       arr[i] = arr[j]
       arr[j] = tmp
    }
    return arr
 }

// ======================== POLYFILLS FOR Strings ===============================

// Adding trim (after Douglas Crockford)
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g,"")
}

// Zero-padding a string to "digits"
String.prototype.zeropad = function (digits) {
	var digits = Number(digits) 
	if (digits < 1 || isNaN(digits)) {print("zeropad: bad input"); return}
	var z = ""
	for (var i = 0; i < digits-1; i++) z += "0"
	return (z + this).slice(-digits) 
}

// Zero-padding a string to "digits" using "chr" -- now using the official name
String.prototype.padStart = function (digits, chr) {
	var digits = Number(digits); 
	var chr = chr[0] || "0";
	if (digits < 1 || isNaN(digits)) {print("padStart: bad input"); return;}
	var pad = "";
	for (var i = 0; i < digits-1; i++) pad += chr;
	return (pad + this).slice(-digits); 
}

// Repeat string "count" times and concatenate
String.prototype.repeat = function (count) {
	var count = parseInt(count) || 0
	if (!count || count < 0 )  return this
	var outStr = ""
	for (var i=0; i<count; i++) outStr += this
	return outStr
}

// Simple clone of the Python format() method. 
String.prototype.format = function () {
	// This function has no parameters because the number of arguments passed by the caller is variable.
	// All passed values are stored by default in the special "arguments" object.
 
	// this RegExp matches all groups that start with "{" and end with "}"
	// using lazy evaluation (so that each group is singularly matched)
	var re = /(\{.*?\})/g
 
	// "hits" is an array containing all the placeholders found in the string
	var hits = this.match(re)
	
	// if no placeholders return the original string
	if (!hits) return this
 
	// create an ancillary function that returns the index of a test value in an array
	// (method indexOf() for arrays does not exist in VWorks JS)
	var indexOf = function (arr, test) {
	   for (var i = 0; i < arr.length; i++) if (arr[i] === test) return i
	   return -1 
	} 
 
	// find unique values in "hits" and store them in "hitsUniq"
	var hitsUniq = []
	for (var i = 0; i < hits.length; i++) if (indexOf(hits,hits[i]) === i) hitsUniq.push(hits[i])
 
	// check whether all placeholders contain numbers 
	var re2 =  /[\{\}]/g, allNumbers = true
	for (var i=0; i < hitsUniq.length; i++) {
	   if (isNaN(hitsUniq[i].replace(re2,""))) {allNumbers = false; break}
	}  
 
	// finally perform the substitutions
	var re3, str = this, index
	for (var i = 0; i < hitsUniq.length; i++) {
	   re3 = new RegExp(hitsUniq[i], "g")
	   if (allNumbers) {
		  index = Number(hitsUniq[i].replace(re2,""))
		  str = str.replace(re3,arguments[index])
	   }
	   else {
		  str = str.replace(re3,arguments[i])
	   }
	}
	return str
}
 

// ======================= BASE64 ENCODING/DECODING FUNCTIONS ==================
// see https://base64.guru/learn/base64-algorithm/encode and wikipedia

function btoa_naive (inStr) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    var totChars = inStr.length
    var i, tmp, tmpArr = []
    for (i=0; i < totChars; i++) {
        tmp = inStr[i].charCodeAt(0)
        if (i%3 === 0) {
            tmpArr.push( (tmp & 0xFC) >>> 2 )
            tmpArr.push( (tmp & 0x03) << 4)
        } 
        else if (i%3 === 1) {
            tmpArr[tmpArr.length-1] |=   ( (tmp & 0xF0) >>> 4)
            tmpArr.push((tmp & 0x0F) << 2)
        }
        else if (i%3 === 2) {
            tmpArr[tmpArr.length-1] |= ( (tmp & 0xC0) >>> 6)
            tmpArr.push( (tmp & 0x3F) )
        }
    }    
    tmp = ""
    for (i=0; i < tmpArr.length; i++) tmp += alphabet[tmpArr[i]]
    return tmp
}

function atob_naive (inStr) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    var totChars = inStr.length
    var i, tmp, tmpArr = []
    for (i=0; i < totChars; i++) {
        tmp = alphabet.indexOf(inStr[i])
        if (i%4 === 0) {
            tmpArr.push( (tmp & 0x3F) << 2 )
        }
        else if (i%4 === 1) {
            tmpArr[tmpArr.length-1] |=  (tmp & 0x30) >>> 4
            tmpArr.push ( (tmp & 0x0F) << 4 )
        } 
        else if (i%4 === 2) {
            tmpArr[tmpArr.length-1] |= (tmp & 0x3C) >>> 2
            tmpArr.push( (tmp & 0x03) << 6)
        }
        else if (i%4 === 3) {
            tmpArr[tmpArr.length-1] |= (tmp & 0x3F)
        }
    }
    tmp = ""
    for (i=0; i < tmpArr.length; i++) tmp += String.fromCharCode(tmpArr[i])
    return tmp
}

function btoa (inStr) {
	var inStr = String(inStr)
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    var lastPos = inStr.length - 1 
    var i = -1, tmp, encoded = ""
	while (i < lastPos) {
        tmp = inStr.charCodeAt(++i) << 16 |  inStr.charCodeAt(++i) << 8 | inStr.charCodeAt(++i)
		encoded += alphabet[(tmp >>> 18) & 0x3F] + alphabet[(tmp >>> 12) & 0x3F] + alphabet[(tmp >>> 6) & 0x3F] + alphabet[tmp & 0x3F]
	}
	var remChars = inStr.length % 3
	return remChars ? encoded.slice(0,remChars-3) : encoded
}

function atob (inStr) {
	var inStr = String(inStr)
	var lastPos = inStr.length - 1 
	var i = -1, tmp, decoded = ""
	var index = function (c) {
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
		return alphabet.indexOf(c) < 0 ? 0 : alphabet.indexOf(c)
	}
	while (i < lastPos) {
		tmp = index(inStr[++i]) << 18 |  index(inStr[++i]) << 12 | index(inStr[++i]) << 6 | index(inStr[++i]) 
		decoded += String.fromCharCode( (tmp >>> 16) & 0xFF, (tmp >>> 8) & 0xFF, tmp & 0xFF)
	}
	var ind0 = decoded.indexOf(String.fromCharCode(0))
	return  ind0 < 0 ? decoded : decoded.slice(0,ind0)
}

// ======================= OTHER FUNCTIONS ======================================


/*
This function solves the problem of processing "nUnits" of something when the available maximum capacity is "maxCapacity" 
and each unit needs to use "someCapacity". The function will return the "best" number of cycles needed to complete the action  
and the number of units that will be processed in each cycle. "Best" here is intented as the one that makes the resulting 
processed units per cycles as similar as possible.  
Possible uses: 
1. filling "nUnits" columns (with multidispense), each with "someCapacity" uL using tips having a max volume of "maxCapacity" uL.
2. processing "nUnits" plates stored in a stacker when the available space on the Bravo amounts to "maxCapacity" locations 
   and one needs to know how many plates to use in each cycle. In case one has 3 locations available maxCapacity=3 and someCapacity=1.  
The function returns an object whose propertes are "nCycles" (integer) and "unitsPerCycle" (array of integers of length nCycles).
 
Test #1: get 16 plates in groups of 3 on the Bravo:

print("=== Test with number of plates")
pTest = {nUnits: 16,maxCapacity: 3,someCapacity: 1}
pRes = doActionInCycles(pTest)
print("nUnits = " + pTest.nUnits + " nCycles = " + pRes.nCycles + " unitsPerCycle = " + pRes.unitsPerCycle)

--> nUnits = 16 nCycles = 6 unitsPerCycle = 3,3,3,3,2,2 (note that it is *not* 3,3,3,3,3,1)

Test #2: calculate how to multidispense 30 uL to 9 columns using filtered tips whose max volume is 180 uL:

print("=== Test with multidispense")
vTest = {nUnits: 9,maxCapacity: 180,someCapacity: 30}
vRes = doActionInCycles(vTest)
print("nUnits = " + vTest.nUnits + " nCycles = " + vRes.nCycles + " unitsPerCycle = " + vRes.unitsPerCycle)

--> nUnits = 9 nCycles = 2 unitsPerCycle = 5,4 (*not* 6,3)

*/
function doActionInCycles (o) {
	var props = ["someCapacity","nUnits","maxCapacity"]
	
	if (typeof(o) !== "object") {
		print("Argument is not an object!")
		return false
	}
	for (var i = 0; i < props.length; i++) {
		if (!o.hasOwnProperty(props[i]) || typeof o[props[i]] !== "number") {a
			print("Problem with property " + props[i]) 
			return false
		}
	}
	
	var someCapacity = o.someCapacity, nUnits = o.nUnits, maxCapacity = o.maxCapacity
	var nCycles = 1, remCycles, unitsPerCycle = [], addCycle
	
	if (someCapacity > maxCapacity) {
		print("It must be someCapacity <= maxCapacity")
		return false
	}
	
	while (someCapacity*Math.ceil(nUnits/nCycles) > maxCapacity) nCycles++
	remCycles = nUnits - nCycles*Math.floor(nUnits/nCycles)
	
	for (i=0; i<nCycles; i++) {
		addCycle = (i < remCycles) ? 1 : 0
		unitsPerCycle.push(addCycle + Math.floor(nUnits/nCycles))
	}
		
	return {nCycles: nCycles, unitsPerCycle: unitsPerCycle}
}

function getWellselection (well,plateType) {
	// This function converts a well coordinate in the form of "A1", "P24", "AC13", etc 
	// into a vector (not a vector of vectors!) e.g. [1,1], [3,12], etc: [row,col]
	// also useful for checking if the well code is correct.
	// It converts the coordinates to uppercase and removes all spaces. 
	// plateType can be 6, 12, 24, 48, 96, 384 and 1536.
	// plateType defaults to 96 if undefined.
	// Version 1.0.1
	// Mauro Cremonini - Agilent - March 2019
	// Apr 2019 - modified regexp for filtering all but letters and numbers in coord 
	//            useful when one forgets quotes or double quotes around strings in csv
	//			Added possibility of asking for current version. 
	// Jul 2019 - v 1.0.2 added support for 54 well plates
	// Mar 2020 - v 1.0.3 fixed issue met when passing platype as string 
	
	//print("getWellselection: received well = "+ well +", plateType = " + plateType)
	
	var version = "1.0.3 - Mar 2020"
	
    // if plateType is “undefined” default to 96
	var plateType = Number(plateType) || 96
	var well = well
	if (well === undefined) {
		print("Error: well is undefined!") 
		return false
	}

	// if well contains "version" return current version
	if (well === "current_version") return version

	// in the part below the “switch” construct behaves like a series of if … else if … else statements
	// and sets rowH and colH to the maximum number of rows and columns for each tested plateType
	switch (plateType) {
		case 6:
			var rowH = 2
			var colH = 3
        break
		case 12:  
			var rowH = 3
			var colH = 4
		break
		case 24: 
			var rowH = 4
			var colH = 6
		break
		case 48:
			var rowH = 6
			var colH = 8
		break
		case 54:
			var rowH = 6
			var colH = 9
		break
		case 96:
			var rowH = 8
			var colH = 12
		break
		case 384:
			var rowH = 16
			var colH = 24
		break
		case 1536:
			var rowH = 32
			var colH = 48
		break
		default:
			print("Error: plateType is set to " + plateType)
			print("Wrong plate type selection in getWellselection")
		return false
	}
	// turn all caps to big and strip spaces
	var coord = well.toUpperCase().replace(/[^A-Za-z0-9]/g,'')
	// subtract 64 from ASCII codes of the first and second char
	var test1 = coord.charCodeAt(0) - 64
	var test2 = coord.charCodeAt(1) - 64
	if (test1 >= 1 && test1 <= 6 && test2 >= 1 && test2 <= 6) {
		// first and second chars are A to F so it is 1536-type coord
		// so add 26 to find row number
		// col begins at column 3
		var row = 26 + test2
		var col = coord.substring(2) 
	}
	else {
		// any other plate
		var row = test1
		var col = coord.substring(1)
	}
	// make sure that row and col are numbers
	// default to zero if “NaN” (not a number)
	row = Number(row) || 0
	col = Number(col) || 0
	//print("Found: row = " + row + ", col = " + col) 
	// safety check: are row and col meaningful for current plateTyle
	if (row > 0 && row <= rowH && col > 0 && col <= colH) {
		return [row,col] // returning a vector ok
	}
	else {
		print("Warning: well " + coord + " is out of range for the selected plate type") 
		return false // conversion failed
	}   
}

// This is the new version of getWellselection written using only RegExps
// Not fully tested yet 

function getWellselection2 (well,plateType) {
	// 2023-01-23 v 1.0
	//this version uses regexps for nearly all operations!
	var filterSpaces = /[^A-Z0-9]/g
	var filterType = /^(6|12|24|48|54|96|384|1536)$/
	var filter2Letters = /^[A-Z]{2}/
	var filter12Numbers = /[0-9]{1,2}$/
	var checkWell = {6: /^[A-B]0?[1-3]$/,
					12: /^[A-C]0?[1-4]$/,
					24: /^[A-D]0?[1-6]$/,
					48: /^[A-F]0?[1-8]$/,
					54: /^[A-F]0?[1-9]$/,
					96: /^[A-H](0?[1-9]|1[012])$/,
					384: /^[A-P](0?[1-9]|1[0-9]|2[0-4])$/,
					1536: /^([A-Z]|A[A-F]|([A-F])\2)(0?[1-9]|[123][0-9]|4[0-8])$/} 
				
	if (plateType === undefined) {print("getWellselection: no plate type provided - defaulting to 96 well-format"); var plateType = 96} 
	var plateType = plateType.toString().replace(filterSpaces,'')
	if (!filterType.test(plateType)) {print("getWellselection: bad plate type \"" + plateType +"\""); return false}
	var well = well.toString().toUpperCase().replace(filterSpaces,'')
	if(!checkWell[plateType].test(well)) {print("getWellselection: bad well address \"" + well + "\" for selected plate type \"" + plateType +"\""); return false}
	var row = filter2Letters.test(well) ? 26 + well.charCodeAt(1) - 64 : well.charCodeAt(0) - 64
	var col = filter12Numbers.exec(well)[0]
	return [Number(row),Number(col)]
}

// this function returns true if run on VWorks 14.x else returns false
// Jan 2023
function isVWorks14() {
	return (typeof IsCompliantMode === "function")
}

	
// This function pulls information about labware from the registry
// and returns an object with some parameters	
// Updated for VWorks 14 (Jan 2023)
function plateInfo (plateName) {
	if (typeof plateName !== "string") {print("plateInfo: bad input argument"); return}
	
	var baseC = ["","Microplate","Filter plate","Reservoir","Tip Wash Station","Pin tool","Tip box","Lid","Tip trash bin","AM cartridge rack"] 
	var wellG = ["","Round","Square"]
	var wellB = ["","Rounded","Flat","V-Shaped"]
	var labwrP = {	name: "NAME", 
					wells: "NUMBER_OF_WELLS",
					maxVolume: "WELL_TIP_VOLUME",
					labwareType: "BASE_CLASS",
					wellDepth: "WELL_DEPTH",
					wellDiameter: "WELL_DIAMETER",
					wellGeometry: "WELL_GEOMETRY",
					wellBottom: "WELL_BOTTOM_SHAPE",
					tipCapacity: "TIP_CAPACITY"}

	var isVWorks14 = function () {return (typeof IsCompliantMode === "function")}
	
	print("Retrieving parameters for labware entry \"" + plateName + "\"")
   
	if (isVWorks14()) { 
		var getQuery = function (q) {
			var queryTemplate = "//value[@name=\"##@@##\"]/@value"
			return queryTemplate.replace("##@@##",q)
		}
		
		//make sure that an SP3 folder exists in the world-writable "public" tree
		var usernamePath = "c:/users/public/SP3/"
		var usernameFile = usernamePath + "currentUsername.txt"
		var usernameCommand = "cmd /c \" echo %username% > " + usernameFile + " \""
		var f = new File()
		if (!f.Exists(usernamePath)) run("cmd /c mkdir \"" + usernamePath + "\"", true)
		run(usernameCommand,true)
		f.Open(usernameFile)
		var userName = f.Read().replace(/[^A-Za-z0-9]/g,"")
		f.Close()
		// point to the user's %temp% folder
		var outPath = "C:/users/"+userName+"/AppData/Local/Temp/"
		//var outPath = "C:/VWorks Workspace/Temp/SP3/"
		var labwPath = "VWorks Projects/VWorks/Labware/Entries/" //relative to [olssvr]
		var cmd = "cmd /c mkdir \"" + outPath + "\""
		var f = new File()
		//making sure that outPath exists
		if (!f.Exists(outPath)) run(cmd)
		// downloading a labware entry to outPath
		if (!f.Exists("[olssvr]:"+labwPath+plateName+".xml.roiZip")) {
			print("plateInfo: labware " + plateName + " not found")
			return
		}
		DownloadFromStorage(labwPath+plateName+".xml",outPath)
		// Start XPath
		var xmlDoc = new ActiveX("Msxml2.DOMDocument.6.0")
		xmlDoc.setProperty("SelectionLanguage","XPath")
		xmlDoc.async = false
		f.Open(outPath+plateName+".xml")
		var isXMLReadOK = xmlDoc.loadXML(f.Read())
		f.Close()
		if (!isXMLReadOK) {print("plateInfo: XML read failed"); return}
		var resObj = {}
		for (var p in labwrP) {
			if (labwrP.hasOwnProperty(p)) resObj[p] = xmlDoc.selectSingleNode(getQuery(labwrP[p])).value
		}  
	}
	else {
		var myKey, reg
		var vworksPath = "C:\\Program Files (x86)\\Agilent Technologies\\VWorks\\VWorks.exe"
		var f = new File()
		if ( f.Exists(vworksPath) ) {
			// 64 bit vworks
			myKey = "SOFTWARE\\Wow6432Node\\Velocity11\\Shared\\Labware\\Labware_Entries\\" + plateName
		}
		else {
			// 32 bit vworks
			myKey = "SOFTWARE\\Velocity11\\Shared\\Labware\\Labware_Entries\\" + plateName
		}

		// create registry object 
		var reg = new Registry () 
   
		// now create an object with all the required info
		var resObj = {}
		for (var p in labwrP) {
			if (labwrP.hasOwnProperty(p)) resObj[p] = reg.Read(myKey,labwrP[p])
		}
	}
	
	// manipulating properties for some entries
	resObj.labwareType = baseC[resObj.labwareType]
	resObj.wellGeometry = wellG[resObj.wellGeometry]
	resObj.wellBottom = wellB[resObj.wellBottom]
	if (resObj.labwareType !== "Tip box") resObj.tipCapacity = "NA"
	
	return resObj
}

// This function returns a time stamp in the format "YYYY-MM-DD hh:mm:ss"
function getTimeStamp () {
	//creating timestamp
	var myDate = new Date()
	var YYYY = myDate.getFullYear()
	var MM = ("0"+(myDate.getMonth() + 1)).slice(-2)
	var DD = ("0"+myDate.getDate()).slice(-2)
	var hh = ("0"+myDate.getHours()).slice(-2)
	var mm = ("0"+myDate.getMinutes()).slice(-2)
	var ss = ("0"+myDate.getSeconds()).slice(-2)
	return  [[YYYY,MM,DD].join("-"),[hh,mm,ss].join(":")].join(" ")
 }

// This function adds a line to a custom log file creating the path if not existent. 
// If fileOrTask is the task object then the output file is automatically set to
// C:\VWorks Workspace\Outputs\<protocol name>_out.txt.
// If txtLine is an array its elements are automatically join()'ed with tabs (as in usual VWorks logs).  
function customLog (txtLine, fileOrTask, overwrite) {
	var fileName = "", f = new File()
	if (typeof fileOrTask === "object") {
		if (typeof fileOrTask.getProtocolName === "function") {
			var tmp = (fileOrTask.getProtocolName().replace(/\\/g,"/").split("/").pop())
			tmp = tmp.slice(0,tmp.lastIndexOf("."))
			fileName = "C:/VWorks Workspace/Outputs/" + tmp + "_out.txt"
		}
		else {
			print("customLog: no getProtocolName() method in passed object"); return
		}
	}
	fileName = (fileName || fileOrTask).toString().replace(/\\/g,"/")
	if (!fileName) {print("customLog: no fileName given"); return}
	if (fileName.indexOf("/") === -1) {print("customLog: complete file path needed"); return}
	var path = (fileName.split("/")).slice(0,-1).join("/")
	if (!f.Exists(path)) run("cmd /c mkdir \"" + path + "\"" , true)
	f.Open(fileName, overwrite)
	f.Write((isArray(txtLine) ? txtLine.join("\t") : txtLine) + "\n")
	f.Close()
	return true
 }

 // Here's another, but this time it is a constructor
 function CustomLog (fileOrTask, sep) {
	var fileName = "", f = new File()
	if (typeof fileOrTask === "object") {
		if (typeof fileOrTask.getProtocolName === "function") {
			var tmp = (fileOrTask.getProtocolName().replace(/\\/g,"/").split("/").pop())
			tmp = tmp.slice(0,tmp.lastIndexOf("."))
			fileName = "C:/VWorks Workspace/Outputs/" + tmp + "_out.txt"
		}
		else {
			print("customLog: no getProtocolName() method in passed object"); return
		}
	}
	fileName = (fileName || fileOrTask).toString().replace(/\\/g,"/")
	if (!fileName) {print("CustomLog: no fileName given"); return}
	if (fileName.indexOf("/") === -1) {print("CustomLog: complete file path needed"); return}
	var path = (fileName.split("/")).slice(0,-1).join("/")
	if (!f.Exists(path)) run("cmd /c mkdir \"" + path + "\"" , true)
	this.log = function (txtLine, overwrite) {
		f.Open(fileName, overwrite)
		f.Write((isArray(txtLine) ? txtLine.join(sep) : txtLine) + "\n")
		f.Close()
	}
 }


// This functions is useful when one needs to check several possible errors 
// and return the total "OR"ed cumulative error at the end. _error will be placed in a closure. 
// use it in this way:
// error = errorFactory()
// error.set(true) // or false
// error.get() 
function errorFactory () {
	var _error = false, _errorOld = false
	var _errorText = "", _errorTextOld = ""
	var myError = {}
	myError.set = function (value, text) {
		_errorOld = _error
		_error = _error || !!value
		if (value && text) this.setText(text) 
	}
	myError.setText = function (text) {
		if (!text) return
		_errorTextOld = _errorText
		_errorText += text + "\n"
	}
	myError.get = function () {return _error}
	myError.getText = function () {return _errorText}
	myError.revert = function () {
		_error = _errorOld
		_errorText = _errorTextOld
	}
	myError.clear = function() {
		_error = false
		_errorText = ""
	}
	return myError
}

// The following methods are useful when one needs to extract all variables from a form 
// having a certain prefix and store them in a JSON file. 
// The form variables are supposed to be in the global context and will be placed 
// in the global context when read from JSON file. 
var formManager = {} 
formManager.save = function (prefix, fileName) {
	var gObj = GetGlobalObject() 
	var jObj = {}  
    for (var p in gObj) if (gObj.hasOwnProperty(p) && !p.indexOf(prefix)) jObj[p] = gObj[p]
	var jsonString = JSON.stringify(jObj) 
	print("Saving the following JSON string: " + jsonString) 
	var f = new File()
	f.Open(fileName,true)
	f.Write(jsonString)
	f.Close()
}
formManager.load = function (prefix, fileName) {
	var gObj = GetGlobalObject()
	var f = new File()
	if (f.Exists(fileName)) {
		f.Open(fileName)
		var jsonString = f.Read() 
		f.Close()
		print("Loading the following JSON string: " + jsonString)
		var jObj = JSON.parse(jsonString)
		for (var p in jObj) if (jObj.hasOwnProperty(p) && !p.indexOf(prefix)) gObj[p] = jObj[p]
	}
	else {
		print("File " + fileName + " does not exist!")
	}
}

// This function returns an object whose nRows and nCols properties
// contain the number of rows and cols for the given format.
// e.g. if format is 96 => nRows and nCols will be 8 and 12 
function formatToDimensions(format) {
	var formatConv = {
		6: {nRows: 2,nCols:3},
		12: {nRows: 3,nCols:4},
		24: {nRows: 4,nCols:6},
		48: {nRows: 6,nCols:8},
		54: {nRows: 6,nCols:9},
		96: {nRows: 8,nCols:12},
		384:  {nRows: 16,nCols:24},
		1536:  {nRows: 32,nCols:48}
	}
	if (!formatConv.hasOwnProperty(format)) {
		print("formatToDimensions: wrong format")
		return false
	}
	return formatConv[format]
}

// This function converts a well address to an index.
// For example, in a 96-well plate, A1 has index 0 and H12 has index 95. What happens in between 
// depends on whether the wells are selected by column or by row. 
// In "byrow" mode A2 has index 1, whereas in "bycol" it has index 8.
// well: any string containing a well address
// mode: "byrow" or "bycol"
// format: number of wells in the plate (see getWellselection())  
function wellToIndex(well,mode,format) {
	if (!well) {
		print("wellToIndex: no well address provided")
		return false
	}
	if (mode !== "bycol" && mode !== "byrow" ) {
		print("wellToIndex: wrong mode")
		return false
	}
	var dims = formatToDimensions(format) 
	if (!dims) {
		print("wellToIndex: wrong format")
		return false
	}
	var wellsel = getWellselection(well,format)
	if (!wellsel) {
		print("wellToIndex: wrong well for given format")
		return false
	}
	var row = wellsel[0]
	var col = wellsel[1]
	if (mode === "byrow") {
		return (row-1)*dims.nCols + col - 1
	}
	else if (mode === "bycol") {
		return (col-1)*dims.nRows + row - 1
	} 
}

// This function uses an index as described in wellToIndex() to generate
// corresponding wellselection (as array, not array of arrays)
function indexToWellselection (index,mode,format) {
	var row, col
	if (!index) {
		print("indexToWellselection: no index provided")
		return false
	}
	if (mode !== "bycol" && mode !== "byrow" ) {
		print("indexToWellselection: wrong mode")
		return false
	}
	var dims = formatToDimensions(format) 
	if (!dims) {
		print("indexToWellselection: wrong format")
		return false
	}
	if (mode === "byrow") {
		row = 1 + Math.floor(index/dims.nCols)
		col = 1 + index % dims.nCols
	}
	else if (mode === "bycol") {
		row = 1 + index % dims.nRows
		col = 1 + Math.floor(index/dims.nRows)
	}
	return [row,col]
}
	
// This function transform a wellselection ARRAY (not array of arrays) 
// into a well address
function wellselectionToWell (ws,pad) {
	if (!ws) {
		print("wellselectioToWell: no wellselection provided")
		return false
	}
	var row = ws[0]
	var col = ws[1]
	var string = String.fromCharCode(65+(row-1)%26)
	if (Math.floor((row-1)/26) > 0) string += string
	return string+ ( "0000" + col).slice(-(pad ? pad : string.length)) 
}

// This function is used to send a message to a Telegram bot. 
// It needs an ancillary powershell scripts called "telegram_bot.ps1" in 
// c:\vworks workspace\vworksextlib\scripts\
// If no token or chatID is provided then the powershell script
// will be passed only the text (and in this case the defaults in the powershell script will be used)
function sendToTelegramBot (text, psScript, token, chatID) {
	var psScript = psScript || "C:/VWorks Workspace/VWorksExtLib/Scripts/telegram_bot.ps1"
	var cmdToken = token ? "-botToken " + token + " " : ""
	var cmdChatID = chatID ? "-ChatID " + chatID + " " : ""
	var commandLine = "cmd /c powershell -ExecutionPolicy Bypass -File \"" + psScript + "\" " + cmdToken + cmdChatID + text
	print(commandLine)  
	run(commandLine) 
}

function sendToTelegramBotInit (obj) {
	var psScript = obj.psScript || "C:/VWorks Workspace/VWorksExtLib/Scripts/telegram_bot.ps1"
	var cmdToken = obj.token ? "-Token " + obj.token + " " : ""
	var cmdChatID = obj.chatID ? "-ChatID " + obj.chatID + " " : ""
	var commandLine = "cmd /c powershell -ExecutionPolicy Bypass -File \"" + psScript + "\" " + cmdToken + cmdChatID
	return function (text, debug) {
		if (debug) print (commandLine + text)
		run (commandLine + text)
	}
}


// This function can be used to capture a message and have Windows "say" it
// using either powershell or the older "Sapi.SpVoice" Windows COM object
// (useful in case the user is not allowed to use powershell).
// Selected voice is always #1 (second in list). With US setup it is MS's Zira.
// text: the text you want Windows to "say"
// dontSpeak: true or false. If falsy it just returns the provided text. Useful when you create
//          a chain like this task.Body = speak(myText) in a user message and you have a checkbox
//          in a form for suppressing voice reading. 
//          In that case one does task.Body = Speak(myText, noSay). 
// usePowershell: true or false. If falsy - then the function will use a "speak.vbs" script 
//                stored in the same folder as this library to do the job (via wscript).  
function speak(text, dontSpeak, usePowershell) {
	//TBD
} 


// older stuff =====================================================================

// This function solves the problem of dispensing "vol" amount of coffee (any liquid) to each of "nCups" cups (cols, rows, wells...)
// with a coffee pot (tips) having a max volume of maxVol (maxVol >= vol) in the least possible number of cycles.
// Input: an object with the properties "vol", "nCups", "maxvol".
// Output: an object with the properties "nCycles" (integer) and "dispPerCycle" (array of integers, how many cups can be filled in cycle i-th).
// The function will return false on failure.  
// Useful for multidispense.
function calcMultiDispenseCycles (o) {
	var props = ["vol","nCups","maxVol"]
	
	if (typeof(o) !== "object") {
		print("Argument is not an object!")
		return false
	}
	for (var i = 0; i < props.length; i++) {
		if (!o.hasOwnProperty(props[i]) || typeof o[props[i]] !== "number") {
			print("Problem with property " + props[i]) 
			return false
		}
	}
	
	var vol = o.vol, nCups = o.nCups, maxVol = o.maxVol
	var nCycles = 1, remCycles, cupsPerCycle = [], addCycle
	
	if (vol > maxVol) {
		print("It must be vol <= maxVol")
		return false
	}
	
	while (vol*Math.ceil(nCups/nCycles) > maxVol) nCycles++
	remCycles = nCups - nCycles*Math.floor(nCups/nCycles)
	
	for (i=0; i<nCycles; i++) {
		addCycle = (i < remCycles) ? 1 : 0
		cupsPerCycle.push(addCycle + Math.floor(nCups/nCycles))
	}
		
	return {nCycles: nCycles, dispPerCycle: cupsPerCycle}
}

// end of VWorksExtLib.js
print("*** VWorksExtLib.js successfully loaded ***")

// finally load public domain JSON library (VWorks version)
+function() {
	var JSONLib = "C:/VWorks Workspace/VWorksExtLib/json2.js"
	var f = new File()
	if (f.Exists(JSONLib)) {
		open(JSONLib)
		print("*** Public domain json2.js successfully loaded ***")	
	}	
}()
