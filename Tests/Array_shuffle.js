// creating random permutations of elements in an array (useful for testing protocols with barcodes)
barcodes = "###,@@@,OOO,XXX,HHH".split(",");
for (i = 1; i < 10; i++) $print(barcodes.shuffle())

// tracking if the permutations match the expected probability
// here it can only be 123, 132, 213, 231, 312, 321
track = {}; 
numbers = [1,2,3];
nPerms = 100000;
for (i=0; i< nPerms; i++) {
    currPerm = numbers.shuffle().join("");
    track[currPerm] ? track[currPerm]++ : track[currPerm] = 1; 
};
$print();
$print("Expected probability: 16.7%");
$print("Results:")
for (p in track) $print(p + " --> " + Math.round(1000*track[p]/nPerms)/10 + "%");
