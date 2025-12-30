myArr = [{barcode:"A004", vol:40}, {barcode:"A002", vol:20}, {barcode:"A001", vol:10}, {barcode:"A003", vol:40}];

//return an array of objects whose vol property is 40
cbk = function (el) {return el.vol === this.valueOf()};
result = myArr.filter(cbk, 40);
$print("resultArr contains " + result.length + " elements:");
cbk2 = function (el,ind,arr) {$print("Element " + ind + ": barcode " + el.barcode + ", vol: " + el.vol)};
result.forEach(cbk2);

// Use filter to select the unique elements in an array and return an array containing the unique plate names. 
myArr = [
    {name: "plate1", well: "A2"},{name: "plate2", well: "B10"}, {name: "plate1", well: "F8"}, {name: "plate2", well: "C4"},
    {name: "plate3", well: "G11"}, {name: "plate1", well: "D6"}, {name: "plate3", well: "B12"}, {name: "plate1", well: "H12"}
];

// Set up a filter function that extracts only the element whose name is "plate1"
// then print the contents of the resulting array. Note the use of map().
cbk = function (el) {return el.name === this.valueOf()};
cbk2 = function (el, ind) {$print("Element " + ind + ": name --> " + el.name + " well --> " + el.well)}
$print()
result = myArr.filter(cbk, "plate1")
result.forEach(cbk2);

