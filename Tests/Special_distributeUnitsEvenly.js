$print("***Distributing 40 uL to 10 columns evenly using filtered 250 uL tips:");
var tipCapacity = 180, vol = 40, nCols = 10;
var distrib = distributeUnitsEvenly(nCols, vol, tipCapacity);
$print("Value of distrib: " + distrib);
$print("Distribution cycles: " + distrib.nCycles + ", units per cycle: " + distrib.unitsPerCycle);
$print("NOT 4,4,2 units in 3 cycles.");

$print("\n***Distributing 25 uL to 11 columns evenly using 250 uL tips:");
var tipCapacity = 250, vol = 25, nCols = 11;
var distrib = distributeUnitsEvenly(nCols, vol, tipCapacity);
$print("Distribution cycles: " + distrib.nCycles + ", units per cycle: " + distrib.unitsPerCycle);
$print("NOT 10,1 units in 2 cycles.");

$print("\n*** Downstacking 16 plates from BC with only 3 available platepads");;
var nPlates = 16, nPad = 3;
var downstackDistrib = distributeUnitsEvenly(nPlates, 1, nPad);
$print("Distribution cycles: " + downstackDistrib.nCycles + ", units per cycle: " + downstackDistrib.unitsPerCycle);
$print("NOT 3,3,3,3,3,1 units in 6 cycles.");

$print("\n*** Error when volume exceeds tip capacity (check the log):");
var distrib = distributeUnitsEvenly(5, 200, 180);
$print("Value of distrib: " + distrib);
$print("\n*** Error with non numerical values (check the log):");
var distrib = distributeUnitsEvenly(10,"abc",250);
$print("Value of distrib: " + distrib);