// Starting array
myArr = [{barcode:"A004", vol:40}, {barcode:"A002", vol:20}, {barcode:"A001", vol:10}, {barcode:"A003", vol:40}];

// Search the index of the object whose barcode is A002 using a callback
cbk = function (el) {return el.barcode === this.valueOf()};
index = myArr.findIndex(cbk, "A002");
$print("findIndex() returned " + index);

// search for the first element matching vol equal to 40
cbk = function (el) {return el.vol === this.valueOf()};
index = myArr.findIndex(cbk, 40);
$print("findIndex() returned " + index);

// search for an occurrence of vol equal to 40 in any element > 0
cbk = function (el, ind) {if (ind > 0) return el.vol === this.valueOf()};
index = myArr.findIndex(cbk, 40);
$print("findIndex() returned " + index);
