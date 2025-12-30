// Use of isArray()
myArr = [1,4,6,7];
$print ("Is myArr an array? " + isArray(myArr));
myArr2 = 1234;
$print ("Is myArr2 an array? " + isArray(myArr2));

// Use of isWSArray() and WSArray2String()
myWellselArr = [[1,2],[2,2],[3,3],[4,4]]
$print ("\nIs myWellselArr a WS array?" + isWSArray(myWellselArr));
$print (WSArrayToString(myWellselArr));

myWellselArr2 = [[1,2],[2,2],[3,3],[4]]
$print ("\nIs myWellselArr2 a WS array? " + isWSArray(myWellselArr2));
$print (WSArrayToString(myWellselArr2));

myWellselArr3 = [[1,4],["e",4]]
$print ("\nIs myWellselArr3 a WS array? " + isWSArray(myWellselArr3));  

myWellselArr4 = "abc"
$print ("\nIs myWellselArr4 a WS array? " + isWSArray(myWellselArr4));  