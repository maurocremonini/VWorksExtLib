$print("***Dispensing 435 uL to each of 11 columns evenly using 250 uL tips:");
var tipCapacity = 250, vol = 435, nCols = 11;
var distrib = distributeCapacityEvenly(nCols, vol, tipCapacity,2);
$print("Value of distrib: " + distrib);
$print("Distribution cycles: " + distrib.nCycles + ", volume per cycle: " + distrib.capacityPerCycle);
$print("Actual distributed volume per unit: " + (distrib.capacityPerCycle * distrib.nCycles ) + " uL.");

$print("\n***Distributing 150 uL to 9 columns evenly using filtered 250 uL tips:");
$print("This time using only 1 decimal digit");
var tipCapacity = 180, vol = 150, nCols = 9;
var distrib = distributeCapacityEvenly(nCols, vol, tipCapacity,1);
$print("Value of distrib: " + distrib);
$print("Distribution cycles: " + distrib.nCycles + ", volume per cycle: " + distrib.capacityPerCycle);
$print("Actual distributed volume per unit: " + (distrib.capacityPerCycle * distrib.nCycles ) + " uL.");

$print("\n*** Error when bad input parameres are used (check the log): ");
var distrib = distributeCapacityEvenly(5, "abc", 180);
$print("Value of distrib: " + distrib);
