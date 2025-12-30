$print("From well to well (round-trip using row-wise mode):");
["a1","b2","c3","aa4","af19","bb1","c15","h8"].forEach(function (well) {
    var w = getWellFromWellselection (getWellselectionFromIndex (getIndexFromWell (well, "byrow", 1536), "byrow", 1536), 1);
    $print("> " + well + " --> " + w);})
