$print("Plate and well dimensions:");
[6,12,24,48,54,96,384,1536].forEach(function (format) {
    var dims = getDimensionsFromFormat(format);
    $print("> " + format + "-format plate: " + dims.nRows + " rows x " + dims.nCols + " columns.");})

$print("\nIndex from well using row-wise mode (6-format):");
["a1","a2","a3","b1","b2","b3"].forEach(function (well) {
    var index = getIndexFromWell(well, "byrow",6);
    $print("> " + well + " = " + index);
})

$print("\nIndex from well using column-wise mode (6-format):");
["a1","a2","a3","b1","b2","b3"].forEach(function (well) {
    var index = getIndexFromWell(well, "bycol",6);
    $print("> " + well + " = " + index);
})
