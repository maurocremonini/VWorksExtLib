// create an empty array with 10 elements
myArr = new Array(10)

// fill all elements with zeros
myArr.fill(0); $print(myArr);

// fill elements 3 to 6 with "VWorks"
myArr.fill("VWorks", 3, 7); $print(myArr);

// fill last 3 elements with 99
myArr.fill(99, -3); $print(myArr);

// fill first 3 element with ("Hello")
myArr.fill("Hello",0,3); $print(myArr);

// fill elements last-but-one element with "#"
myArr.fill("#",-2,-1); $print(myArr);
