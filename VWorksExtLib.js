///<?xml version='1.0' encoding='ASCII' ?>
///<Velocity11 file='MetaData' md5sum='00000000000000000000000000000000' version='1.0'>
///<Command Compiler='1' Description='VWorks Extension Library' Editor='-1' Name='VWorksExtLib'>
///	<Parameters>
///	</Parameters>
///</Command>
///</Velocity11>

function VWorksExtLib() {
    print("VWorks Extension Library Loaded (JS Wrapper version)");
}

function getVWorksExtLibVersion() {
	// Update this when releasing new versions!
	return "1.0.0";
}

// VWorksExtLib  - VWorks Extension Library
// Author: Mauro A. Cremonini
//
// **************************** DISCLAIMER ***********************************// 
// This project is developed and maintained in a personal capacity.           // 
// It is not affiliated with, endorsed by, or representative of my employer,  //
// Agilent Technologies. All code, opinions, and documentation are my own and //
// my employer bears no responsibility for any aspect of this work.           //
// Use the code at your own risk. Credits where credit is due.                //
// ***************************************************************************//
//
// ======================== GENERAL PURPOSE FUNCTIONS ===============================

// This function returns the root folder for VWorksExtLib.
// If getVWorksExtLibRoot() is defined in the relevant context before open()ing 
// VWorksExtLib.js, no redefinition will take plate. 
// Note that if getVWorksExtLibRoot exists it must return "something" 
// starting with "C:/VWorks Workspace/" (any casing). 
var getVWorksExtLibRoot  = (typeof getVWorksExtLibRoot === "function" &&  
							getVWorksExtLibRoot().toLowerCase().replace(/\\/g,"/").indexOf("c:/vworks workspace/")===0 && 
							getVWorksExtLibRoot) || 
	function () {return "C:/VWorks Workspace/VWorksExtLib/"}

// ------------------------------------------------------------------------------

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
	var cbk = function (el) {return (isArray(el) && el.length===2 && typeof el[0] === "number" && typeof el[1] === "number")};
	return a.every(cbk);
}

// ------------------------------------------------------------------------------

// This function uses "mkdir" to create a folder if not existent.
function ensureFolderExists (folder) {
	var folder = folder.toBackSlashes();
	var f = new File();
	var cmd = "cmd /c mkdir \"" + folder + "\"";
	if (!f.Exists(folder)) {
		print("Creating " + folder);
		run(cmd, true);
	}
	return;
}

// ------------------------------------------------------------------------------

// helper function for throwing TypeErrors if callback is not a function
function checkIfCallback (cb) {
	if (typeof cb === "function") return;
	var msg = "Warning: " + cb + " is not a function.";
	print(msg);
	throw new TypeError(msg);
}

// ------------------------------------------------------------------------------

// Pause for secs seconds
function sleep(secs) {
	run("cmd /c timeout /nobreak /t " + secs, true);
	return true
}

// ------------------------------------------------------------------------------

// WSArray2String returns a "task.wellselection-like" string,
// useful when checking AoA's for multiAsp or multiDisp.
function WSArrayToString(a) {
	if (!isWSArray(a)) {return "Not WS Array"};
	var cbk = function (acc, el, ind, arr) {acc.push("["+el.toString()+"]"); return acc;};
	var acc = a.reduce(cbk, []);
	return "[" + acc.join(",") + "]"
}

// ------------------------------------------------------------------------------

// This function uses powershell to make VWorks speak a text.
// text: a string with the text to be read aloud.
// voiceNum: an integer, 0 for "MS David" voice and 1 for "MS Zira".
// volume: an integer in the range 0-100.
// waitUntilCompletion: a boolean. If false the function will immediately return.
//                      Omit this parameter for normal use. 
function speak (text, voiceNum, volume, waitUntilCompletion) {
	voiceNum = String(voiceNum) || "1";
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
	run(cmd, waitUntilCompletion);
}

// ------------------------------------------------------------------------------

function alert() {
	beep(2500,300);
}

// ------------------------------------------------------------------------------

function msgBox (msg, title, buttons, type) {
	// see https://ss64.com/ps/messagebox.html
	// ButtonType	Value	Image		Value
	// OK			0		None		0	 	
	// OKCancel		1		Error		16	 	
	// YesNoCancel	3 		Question	32	 	
	// YesNo		4		Warning		48	 	
	// 						Information	64	 	 
	var msgBoxFile = (getVWorksExtLibRoot() + "MsgBox/response.txt").toBackSlashes();
	ensureFolderExists(msgBoxFile.dirname());
    var sQuote = function (s) {return "'" + s + "'"};
	var escDQuote = function (s) {return "\\\"" + s + "\\\""};
    var pre = "cmd /c powershell \"Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show(";
    var mb = [pre + escDQuote(msg)];
    mb.push(sQuote(title || ""));
    mb.push(sQuote(buttons || "OK"));	
    mb.push(sQuote(type || "None")+")");
	var cmd = mb.join(",") + " | Out-File -Filepath '" + msgBoxFile + "' -Encoding ascii \"";
    run(cmd, true);
	var f = new File();
	f.filename = msgBoxFile;
	return f.readFile().stripEmptyLines().trim();
}

// ======================== POLYFILLS FOR OBJECTS ===============================

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
	checkIfCallback(callback);
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
	checkIfCallback(callback);
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
	checkIfCallback(callback);
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
	// Return value: none.
	// Sparse arrays will still be sparse and callback will not be invoked on them. 
	checkIfCallback(callback);
    for(var i=0; i<this.length; i++){
		if (!(i in this)) continue;
        callback.apply(thisArg, [this[i], i, this]);
    }
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype.filter = function(callback, thisArg) {
	// Return value:
	// A shallow copy of the given array containing just the elements that pass the test. 
	// If no elements pass the test, an empty array is returned.
	checkIfCallback(callback);
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
	checkIfCallback(callback);
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
	checkIfCallback(callback);
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
	checkIfCallback(callback);
    for(var i=0; i<this.length; i++){
		if (!(i in this)) continue;
        if (callback.apply(thisArg, [this[i], i, this])) return true;
    }
    return false;
}

// ------------------------------------------------------------------------------

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
Array.prototype.reduce = function(callback, initialValue) {
	checkIfCallback(callback);
	if (this.length === 0 && !initialValue) {print("Error in reduce"); throw new TypeError("Reduce failed");}
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

// This Array method returns the unique elements in an array. 
// callback: equality checker to be used for the some() method.  
Array.prototype.unique = function (callback) {
	checkIfCallback(callback);
	var reduceCallback = function (acc, el) {
		if (!acc.some(callback,el)) acc.push(el);
		return acc;
	}
	return this.reduce(reduceCallback,[]);
}

// ------------------------------------------------------------------------------

// This Array methods scrambles the elements of an array using the Fisher-Yates Shuffle Algorithm.
// OLD VERSION
Array.prototype.shuffleOLD = function () {
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

// ------------------------------------------------------------------------------

// This Array methods scrambles the elements of an array using the Fisher-Yates Shuffle Algorithm.
Array.prototype.shuffle = function () {
	var arrCpy = this.slice();
    var cbk = function (el, ind, arr) {
		if (ind === arr.length-1) return arr[ind];
		var tmp, range = arr.length - ind;
		var rnd = Math.floor(ind + range * Math.random());
		if (rnd === ind) return arr[ind];
		tmp = arr[ind]; 
		arr[ind] = arr[rnd];
		arr[rnd] = tmp;
		return arr[ind]
	}
	arrCpy.forEach(cbk);
	return arrCpy; 
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

// ------------------------------------------------------------------------------

// return filename without path
String.prototype.basename = function () {
	return (this.split(/[\/\\]/)).at(-1);
}

// ------------------------------------------------------------------------------

// return folder name with final "/"
String.prototype.dirname = function () {
	return (this.split(/[\/\\]/)).slice(0,-1).join("/")+"/";
}

// ------------------------------------------------------------------------------

// return file extension
String.prototype.extname = function () {
	return (this.split(".")).at(-1);
}

// ------------------------------------------------------------------------------

// turn all backslashes into forward slashes
String.prototype.toBackSlashes = function () {
	return this.replace(/\//g, "\\");
}

// ------------------------------------------------------------------------------

// turn all backslashes into forward slashes
String.prototype.toForwardSlashes = function () {
	return this.replace(/\\/g, "/");
}

// ------------------------------------------------------------------------------

// remove all \r, \n at the beginning of a lines and (\r)\n at end of content
String.prototype.stripEmptyLines = function () { 
	return this.replace(/\r/g,"").replace(/^\n/gm,"").replace(/[^\S\n\r]*\r?\n$/, "");
}

// ======================= NEW METHODS FOR THE MATH OBJECT ==================

// This methods rounds to d decimal digits
Math.roundTo = function (x, d) { 
	var x = parseFloat(x); 
	var d = Math.abs(parseInt(d));
	if (isNaN(x)) return NaN;
	if (isNaN(d)) return x;
	var factor = this.pow(10,d);
	return this.round(x*factor)/factor;
}

// ======================= NEW METHODS FOR THE FILE() CONSTRUCTOR ==================

// fn: filepath, forwardSlashes: changes backslashes to forward slashes (useful for VWorks 14.x).
// The filename is set in the "filename" property.
File.prototype.setFilename = function (fn, forwardSlashes) {
	if (!fn) {print("setFilename: no filename provided."); return false};
	this.filename = forwardSlashes ?  fn.toForwardSlashes() : fn;
}

// ------------------------------------------------------------------------------

// This method reads the content of the file and stores it in the "content" property
File.prototype.readFile = function () {
	if (!this.filename) {print("readFileContent: set the filename property first."); return false};
	if (!this.Exists(this.filename)) {alert(); print("readFileContent: file not found."); return false};
	this.Open(this.filename);
	this.content = this.Read();
	this.Close();
	return this.content;
}

// ------------------------------------------------------------------------------

// This method saves "content" to this.filename (overwriting the file!).
// If content is an array then the separator "sep" is used to separate the elements of the array
// and "\n" is added at the end.
// "suppressCRLF" is passed to Open() as third argument. 
File.prototype.writeFile = function (content, sep, suppressCRLF) {
	if (!this.filename) {alert(); print("writeToFile: set the filename first."); return false}; 
	var txt = isArray(content) ? content.join(sep) + "\n" : content;
	this.Open(this.filename, true, suppressCRLF);
	this.Write(txt);
	this.Close();
	this.readFile();
	return true;
}

// ------------------------------------------------------------------------------

// This method appends "content" to this.filename.
// See "writeFile" for the meaning of the parameters.
File.prototype.appendFile = function (content, sep, suppressCRLF) {
	if (!this.filename) {alert(); print("writeToFile: set the filename first."); return false}; 
	var txt = isArray(content) ? content.join(sep) + "\n" : content;
	this.Open(this.filename, false, suppressCRLF);
	this.Write(txt);
	this.Close();
	this.readFile();
	return true;
}

// ------------------------------------------------------------------------------

// This method first reads the content of this.filename and then stores it in the 
// filepath "fn2". If fn2 exists and overwrite is false, no copy will happen. 
File.prototype.copyFile = function (fn2, overwrite) {
	if (!this.filename) {alert(); print("copyFile: set the filename first."); return false};
	if (!overwrite && this.Exists(fn2)) {alert(); print("copyFile: target file exists. Can't copy."); return false};
	var cmd = "cmd /c copy /Y \"" + this.filename.toBackSlashes() + "\" \"" + fn2.toBackSlashes() + "\"";
	run(cmd, true)
	return true;
}

// ------------------------------------------------------------------------------

// Delete file (added for naming consistency) 
File.prototype.deleteFile = function (fn) {
	if (!this.Exists(fn)) {alert(); print("deleteFile: file not found."); return false};
	this.Delete(fn);
	return true;
};

// ------------------------------------------------------------------------------

// This method lists the files in a folder using:
// "cd <folder> & dir /b <folder> <pattern> > <outFile>"
// folder: the required folder 
// patter: like "*.*" or "*.txt"
// outFile: (generally not required) a temporary file in <folder>
File.prototype.readFolder = function (folder, pattern, outFile)  {
	if (!folder) {alert(); print("readFolder: no folder provided."); return false};
	var pattern = pattern || "*.*";
	var outFile = outFile || "__readFolder";
	var dosFolder = folder.toBackSlashes()//replace(/\//g, "\\").replace(/[\/\\]$/,"");
	if (!this.Exists(dosFolder)) {alert(); print("readFolder: folder not found."); return false};
	var command = "cd " + dosFolder + " & dir /b " + pattern + " > " + outFile;   
	run("cmd /c " + command, true);
	this.Open(folder + outFile);
	var folderContent = (this.Read()).stripEmptyLines();
	this.Close();
	this.Delete(folder + outFile);
	return folderContent.split("\n").filter(function (el) {return !!el});
}

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
	var plateType = plateType.toString().replace(filterSpaces,"");
	if (!filterType.test(plateType)) {print("getWellselection: bad plate type \"" + plateType +"\""); return false};
	var well = well.toString().toUpperCase().replace(filterSpaces,"");
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

// This constructor simulates WaitFor/Signal pairs.
// It is useful when preventing a subprocess from starting while waiting 
// from "something" to happen. 
// dontReset: generally not provided. If provided, the WaitFor will not block  
// after the first signal is received. 
function Signal (dontReset) {
   if (!(task && task.getProtocolName())) {
      print("Warning: Signal() must only be instantiated in a protocol.");
      return false;
   }
   var signaled = false;
   this.waitForSignal =function (delay, message) {
      signaled ? (signaled=!!dontReset, task.skip()) : task.repeatDelay(delay);
      message && print(message);
   }
   this.sendSignal = function (message) {
      signaled = true;
      message && print(message);
   }
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

// This constructor is useful to extract variables 
// having a certain prefix from a form and store them in a JSON file. 
// It is also possible to extract variables whose names are contained 
// in an external file (one per line). 
// External file will take precedence over prefix. 
// The form variables are supposed to be in the global context and will be stored 
// in the global context when read from the JSON file. 

function MethodManager (path, prefix, fileExt, varFile) {
	if (typeof JSON.stringify !== "function" || typeof JSON.parse !== "function") {
		alert();
		print("No JSON object available: aborting.")
		return false
	};
	if (varFile) {
		var f = new File();
		if (!f.Exists(varFile)) {alert(); print(varFile + " not found: aborting."); return false}
		var varFile = varFile.toForwardSlashes();
		f.Open(varFile);
		var variableList =  f.Read().stripEmptyLines().split("\n");
		f.Close();
	}
	if (!path) {alert(); print("Missing path."); return false;} 
	var variableList = variableList || undefined;
	var path = path.toForwardSlashes();
	var fileExt = fileExt || "json";
	var fileExt = "." + fileExt.replace(/^\.+/,""); 
	var prefix = prefix || ""; 
	var pattern = "*" + fileExt;
	var gObj = GetGlobalObject();
	var sanitize = function (fn) {
		var fn = String(fn);
		fn = path + fn.basename(); 
		var regEx = new RegExp("("+fileExt+")+");
		return fn.replace(regEx,"")+fileExt;
	}
	this.saveMethod = function (fileName, overwrite) {
		if (!fileName) {alert(); print("No filename provided."); return false;} 
		var fileName = sanitize(fileName);
		var f = new File();
		if (!overwrite && f.Exists(fileName)) {alert(); print("File exists."); return false;} 
		var jObj = {};  
		if (variableList){
			for (var i = 0; i < variableList.length; i++) jObj[variableList[i]] = gObj[variableList[i]];
		}
		else {
			for (var p in gObj) if (gObj.hasOwnProperty(p) && p.indexOf(prefix)===0) jObj[p] = gObj[p];
		};
		var jsonString = JSON.stringify(jObj, false, 1);
		//print("Saving the following JSON string: " + jsonString); 
		f.Open(fileName, overwrite);
		f.Write(jsonString);
		f.Close();
		return true;
	};
	this.loadMethod = function (fileName) {
		if (!fileName) {alert(); print("No filename provided."); return false;} 
		var fileName = sanitize(fileName);
		var f = new File();
		if (!f.Exists(fileName)) {alert(); print("Can't find " + fileName +"."); return false;} 
		f.Open(fileName);
		var jsonString = f.Read();
		f.Close();
		//print("Loading the following JSON string: " + jsonString);
		var jObj = JSON.parse(jsonString);
		for (var p in jObj) if (jObj.hasOwnProperty(p)) gObj[p] = jObj[p];
		return true;
	}
	this.deleteMethod = function (fileName, enable) {
		if (!fileName) {alert(); print("No filename provided."); return false;} 
		var fileName = sanitize(fileName);
		var f = new File();
		if (!f.Exists(fileName)) {alert(); print("Can't find " + fileName +"."); return false;} 
		if (!enable && f.Exists(fileName)) {alert(); print("Delete disabled: can't proceed."); return false;} 
		f.Delete(fileName);
		sleep(1); 
		return true;
	}
	this.listMethods = function () {
		var f = new File();
		var list = f.readFolder(path, pattern); 
		return list.length ? list : ["No matching files"];
	}
};

// ------------------------------------------------------------------------------

// This function returns an object whose nRows and nCols properties
// contain the number of rows and cols for the given format.
// e.g. if format is 96 => nRows and nCols will be 8 and 12 
function getDimensionsFromFormat(format) {
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
	if (!formatConv.hasOwnProperty(format)) {print("getDimensionsFromFormat: wrong format");return false};
	return formatConv[format];
}
// setting an alias in case the older name is used in existing protocols
var formatToDimensions = getDimensionsFromFormat;

// ------------------------------------------------------------------------------

// This function converts a well address to an index.
// For example, in a 96-well plate, A1 has index 0 and H12 has index 95. What happens in between 
// depends on whether the wells are selected by column or by row. 
// In "byrow" mode A2 has index 1, whereas in "bycol" it has index 8.
// well: any string containing a well address
// mode: "byrow" or "bycol" (case insensitive)
// format: number of wells in the plate (see getWellselection())  
function getIndexFromWell(well,mode,format) {
	var mode = mode.replace(/\ /,"").toLowerCase();
	if (!well) {print("getIndexFromWell: no well address provided");return false};
	if (mode !== "bycol" && mode !== "byrow" ) {print("getIndexFromWell: wrong mode");return false};
	var dims = getDimensionsFromFormat(format);
	if (!dims) {print("getIndexFromWell: wrong format");return false};
	var wellsel = getWellselection(well,format);
	if (!wellsel) {print("getIndexFromWell: wrong well for given format");return false};
	var row = wellsel[0];
	var col = wellsel[1];
	return mode === "byrow" ? (row-1)*dims.nCols + col - 1 : (col-1)*dims.nRows + row - 1;
}
// setting an alias in case the older name is used in existing protocols
var wellToIndex = getIndexFromWell;

// ------------------------------------------------------------------------------

// This function uses an index as described in getIndexFromWell() to generate
// corresponding wellselection (as array, not array of arrays)
function getWellselectionFromIndex (index,mode,format) {
	var mode = mode.replace(/\ /,"").toLowerCase();
	var row, col;
	if (index===undefined) {print("getWellselectionFromIndex: no index provided");return false};
	if (mode !== "bycol" && mode !== "byrow" ) {
		print("getWellselectionFromIndex: wrong mode");
		return false;
	}
	var dims = getDimensionsFromFormat(format);
	if (!dims) {
		print("getWellselectionFromIndex: wrong format");
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
// setting an alias in case the older name is used in existing protocols
var indexToWellselection = getWellselectionFromIndex;

// ------------------------------------------------------------------------------
	
// This function transform a wellselection ARRAY (not array of arrays) 
// into a well address
function getWellFromWellselection (ws,pad) {
	if (!ws) {print("getWellFromWellselection: no wellselection provided"); return false};
	var row = parseInt(ws[0]);
	var col = parseInt(ws[1]);
	var str = String.fromCharCode(65+(row-1)%26);
	if (Math.floor((row-1)/26) > 0) str = "A" + str;
	return str+col.toString().zeropad(pad);
}
// setting an alias in case the older name is used in existing protocols
var wellselectionToWell = getWellFromWellselection;

// ------------------------------------------------------------------------------
// end of VWorksExtLib.js
print("*** VWorksExtLib.js successfully loaded ***")

// ------------------------------------------------------------------------------

// Now include json2.js for JSON support.
// Thanks to Douglas Crockford, code from https://github.com/douglascrockford/JSON-js

//  json2.js
//  2017-06-12
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(
//                         +a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]
//                      ));
//                  }
//                  return value;
//              }
//          });

//          myData = JSON.parse(
//              "[\"Date(09/09/2001)\"]",
//              function (key, value) {
//                  var d;
//                  if (
//                      typeof value === "string"
//                      && value.slice(0, 5) === "Date("
//                      && value.slice(-1) === ")"
//                  ) {
//                      d = new Date(value.slice(5, -1));
//                      if (d) {
//                          return d;
//                      }
//                  }
//                  return value;
//              }
//          );

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return (n < 10)
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? (
                    this.getUTCFullYear()
                    + "-"
                    + f(this.getUTCMonth() + 1)
                    + "-"
                    + f(this.getUTCDate())
                    + "T"
                    + f(this.getUTCHours())
                    + ":"
                    + f(this.getUTCMinutes())
                    + ":"
                    + f(this.getUTCSeconds())
                    + "Z"
                )
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (
            value
            && typeof value === "object"
            && typeof value.toJSON === "function"
        ) {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return (isFinite(value))
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? (
                            "[\n"
                            + gap
                            + partial.join(",\n" + gap)
                            + "\n"
                            + mind
                            + "]"
                        )
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                (gap)
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                (gap)
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" && (
                typeof replacer !== "object"
                || typeof replacer.length !== "number"
            )) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return (
                        "\\u"
                        + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    );
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());

print("*** Public domain json2.js successfully loaded ***");
print("VWEL root path is " + getVWorksExtLibRoot());
ensureFolderExists(getVWorksExtLibRoot());
print("VWEL JSWrapper version is " + getVWorksExtLibVersion());