open("C:/VWorks Workspace/VWorksExtLib/VWorksExtLib.js");

function quote(s) {return "\""+s+"\""}; 

function test (text, fn) {	
	print("\"" + text +"\" ==> " + (fn() ? " PASSED" : " *** FAILED"));
}

function expect (actualResult) {	
	var results = {};
	results.actual = actualResult;
	print("\nCommand returned: " + actualResult + " type: " + typeof actualResult);
	results.toBe = function (val) {return this.actual === val};
	results.toBeNull = function () {return this.actual === null};
	results.toBeUndefined = function () {return this.actual === undefined};
	results.toBeTruthy = function () {return !!this.actual === true};
	results.toBeFalsy = function () {return !!this.actual === false};
	results.toEqual = function (val) {return this.actual === val};
	results.toBeNaN = function (val) {return isNaN(this.actual)};
	return results;
}


/* function sum (a,b) {return a+b};
test("adds 1 + 2 to equal 3", function () {
	return expect(sum(1, 2)).toBe(3);
}); */


test ("Find indexOf C in array A,B,C,D,E,F - should be 2 ", function () {
	return expect(["A","B","C","D","E","F"].indexOf("C")).toBe(2);
})
test ("Find indexOf C in array A,B,C,D,E,F starting from 3  - should be -1 ", function () {
	return expect(["A","B","C","D","E","F"].indexOf("C",3)).toBe(-1);
})
test ("Find indexOf D in array A,B,C,D,E,F starting from -4  - should be 3 ", function () {
	return expect(["A","B","C","D","E","F"].indexOf("D",-4)).toBe(3);
})
test ("Find indexOf D in array A,B,C,D,E,F starting from -15  - should be 3", function () {
	return expect(["A","B","C","D","E","F"].indexOf("D",-15)).toBe(3);
})
test ("If startindex is higher than array len it returns -1", function () {
	return expect(["A","B","C","D","E","F"].indexOf("D",6)).toBe(-1);
})

test ("last index of C in array A,B,C,D,C,B,A should be 4", function () {
	return expect(["A","B","C","D","C","B","A"].lastIndexOf("C")).toBe(4);
})
test ("last index of C in array A,B,C,D,C,B,A with startindex -4 should be 2", function () {
	return expect(["A","B","C","D","C","B","A"].lastIndexOf("C",-4)).toBe(2);
})
test ("if fromIndex is lower than len it return -1", function () {
	return expect(["A","B","C","D","C","B","A"].lastIndexOf("C",-8)).toBe(-1);
})
test ("last index of A in array A,B,C,D,C,B,A with startindex 100 should be 6", function () {
	return expect(["A","B","C","D","C","B","A"].lastIndexOf("A",100)).toBe(6);
})
test ("last index of A in array A,B,C,D,C,B,A with startindex -7 should be 0", function () {
	return expect(["A","B","C","D","C","B","A"].lastIndexOf("A",-7)).toBe(0);
})
test ("last index of B in array A,B,C,D,C,B,A with startindex 2 should be 1", function () {
	return expect(["A","B","C","D","C","B","A"].lastIndexOf("B",2)).toBe(1);
})

// testing findIndex and findLastIndex
arr = [{a: "one", b: 1}, {a: "two", b: 2}, {a:"three", b: 3},{a: "two", b: 4},{a: "one", b: 5}];
callback = function (el,ind,arr) {if (el.a === "two") return true};
myObj = {one: 32, two: 56, three: 1, four: 1000};
callback2 = function (el,ind,arr) {if (this[el.a] === 56) return true};
test ("Index of property a equal 'two' should be 1", function () {
	return expect(arr.findIndex(callback)).toBe(1);
})
test ("Last index of property a equal 'two' should be 3", function () {
	return expect(arr.findLastIndex(callback)).toBe(3);
})
test ("Extracting property from array and using it for searching property in another obj (given as context). Should return 1 ", function () {
	return expect(arr.findIndex(callback2, myObj)).toBe(1);
})
test ("Extracting property from array and using it for searching property in another obj (given as context). Should return 3 ", function () {
	return expect(arr.findLastIndex(callback2, myObj)).toBe(3);
})
test ("How to set what to search from a context. Must return 1.", function () {
	searchObj = {searchVal: 20}; 
	callback3 = function (el) {if (el===this.searchVal) return true};
	return expect([10,20,30,20,50].findIndex(callback3, searchObj)).toBe(1);
})
test ("How to set what to search from a context. Must return 3.", function () {
	return expect([10,20,30,20,50].findLastIndex(callback3, searchObj)).toBe(3);
})

// testing map
arr = "ABC".split("");
callback = function(el, i, arr) {return "_"+el}; // places leading undescore
arr2 = ["a",,"b",,"c","d"];
obj1 = {A: 10, B: 20, C: 30};
callback2 = function (el,i,arr) {return this[el]};
arr3 = [,,"A",,"B",,"C"];
test ("Creates new array with underscores", function () {
	return expect(arr.map(callback).toString()).toBe("_A,_B,_C");
})
test ("Creates new array with underscores skipping empty elements", function () {
	return expect(arr2.map(callback).toString()).toBe("_a,,_b,,_c,_d");
})
test ("Using context", function () {
		return expect(arr.map(callback2, obj1).toString()).toBe("10,20,30");
})
test ("Using context and sparse array", function () {
	return expect(arr3.map(callback2, obj1).toString()).toBe(",,10,,20,,30");
})

// testing foreach
arr3 = [,,"A",,"B",,"C"];
callback4 = function(el, i, arr) {arr[i] = "_"+el}; // places leading undescore
test ("Add underscores", function () {
	return expect((arr3.forEach(callback4), arr3.toString())).toBe(",,_A,,_B,,_C"); // note the comma operator here
})
arr3 = [,,"A",,"B",,"C"];
obj = {ch: "#"};
callback4 = function (el, i, arr) {arr[i] = this.ch + el;}; // places leading char

test ("Add leading char from conteext. ", function () {
	return expect((arr3.forEach(callback4, obj), arr3.toString())).toBe(",,#A,,#B,,#C"); // note the comma operator here
})
