// Using empty placeholders (each placeholder is substituted by the next argument in order)
myString = "Dispensing {} uL from {} to {} and mixing {} at location {}.\n";
$print(myString.format(30, "buffer", "cells", "cells", 4));

// Using indices in placeholders. Note the use of {{ and }} to escape the curly braces.
myString = "Dispensing {0} uL from {1} to {2} and mixing {2} at location \n{3} for {4} seconds. Placeholder {{2}} was replaced with 'cells'.\n";
$print(myString.format(10, "buffer", "cells", 4, 30));

// Using named placeholders and an object as argument[0]
myString = "Dispensing {vol} uL from {source} to {dest}.\nThe {dest} will be incubated at location {loc} for {time} minutes.\n";
$print(myString.format({vol: 10, source: "buffer plate", dest: "sample plate", loc: 4, time: 5}));

// Using indices in placeholders and an array as argument[0]
myString = "Dispensing {0} uL from {1} to {2} and shaking {2} at location {3}.\n";
$print(myString.format([100,"buffer", "samples", 9]));

// This generates an error (check the log for "format: placeholder mismatch. The string will not be changed.")
myString = "Dispensing {0} uL from {1} to {dest} and mixing {2} at location {3} for {4} seconds.\n";
$print(myString.format(10, "buffer", "cells", 4, 30));

// This generate another error (check the log for "format: argument[0] must be an object when using named placeholders")
// The string will not be changed.
myString = "Dispensing {vol} uL from {source} to {dest}.\nThe {dest} will be incubated at location {loc} for {time} minutes.\n";
$print(myString.format(10, "buffer plate", "sample plate", 4, 5));

