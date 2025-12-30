// Starting array
myArr = ["plateXXX", "plateABC", "plateXXX", "plateYYY", "plateZZZ"];

// searching for index for element "plateXXX" starting from the right
stringToSearch = "plateXXX";
index = myArr.lastIndexOf(stringToSearch);
$print("lastIndexOf() returned " + index);

// same as above starting from element 1
index = myArr.lastIndexOf(stringToSearch,1);
$print("lastIndexOf() returned " + index);

// same as above starting from element -4 (element 1)
index = myArr.lastIndexOf(stringToSearch,-4);
$print("lastIndexOf() returned " + index);
