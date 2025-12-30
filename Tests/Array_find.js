// Starting array
myArr = [{barcode:"A004", vol:40}, {barcode:"A002", vol:20}, {barcode:"A001", vol:10}, {barcode:"A003", vol:20}];

// find the volume corresponding to "A002"
cbk = function (el) {return el.barcode === this.valueOf()};
result = myArr.find(searchFunction, "A002");
$print("Barcode " + result.barcode + " --> volume " + result.vol);
