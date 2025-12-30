// given an array of well addresses (space2 will be automatically removed)
wells = [" a 5 "," C5 "," O   16","m24"," a f 3 0 "];

// find the corresponding wellselections
$print("96-format plate");
cbk = function (el) {$print("> " + el.replace(/ /g,"").toUpperCase() + " --> " + getWellselection(el, this.valueOf()))};
wells.forEach(cbk, 96);
$print("384-format plate");
wells.forEach(cbk, 384);
$print("1536-format plate");
wells.forEach(cbk, 1536);

// it can also be used as a String method
$print("Used as String method. 24-format plate");
cbk = function (el) {$print("> " + el.replace(/ /g,"").toUpperCase() + " --> " + el.getWellselection(this.valueOf()))};
wells.forEach(cbk, 24);
