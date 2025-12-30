// Given the object myObj
myObj = {name:"plate1", well: "B5", vol: "45", diluent: "120", liqClass: "fast aspirate", preaspirate: "5"};

// extract the property keys in an array
keys = Object.keys(myObj);
$print(keys);

// extract the propetry values in an array
values = Object.values(myObj);
$print()
$print(values);

// extract the entries as an array of arrays
$print()
entries = Object.entries(myObj);
cbk = function (el,ind,arr) {$print("Element " + ind + " --> " + el)};
entries.forEach(cbk);


