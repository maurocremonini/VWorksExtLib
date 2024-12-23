open("C:/VWorks Workspace/VWorksExtLib/VWorksExtLib.js");

function quote(s) {return "\""+s+"\""}; 

function test (text, fn) {
	print("\"" + text +"\" ==> " + (fn() ? " PASSED" : " *** FAILED"));
}

function expect (actualResult) {	
	var results = {};
	results.actual = actualResult;
	print("\nActual: " + actualResult)
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
test ("Index of property a equal 'two' should be 1", function () {
	return expect(arr.findIndex(callback)).toBe(1);
})
test ("Last index of property a equal 'two' should be 3", function () {
	return expect(arr.findLastIndex(callback)).toBe(3);
})