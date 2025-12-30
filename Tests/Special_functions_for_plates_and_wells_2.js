$print("Wellselection from index using row-wise mode (6-format):");
[0,1,2,3,4,5].forEach(function (index) {
    var ws = getWellselectionFromIndex(index, "byrow",6);
    $print("> " + index + " = [" + ws[0] + "," + ws[1] + "]");})

$print("\nWellselection from index using column-wise mode (6-format):");       
[0,1,2,3,4,5].forEach(function (index) {
    var ws = getWellselectionFromIndex(index, "bycol",6);
    $print("> " + index + " = [" + ws[0] + "," + ws[1] + "]");})    

$print("\nWell from wellselection:");
[[1,1],[2,16],[20,5],[7,8],[8,48],[32,13]].forEach(function (ws) {
    var well = getWellFromWellselection(ws,1);
    $print("> [" + ws[0] + "," + ws[1] + "] = " + well);})  