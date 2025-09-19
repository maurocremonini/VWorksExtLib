// VWorksExtLib  - VWorks Extension Library
// Author: Mauro A. Cremonini
// **************************** DISCLAIMER *************************************** 
// * This project is developed and maintained in a personal capacity.            * 
// * It is not affiliated with, endorsed by, or representative of my employer,   *
// * Agilent Technologies. All code, opinions, and documentation are my own and  *
// * my employer bears no responsibility for any aspect of this work.            *
// *******************************************************************************
// Use the code at your own risk. Credits where credit is due.

// ======================== GENERAL PURPOSE FUNCTIONS ===============================

// This function returns true if run on VWorks 14.x and false otherwise.
function isVWorks14() {
	return (typeof IsCompliantMode === "function");
}

// ------------------------------------------------------------------------------

// isArray returns true or false if the passed argument is an array.
Array.isArray = function (a) {
	return Object.prototype.toString.call(a) === "[object Array]";
}
isArray = Array.isArray; // shorter to write :-)

// ------------------------------------------------------------------------------

// isWSArray returns true if the passed argument is an array 
// of 2-element arrays that can be used for task.Wellselection.
function isWSArray(a) {
	if (!isArray(a)) return false;
	// check all elements for "Array-ness"
	for (var i = 0; i < a.length; i++) {
		if (!isArray(a[i]) || a[i].length !== 2 || typeof a[i][0] !== "number" || typeof a[i][1] !== "number" ) return false;
	}
	return true
}

// ------------------------------------------------------------------------------

// WSArray2String returns a "task.wellselection-like" string,
// useful when checking AoA's for multiAsp or multiDisp.
function WSArray2String(a) {
	if (!isWSArray(a)) return "Not WS Array!";
	var tmp = [];
	for (var i = 0; i < a.length; i++) tmp.push("["+a[i][0]+","+a[i][1]+"]");
	return tmp.join(" , ");
}

// ------------------------------------------------------------------------------

// Polyfil for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
Object.keys = function (obj) {
	var arr = [];
	if (typeof obj !== "object") return arr;
	for (var p in obj) if (obj.hasOwnProperty(p)) arr.push(p);
	return arr;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
Object.values = function (obj) {
	var arr = [];
	if (typeof obj !== "object") return arr;
	for (var p in obj) if (obj.hasOwnProperty(p)) arr.push(obj[p]);
	return arr;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
Object.entries = function (obj) {
	var arr = [];
	if (typeof obj !== "object") return arr;
	for (var p in obj) if (obj.hasOwnProperty(p)) arr.push([p,obj[p]]);
	return arr;
}

// ------------------------------------------------------------------------------

// This function uses "mkdir" to create a folder if not existent.
function ensureFolderExists (folder) {
	var f = new File();
	var cmd = "cmd /c mkdir \"" + folder + "\"";
	if (!f.Exists(folder)) {
		print("Creating " + folder);
		run(cmd, true);
	}
	return;
}

// ------------------------------------------------------------------------------

// This function uses powershell to make VWorks speak a text.
// text: a string with the text to be read aloud.
// voiceNum: an integer, 0 for "MS David" voice and 1 for "MS Zira".
// volume: an integer in the range 0-100.
// waitUntilCompletion: a boolean. If false the function will immediately return.
//                      Omit this parameter for normal use. 
function speak (text, voiceNum, volume, waitUntilCompletion) {
	voiceNum = voiceNum || 1;
	volume = volume || 100;
	var a = "$s=New-Object -ComObject Sapi.SpVoice";
	var b = "$s.Voice=$s.GetVoices().Item("+voiceNum+")"; 
	var c = "$s.Volume="+volume; // 0 - 100
	var d = "$s.Speak(\\\"" + text + "\\\")";
	cmd = "cmd /c powershell \"" + [a,b,c,d].join(";") + "\"" ;
	print("Running: " + cmd);
	run(cmd, waitUntilCompletion);
 }
 
// ------------------------------------------------------------------------------

// This function uses powershell to generate beeps.
// Tone is in Hz, duration is in ms. For a nice beep use beep(2500,300).
// waitUntilCompletion: a boolean. If false the function will immediately return.
//                      Omit this parameter for normal use. 
function beep(freqHz, durMs, waitUntilCompletion) {
	var cmd = "cmd /c powershell \"[Console]::Beep("+freqHz+","+durMs+")\"";
	print("Running: " + cmd);  
	run(cmd, waitUntilCompletion);
 }

// ======================== POLYFILLS FOR ARRAYS ===============================

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
Array.prototype.indexOf = function (x, fromIndex) {
	// Return value:
	// The first index of x in the array; -1 if not found.
	var len = this.length;
	var fromIndex = parseInt(fromIndex);
	if (fromIndex >= len) return -1;
	if (!fromIndex || fromIndex < -len) fromIndex = 0;
	for (var i = fromIndex + (fromIndex < 0)*len; i < len; i++) {
		if (this[i] === x) return i;
	};
	return -1;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
Array.prototype.lastIndexOf = function (x, fromIndex) {
	// Return value:
	// The last index of x in the array; -1 if not found.
	var len = this.length;
	var fromIndex = parseInt(fromIndex);
	if (fromIndex < -len) return -1;
	if (!fromIndex || fromIndex >= len) fromIndex = len-1;
	for (var i = fromIndex + (fromIndex < 0)*len; i >= 0; i--) {
		if (this[i] === x) return i
	}
	return -1
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
Array.prototype.findIndex = function (callback, thisArg) {
	// Return value:
	//The index of the first element in the array that passes the test. Otherwise, -1.
	for (var i = 0; i < this.length; i++) {
		if (callback.apply(thisArg, [this[i], i, this])) return i
	}
	return -1
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex
Array.prototype.findLastIndex = function (callback, thisArg) {
	// Return value:
	//The index of the last element in the array that passes the test. Otherwise, -1.
	for (var i = this.length-1; i >=0; i--) {
		if (callback.apply(thisArg, [this[i], i, this])) return i
	}
	return -1
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
Array.prototype.map = function(callback, thisArg) {
	// Return value:
	// A new array with each element being the result of the callback function.
	// Sparse arrays will still be sparse and callback will not be invoked on them. 
    var arr = [];
    for(var i=0; i<this.length; i++) {
		if (!(i in this)) continue;
		arr[i] = callback.apply(thisArg, [this[i], i, this]);
    }
    return arr;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Array.prototype.forEach = function(callback, thisArg) {
	// Return value:
	// None.
	// Sparse arrays will still be sparse and callback will not be invoked on them. 
    for(var i=0; i<this.length; i++){
		if (!(i in this)) continue;
        this[i] = callback.apply(thisArg, [this[i], i, this]);
    }
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype.filter = function(callback, thisArg) {
	// Return value:
	// A shallow copy of the given array containing just the elements that pass the test. 
	// If no elements pass the test, an empty array is returned.
    var arr = [];
    for(var i=0; i<this.length; i++) {
		if (!(i in this)) continue;
        if (callback.apply(thisArg, [this[i], i, this])) arr.push(this[i]);
    }
    return arr;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype.find = function(callback, thisArg) {
	// Return value: 
	// The first element in the array that satisfies the provided testing function. 
	// Otherwise, undefined is returned.
    for(var i=0; i<this.length; i++){
    	if (callback.apply(thisArg, [this[i], i, this])) return this[i];
    }
    return undefined;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
Array.prototype.every = function(callback, thisArg){
	// Return value:
	// true unless callback returns a falsy value for an array element, 
	// in which case false is immediately returned.
    for(var i=0; i<this.length; i++){
		if (!(i in this)) continue;
        if (!callback.apply(thisArg, [this[i], i, this])) return false;
    }
    return true;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
Array.prototype.some = function(callback, thisArg){
	// Return value:
	// false unless callback returns a truthy value for an array element, 
	// in which case true is immediately returned.
    for(var i=0; i<this.length; i++){
		if (!(i in this)) continue;
        if (callback.apply(thisArg, [this[i], i, this])) return true;
    }
    return false;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
Array.prototype.reduce = function(callback, initialValue) {
	// I can't really throw errors in VWorks...
	if (this.length === 0 && !initialValue) {
		print("Error in reduce");
		throw new TypeError("Reduce failed");
	}
	// edge case #1
	if (this.length === 0 && initialValue) return initialValue;
	// edge case #2 - check for one only element somewhere
	var filteredThis = this.filter(function (el) {return !!el});
	if (initialValue === undefined && filteredThis.length === 1) return filteredThis[0];
	// remaining two cases 
	var accumulator, startElement;
	if (initialValue === undefined) {
		accumulator = this[0];
		startElement = 1;
	} else {
		accumulator = initialValue;
		startElement = 0;
	};
    for(var i=startElement; i<this.length; i++){
		if (!(i in this)) continue;
      	accumulator = callback(accumulator, this[i], i ,this);
    }
    return accumulator;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
Array.prototype.fill = function (value, start, end) {
	var len = this.length;
	if (len === 0) return this;
	var start = parseInt(start) || 0;
	var end = (end===undefined && len) || (parseInt(end) || 0);
	start =  start < 0 ?  start = len + start : start;
	end = end < 0 ? end = len + end : end; 
	if (start < 0) start = 0;
	if (end < 0) end = 0; 
	if (end > len) end = len;
	if (start >= len) return this;
	if (end <= start) return this;
  	for (var i = start; i < end; i++) this[i] = value;
  	return this
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
Array.prototype.at = function (index) {
	var len = this.length;
	var index = parseInt(index);
	if (index < -len || index >= len ) return undefined;
	return index<0 ? this[index+len] : this[index];
}

// ------------------------------------------------------------------------------

// This Array methods scrambles the elements of an array using the Fisher-Yates Shuffle Algorithm.
Array.prototype.shuffle = function () {
    var arr = this.slice(); //shallow copy
    var len = arr.length;
    var i, r, tmp;
    for (i = len-1; i > 0 ; i--) {
       r = Math.floor(Math.random() * (i+1));
       tmp = arr[i];
       arr[i] = arr[r];
       arr[r] = tmp;
    }
    return arr;
 }

// ======================== POLYFILLS FOR STRINGS ===============================

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g,"");
}

// ------------------------------------------------------------------------------

// Zero-padding a string to "digits". Shorter than padStart().
String.prototype.zeropad = function (digits) {
	var digits = parseInt(digits);
	if (digits < 1 || isNaN(digits)) return this;
	//var z = "";
	//for (var i = 0; i < digits-1; i++) z += "0";
	//return ("0".repeat(digits) + this).slice(-digits);
	return this.padStart(digits,"0");
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
String.prototype.padStart = function (toLen, str) {
	var len = this.length;
	if (toLen <= len) return this;
	var delta = toLen-len;
	var pad = str.repeat(Math.ceil(delta/str.length)).slice(0,delta);
	return pad+this;
}

// ------------------------------------------------------------------------------

//Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
String.prototype.padEnd = function (toLen, str) {
	var len = this.length;
	if (toLen <= len) return this;
	var delta = toLen-len;
	var pad = str.repeat(Math.ceil(delta/str.length)).slice(0,delta);
	return this+pad;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
String.prototype.repeat = function (count) {
	var count = parseInt(count) || 0;
	if (!count || count < 0 )  return this;
	var outStr = "";
	for (var i=0; i<count; i++) outStr += this;
	return outStr;
}

// ------------------------------------------------------------------------------

// getWellselection() as String method. See below for getWellselection as function.
String.prototype.getWellselection = function (plateType) {
	return getWellselection(this, plateType);
}

// ======================= NEW METHODS FOR THE FILE() CONSTRUCTOR ==================

// fn: filepath, fixSlash: changes backslashes to forward slashes (useful for VWorks 14.x).
// The filename is set in the "filename" property.
File.prototype.setFilename = function (fn, fixSlash) {
	if (!fn) {print("setFilename: no filename provided."); return false};
	this.filename = fixSlash ?  fn.replace(/\\/g,"/") : fn;
}

// This method reads the content of the file and stores it in the "content" property
File.prototype.readFile = function () {
	if (!this.filename) {print("readFileContent: set the filename property first."); return false};
	if (!this.Exists(this.filename)) {print("readFileContent: file not found."); return false};
	this.Open(this.filename);
	this.content = this.Read();
	this.Close();
}

// This method saves "content" in this.filename
// If content is an array then the separator "sep" is used to separate the elements of the array.
// "suppressCRLF" is passed to Open() as third argument. 
File.prototype.writeFile = function (content, sep, suppressCRLF) {
	if (!this.filename) {print("writeToFile: set the filename first."); return false}; 
	var txt = isArray(content) ? content.join(sep) : content;
	this.Open(this.filename, true, suppressCRLF);
	this.Write(txt);
	this.Close();
}

// This method appends "content" to this.filename.
// See "writeFile" for the meaning of the parameters.
File.prototype.appendFile = function (content, sep, suppressCRLF) {
	if (!this.filename) {print("writeToFile: set the filename first."); return false}; 
	var txt = (isArray(content) ? content.join(sep) : content) + "\n";
	this.Open(this.filename, false, suppressCRLF);
	this.Write(txt);
	this.Close();
}

// This method first reads the content of this.filename and then stores it in the 
// filepath "fn2". If fn2 exists and overwrite is false, no copy will happen. 
File.prototype.copyFile = function (fn2, overwrite) {
	if (!this.filename) {print("copyFile: set the filename first."); return false};
	if (!overwrite && this.Exists(fn2)) {print("copyFile: file exists. Can't copy."); return false};
	this.readFile();
	var fn = this.filename;
	this.setFilename(fn2,true)
	this.writeFile(this.content);
	this.filename = fn;
}

// This method deletes the file in this.filename, unless it is open. 
File.prototype.deleteFile = function () {
	if (!this.filename) {print("deleteFile: set the filename first."); return false};
	if (this.IsOpen()) {print("deleteFile: file is open. Can't delete."); return false};
	this.Delete(this.filename);
};


// ======================= BASE64 ENCODING/DECODING FUNCTIONS ==================
// see https://base64.guru/learn/base64-algorithm/encode and wikipedia

function btoa (inStr) {
	var inStr = String(inStr)
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    var lastPos = inStr.length - 1 
    var i = -1, tmp, encoded = ""
	while (i < lastPos) {
        tmp = inStr.charCodeAt(++i) << 16 | inStr.charCodeAt(++i) << 8 | inStr.charCodeAt(++i)
		encoded += alphabet[(tmp >>> 18) & 0x3F] + alphabet[(tmp >>> 12) & 0x3F] + alphabet[(tmp >>> 6) & 0x3F] + alphabet[tmp & 0x3F]
	}
	var remChars = inStr.length % 3
	return remChars ? encoded.slice(0,remChars-3) : encoded
}

// ------------------------------------------------------------------------------

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
	var props = ["someCapacity","nUnits","maxCapacity"];
	if (typeof(o) !== "object") {
		print("Argument is not an object!");
		return false;
	}
	for (var i = 0; i < props.length; i++) {
		if (!o.hasOwnProperty(props[i]) || typeof o[props[i]] !== "number") {
			print("Problem with property " + props[i]) ;
			return false;
		}
	}
	var someCapacity = o.someCapacity, nUnits = o.nUnits, maxCapacity = o.maxCapacity;
	var nCycles = 1, remCycles, unitsPerCycle = [], addCycle;
	if (someCapacity > maxCapacity) {
		print("It must be someCapacity <= maxCapacity");
		return false;
	}
	while (someCapacity*Math.ceil(nUnits/nCycles) > maxCapacity) nCycles++;
	remCycles = nUnits - nCycles*Math.floor(nUnits/nCycles);
	for (i=0; i<nCycles; i++) {
		addCycle = (i < remCycles) ? 1 : 0;
		unitsPerCycle.push(addCycle + Math.floor(nUnits/nCycles));
	}
		
	return {nCycles: nCycles, unitsPerCycle: unitsPerCycle};
}

// ------------------------------------------------------------------------------

// This function returns the wellselection array corresponding to a certain well address.
// If a well address does not belong to the chosen format ("platetype"), it returns false.
function getWellselection (well,plateType) {
	// 2023-01-23 v 1.0
	var filterSpaces = /[^A-Z0-9]/g;
	var filterType = /^(6|12|24|48|54|96|384|1536)$/;
	var filter2Letters = /^[A-Z]{2}/;
	var filter12Numbers = /[0-9]{1,2}$/;
	var checkWell = {6: /^[A-B]0?[1-3]$/,
					12: /^[A-C]0?[1-4]$/,
					24: /^[A-D]0?[1-6]$/,
					48: /^[A-F]0?[1-8]$/,
					54: /^[A-F]0?[1-9]$/,
					96: /^[A-H](0?[1-9]|1[012])$/,
					384: /^[A-P](0?[1-9]|1[0-9]|2[0-4])$/,
					1536: /^([A-Z]|A[A-F]|([A-F])\2)(0?[1-9]|[123][0-9]|4[0-8])$/};
	if (plateType === undefined) {print("getWellselection: no plate type provided - defaulting to 96 well-format"); var plateType = 96};
	var plateType = plateType.toString().replace(filterSpaces,'');
	if (!filterType.test(plateType)) {print("getWellselection: bad plate type \"" + plateType +"\""); return false};
	var well = well.toString().toUpperCase().replace(filterSpaces,'');
	if(!checkWell[plateType].test(well)) {print("getWellselection: bad well address \"" + well + "\" for selected plate type \"" + plateType +"\""); return false};
	var row = filter2Letters.test(well) ? 26 + well.charCodeAt(1) - 64 : well.charCodeAt(0) - 64;
	var col = filter12Numbers.exec(well)[0];
	return [parseInt(row),parseInt(col)];
}

// ------------------------------------------------------------------------------

// This function pulls labware information from the registry (VWorks 13) 
// or the roiZip record (VWorks 14) and returns an object with labware's parameters. 	
// Updated for VWorks 14 (Jan 2023)
// Improved VWorks 13 part: now it makes sure that labware exists before calling reg.Read() (Apr 2025).
function plateInfo (plateName) {
	if (typeof plateName !== "string") {print("plateInfo: bad input argument"); return}
	var baseC = ["","Microplate","Filter plate","Reservoir","Tip Wash Station","Pin tool","Tip box","Lid","Tip trash bin","AM cartridge rack"];
	var wellG = ["","Round","Square"];
	var wellB = ["","Rounded","Flat","V-Shaped"];
	var labwrP = {	name: "NAME", 
					wells: "NUMBER_OF_WELLS",
					maxVolume: "WELL_TIP_VOLUME",
					labwareType: "BASE_CLASS",
					wellDepth: "WELL_DEPTH",
					wellDiameter: "WELL_DIAMETER",
					wellGeometry: "WELL_GEOMETRY",
					wellBottom: "WELL_BOTTOM_SHAPE",
					tipCapacity: "TIP_CAPACITY"};
	print("Retrieving parameters for labware entry \"" + plateName + "\"");
	// Create PlateInfo work folder.
	// *** C:/VWorks Workspace must be user writable (usually, it is).
	var outPath = "C:/VWorks Workspace/Temp/PlateInfo/";
	ensureFolderExists(outPath);
	var f = new File();
	if (isVWorks14()) { 
		var getQuery = function (q) {
			var queryTemplate = "//value[@name=\"##@@##\"]/@value";
			return queryTemplate.replace("##@@##",q);
		}
		var labwPath = "VWorks Projects/VWorks/Labware/Entries/"; //relative to [olssvr]
		// download a labware entry to outPath
		if (!f.Exists("[olssvr]:"+labwPath+plateName+".xml.roiZip")) {
			print("plateInfo: labware " + plateName + " not found");
			return;
		}
		DownloadFromStorage(labwPath+plateName+".xml",outPath);
		// Start XPath
		var xmlDoc = new ActiveX("Msxml2.DOMDocument.6.0");
		xmlDoc.setProperty("SelectionLanguage","XPath");
		xmlDoc.async = false;
		f.Open(outPath+plateName+".xml");
		var isXMLReadOK = xmlDoc.loadXML(f.Read());
		f.Close();
		if (!isXMLReadOK) {print("plateInfo: XML read failed"); return};
		var resObj = {};
		for (var p in labwrP) {
			if (labwrP.hasOwnProperty(p)) resObj[p] = xmlDoc.selectSingleNode(getQuery(labwrP[p])).value;
		}  
	}
	else {
		var myKey, reg
		var vworksPath = "C:\\Program Files (x86)\\Agilent Technologies\\VWorks\\VWorks.exe";
		var f = new File();
		myKey = f.Exists(vworksPath) ? 
		        "SOFTWARE\\Wow6432Node\\Velocity11\\Shared\\Labware\\Labware_Entries\\" + plateName : // 64-bit Windows
				"SOFTWARE\\Velocity11\\Shared\\Labware\\Labware_Entries\\" + plateName; // 32-bit Windows
		// Make sure that the labware exists in the registry
		// otherwise reg.Read() fails and VWorks stops executing the present JS code. 
		var myKey2 = "HKLM\\" + myKey;
		var regFileName = outPath + "regTest.txt"; 
		var regCmd = "cmd /c reg query \"" + myKey2 +"\" /v NAME 2> \"" + regFileName + "\"";
		run(regCmd,true);
		f.Open(regFileName);
		var content = f.Read();
		f.Close();
		if (content.indexOf("ERROR:") > -1) {
			print("plateInfo: labware " + plateName + " not found");
			return; 
		}
		// create registry object 
		var reg = new Registry(); 
		// now create an object with all the required info
		var resObj = {};
		for (var p in labwrP) {
			if (labwrP.hasOwnProperty(p)) resObj[p] = reg.Read(myKey,labwrP[p]);
		}
	}
	// manipulate properties for some entries
	resObj.labwareType = baseC[resObj.labwareType];
	resObj.wellGeometry = wellG[resObj.wellGeometry];
	resObj.wellBottom = wellB[resObj.wellBottom];
	if (resObj.labwareType !== "Tip box") resObj.tipCapacity = "NA";
	return resObj;
}

// ------------------------------------------------------------------------------

// This function returns a time stamp in the format "YYYY-MM-DD_hh-mm-ss".
function getTimeStamp () {
	//creating timestamp
	var myDate = new Date();
	var YYYY = myDate.getFullYear();
	var MM = String(myDate.getMonth() + 1).zeropad(2);
	var DD = String(myDate.getDate()).zeropad(2);
	var hh = String(myDate.getHours()).zeropad(2);
	var mm = String(myDate.getMinutes()).zeropad(2);
	var ss = String(myDate.getSeconds()).zeropad(2);
	return  [[YYYY,MM,DD].join("-"),[hh,mm,ss].join("-")].join("_");
 }

// ------------------------------------------------------------------------------

// This is a contructor that returns an object with a method "log" 
// that adds a line to a custom log file, creating the path if not existent. 
// If fileOrTask is the "task" object then the output file is automatically set to
// C:\VWorks Workspace\CustomLogs\<protocol name>_out.txt.
// In the log method, if txtLine is an array its elements are automatically join()'ed with the selected separator. 
 function CustomLog (fileOrTask, sep) {
	var sep = sep || "\t";
	var fileName = "", f = new File();
	if (typeof fileOrTask === "object") {
		if (typeof fileOrTask.getProtocolName === "function") {
			var tmp = fileOrTask.getProtocolName().replace(/\\/g,"/").split("/").pop();
			tmp = (tmp.split("."))[0];
			ensureFolderExists("C:/VWorks Workspace/CustomLogs/");
			fileName = "C:/VWorks Workspace/CustomLogs/" + tmp + "_out.txt";
		}
		else {
			print("customLog: no getProtocolName() method in passed object. Is it a \"task\" object?"); 
			return;
		}
	}
	fileName = (fileName || fileOrTask).toString().replace(/\\/g,"/");
	if (!fileName) {print("CustomLog: no fileName provided."); return false};
	if (fileName.indexOf("/") === -1) {print("CustomLog: complete file path needed."); return};
	var path = (fileName.split("/")).slice(0,-1).join("/");
	ensureFolderExists(path);
	this.log = function (txtLine, overwrite) {
		f.Open(fileName, overwrite);
		f.Write((isArray(txtLine) ? txtLine.join(sep) : txtLine) + "\n");
		f.Close();
	}
 }

// ------------------------------------------------------------------------------

// This constructor is useful when one needs to extract variables  
// from a form having a certain prefix and store them in a JSON file. 
// The form variables are supposed to be in the global context and will be stored 
// in the global context when read from the JSON file. 
function FormManager (prefix,fileName) {
	if (typeof JSON.stringify !== "function" || typeof JSON.parse !== "function") {
		print("No JSON object found: aborting...")
		return false
	}
	var gObj = GetGlobalObject();
	this.save = function () { 
		var jObj = {};  
		for (var p in gObj) if (gObj.hasOwnProperty(p) && p.indexOf(prefix)===0) jObj[p] = gObj[p];
		var jsonString = JSON.stringify(jObj);
		print("Saving the following JSON string: " + jsonString); 
		var f = new File();
		f.Open(fileName,true);
		f.Write(jsonString);
		f.Close();
	};
	this.load = function () {
		var f = new File();
		if (f.Exists(fileName)) {
			f.Open(fileName);
			var jsonString = f.Read();
			f.Close();
			print("Loading the following JSON string: " + jsonString);
			var jObj = JSON.parse(jsonString);
			for (var p in jObj) if (jObj.hasOwnProperty(p) && p.indexOf(prefix)===0) gObj[p] = jObj[p];
		}
		else {
			print("File " + fileName + " does not exist!")
		}
	}
};

// ------------------------------------------------------------------------------

// This function returns an object whose nRows and nCols properties
// contain the number of rows and cols for the given format.
// e.g. if format is 96 => nRows and nCols will be 8 and 12 
function formatToDimensions(format) {
	var formatConv = {
		6: {nRows: 2, nCols: 3},
		12: {nRows: 3, nCols: 4},
		24: {nRows: 4, nCols: 6},
		48: {nRows: 6, nCols: 8},
		54: {nRows: 6, nCols: 9},
		96: {nRows: 8, nCols: 12},
		384:  {nRows: 16, nCols: 24},
		1536:  {nRows: 32, nCols: 48}
	};
	if (!formatConv.hasOwnProperty(format)) {
		print("formatToDimensions: wrong format")
		return false
	};
	return formatConv[format];
}

// ------------------------------------------------------------------------------

// This function converts a well address to an index.
// For example, in a 96-well plate, A1 has index 0 and H12 has index 95. What happens in between 
// depends on whether the wells are selected by column or by row. 
// In "byrow" mode A2 has index 1, whereas in "bycol" it has index 8.
// well: any string containing a well address
// mode: "byrow" or "bycol" (case insensitive)
// format: number of wells in the plate (see getWellselection())  
function wellToIndex(well,mode,format) {
	var mode = mode.replace(/\ /,"").toLowerCase();
	if (!well) {
		print("wellToIndex: no well address provided");
		return false;
	}
	if (mode !== "bycol" && mode !== "byrow" ) {
		print("wellToIndex: wrong mode");
		return false;
	}
	var dims = formatToDimensions(format);
	if (!dims) {
		print("wellToIndex: wrong format");
		return false;
	}
	var wellsel = getWellselection(well,format);
	if (!wellsel) {
		print("wellToIndex: wrong well for given format");
		return false;
	}
	var row = wellsel[0];
	var col = wellsel[1];
	if (mode === "byrow") {
		return (row-1)*dims.nCols + col - 1;
	}
	else if (mode === "bycol") {
		return (col-1)*dims.nRows + row - 1;
	} 
}

// ------------------------------------------------------------------------------

// This function uses an index as described in wellToIndex() to generate
// corresponding wellselection (as array, not array of arrays)
function indexToWellselection (index,mode,format) {
	var mode = mode.replace(/\ /,"").toLowerCase();
	var row, col;
	if (!index) {
		print("indexToWellselection: no index provided");
		return false;
	}
	if (mode !== "bycol" && mode !== "byrow" ) {
		print("indexToWellselection: wrong mode");
		return false;
	}
	var dims = formatToDimensions(format);
	if (!dims) {
		print("indexToWellselection: wrong format");
		return false;
	}
	if (mode === "byrow") {
		row = 1 + Math.floor(index/dims.nCols);
		col = 1 + index % dims.nCols;
	}
	else if (mode === "bycol") {
		row = 1 + index % dims.nRows;
		col = 1 + Math.floor(index/dims.nRows);
	}
	return [row,col];
}

// ------------------------------------------------------------------------------
	
// This function transform a wellselection ARRAY (not array of arrays) 
// into a well address
function wellselectionToWell (ws,pad) {
	if (!ws) {
		print("wellselectioToWell: no wellselection provided");
		return false;
	}
	var row = ws[0];
	var col = ws[1];
	var string = String.fromCharCode(65+(row-1)%26);
	if (Math.floor((row-1)/26) > 0) string += string;
	//return string+ ( "0000" + col).slice(-(pad ? pad : string.length));
	return string+col.zeropad(pad);
}

// ------------------------------------------------------------------------------
// end of VWorksExtLib.js
print("*** VWorksExtLib.js successfully loaded ***")

// finally load public domain JSON library (VWorks version)
// Thanks to Douglas Crockford: https://github.com/douglascrockford/JSON-js
if ((new File).Exists("C:/VWorks Workspace/VWorksExtLib/json2.js")) {
	open("C:/VWorks Workspace/VWorksExtLib/json2.js");
	print("*** Public domain json2.js successfully loaded ***");
};

