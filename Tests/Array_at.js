// creating an array and returning elements with negative indices
myArr = ["a","b","c","d","e","f","g","h"];
for (i = -1; i > -myArr.length-1; i--) $print("Element at index " + i + " --> " + myArr.at(i));
$print();
for (i = 0; i < myArr.length; i++) $print("Element at index " + i + " --> " + myArr.at(i));