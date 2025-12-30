// Starting array
myArr = [{barcode:"A004", vol:40}, {barcode:"A002", vol:20}, {barcode:"A001", vol:10}, {barcode:"A003", vol:40}];

// search for the last element matching vol equal to 40
cbk = function (el) {return el.vol === this.valueOf()};
index = myArr.findLastIndex(cbk, 40);
$print("findLastIndex() returned " + index);

// search for an occurrence of vol equal to 40 in any element 
// excluding the last element
cbk = function (el, ind, arr) {if (ind < arr.length-1) return el.vol === this.valueOf()};
index = myArr.findLastIndex(cbk, 40);
$print("findLastIndex() returned " + index);
