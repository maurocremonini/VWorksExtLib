// Create a "wellselection" array for multi-dispensing to columns 1, 2, 4, 5, 7, 8
cols = [1,2,4,5,7,8];
cbk = function (acc,el) {acc.push([1,el]); return acc};
wsArr = cols.reduce(cbk, []);
$print("This is the resulting WS array:");
$print(WSArrayToString(wsArr));

