// Extract unique numbers
myArr = [10,30,50,50,2,5,4,20,30,30,7,6,7,6,2,3,4]
cbk = function (el) {return el === this.valueOf()};
myArr2 = myArr.unique(cbk);
$print(myArr2);


// Extract unique barcodes
myArr = [{barcode:"A004", vol:40}, {barcode:"A002", vol:20}, {barcode:"A004", vol:10}, {barcode:"A003", vol:40}];
cbk = function (el) {return el.barcode === this.barcode};
myArr2 = myArr.unique(cbk);
cbk2 = function(el) {return el.barcode};
$print(myArr2.map(cbk2))  