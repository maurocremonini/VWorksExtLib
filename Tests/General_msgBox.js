// Message box using powershell. 
retVal = msgBox("This is the default msgBox");
$print("msgBox returned " + retVal)
msgBox("You selected " + retVal);


retVal = msgBox("This is msgBox with title, OK/Cancel and warning picture", "This is the WARNING title", "OKCancel", "Warning");
$print("\nmsgBox returned " + retVal)
msgBox("You selected " + retVal);

retVal = msgBox("This is msgBox with title, Yes/No/Cancel and question mark icon", "QUESTION!", "YesNoCancel", "Question");
$print("\nmsgBox returned " + retVal)
msgBox("You selected " + retVal);

retVal = msgBox("This is a msgBox with an error icon", "ERROR!", "YesNo", "Error");
$print("\nmsgBox returned " + retVal)
msgBox("You selected " + retVal);