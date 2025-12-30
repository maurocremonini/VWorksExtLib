labware1 = "96 Eppendorf Twin.tec PCR";
labware2 = "384 V11 ST70 Tip Box Standard";
labware3 = "non_existing_labware_entry"

cbk = function (el) {$print(el[0] + " --> " + el[1])};

// retrieving most useful parameters for labware 1
obj1 = plateInfo(labware1);
obj1 ? Object.entries(obj1).forEach(cbk) : $print("Can't find " + labware1);

// retrieving most useful parameters for labware 2
$print();
obj2 = plateInfo(labware2);
obj2 ? Object.entries(obj2).forEach(cbk) : $print("Can't find " + labware2);;

// retrieving most useful parameters for labware 3
$print();
obj3 = plateInfo(labware3);
obj3 ? Object.entries(obj3).forEach(cbk) : $print("Can't find " + labware3);;

