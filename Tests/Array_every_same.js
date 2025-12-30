// Given this "wellselection" array
myArr = [[1,3],[3,3],[7,3],[12,3]]

// Define the callback using the value of "this" passed in the function call.
// "el" is an array element that will be equated to the chosen "this" value.
cbk = function (el) {return el[1] === this.valueOf()};

// confirm that all pipetting actions happen at column 3
$print("Pipetting always happens at col 3: " + myArr.every(cbk, 3));

// Now we change one of the elements
myArr = [[1,3],[3,3],[7,7],[12,3]]
$print("Pipetting always happens at col 3: " + myArr.every(cbk, 3));

// Is any pipetting done at col 7? 
$print("Is any pipetting done at col 7: " + myArr.some(cbk, 7));

// Anything happening at col 10? 
$print("Is any pipetting done at col 10: " + myArr.some(cbk, 10));