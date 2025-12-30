var myTimeStamp = getTimeStamp();
$print("Current Time Stamp: " + myTimeStamp);

var myTimeStamp2 = getTimeStamp("DD/MM/YYYY-hh_mm_ss_a");
$print("\nCurrent Time Stamp: " + myTimeStamp2);

$print("\n*** You can also provide a Date object to getTimeStamp():");
var dateObject = new Date(1965,0,4,13,30,45); // January 4, 1965 13:30:45
var myTimeStamp3 = getTimeStamp("YYYY-MM-DD hh:mm:ss A", dateObject);
$print("\nTime Stamp: " + myTimeStamp3);
$print("\n" + getTimeStamp("YYYY-MM-DD HH:mm:ss a", new Date(2000,0,1,0,0,0)));
$print("\n" + getTimeStamp("YYYY-MM-DD HH:mm:ss a", new Date(2000,0,1,12,0,0)));

$print("\n*** Be careful when providing multiple tokens in the format string.");   
$print("*** They will all be replaced accordingly:");
var myTimeStamp4 = getTimeStamp("YYYY/MM/DD HH:MM:ss", new Date(2015,1,21,12,30,0));
$print("Time Stamp: " + myTimeStamp4 + " (MM is month, mm is minutes)");

