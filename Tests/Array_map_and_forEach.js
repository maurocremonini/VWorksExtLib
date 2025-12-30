// map returns a modified array
vols = [10,20,30,40,50];

// add 5 uL to a list of volumes
changeFunction = function (el) {return el + 5}
$print("map() - original array before the call: " + vols)
result = vols.map(changeFunction)
$print("map() - original array after the call: " + vols)
$print("result --> " + result)

// forEach only applies the callback to the elements of the array
$print()
logFunction = function (el, ind) {$print("Element " + ind + " --> " + el)} 
$print("forEach() - original array before the call: " + vols)
result = vols.forEach(logFunction)
$print("result --> " + result)
$print("forEach() - original array after the call: " + vols)