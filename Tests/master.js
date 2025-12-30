
if (typeof IsCompliantMode === "function") {
    print("--> VWorks 14.x detected");
    // TBD for VWorks 14.x
}
else {
    print("--> VWorks 13.x detected");
    //open("C:/Program Files (x86)/Agilent Technologies/VWorks/jswrappertasks/VWorksExtLib.js");
    open("C:/VWorks Workspace/VWorksExtLib/VWorksExtLib.js");
};
rootPath = getVWorksExtLibRoot() + "Tests/";
f = new File()
codelist = f.readFolder(rootPath,"*.js").filter(function (fn){return fn!=="master.js"}).join(";");
clearScreen();

function $print (s) {formOutput2 += (s===undefined?"":s) + "\n"};
function clearScreen () {formOutput = ""; formOutput2 = "";};
function showExecCode (fn) {
    clearScreen();
    var f = new File()
    f.filename = rootPath + fn;
    formOutput = f.readFile();
    open(f.filename);
};