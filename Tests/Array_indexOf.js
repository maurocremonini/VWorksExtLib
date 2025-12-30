// Starting array
myArr = ["plateXXX", "plateABC", "plateXXX", "plateYYY", "plateZZZ"];

// searching for index for element "plateXXX" starting from the left
stringToSearch = "plateXXX";
index = myArr.indexOf(stringToSearch);
$print("indexOf() returned " + index);

// same as above starting from element 1
index = myArr.indexOf(stringToSearch,1);
$print("indexOf() returned " + index);

// same as above starting from element -2 (element 3)
index = myArr.indexOf(stringToSearch,-2);
$print("indexOf() returned " + index);
