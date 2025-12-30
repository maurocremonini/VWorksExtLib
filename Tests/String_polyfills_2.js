// these methods are meant to be used with filenames and file content
filename = "c:\\abcd\\efg/myFile.csv"
$print("original filename --> " + filename);

filename = filename.toBackSlashes();
$print("filename.toBackSlashes() --> " + filename);
filename = filename.toForwardSlashes();
$print("filename.toForwardSlashes() --> " + filename);
$print("basename --> " + filename.basename());
$print("extname --> " + filename.extname());
$print("dirname --> " + filename.dirname());

content = "\nThis is content with \n\nempty lines and \n\ntrailing line feeds\n\n"
sep = "\n"+"=".repeat(15)+"\n";
$print("\nOriginal content:" +sep + content + sep);
content = content.stripEmptyLines();
$print("Sanitized content:" +sep + content + sep);
