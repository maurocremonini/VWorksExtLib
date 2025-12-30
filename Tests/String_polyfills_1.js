// remove leading and trailing non printable characters 
myString = "\t\t  \n  \n\r   this is a string \t  \v \f\n      ";
$print("String before trim:\n\"" + myString + "\"");
$print("String after trim:\n\"" + myString.trim() + "\"");
$print();

// pad a string with leading "#" to a length of 3 characters
for (i=8; i < 12; i++) $print(String(i).padStart(4,"#"));
$print();

// zeropad(n) is a shorthand for padStart(n, "0")
myString = "13";
$print(myString.zeropad(4));
$print()

// pad a string with trailing "*" to a length of 5 characters
for (i=8; i < 12; i++) $print(String(i).padEnd(5,"*"));
$print()

// creating a repetition of a string
myString="@#_";
$print(myString.repeat(5));