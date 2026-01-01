var f = new File();
var nonWrapperVersionPath = "C:/VWorks Workspace/VWorksExtLib/VWorksExtLib.js";
var wrapperPath13 = "C:/Program Files (x86)/Agilent Technologies/VWorks/jswrappertasks/VWorksExtLib.js";
var wrapperPath14 = "[olssvr]:VWorks Projects/VWorks/jswrappertasks/Tasks/VWorksExtLib.js";
var codelist = ";";
clearScreen();
if (typeof IsCompliantMode === "function") {
    $print("*** VWorks 14.x detected");
    VWELToUse = useWrapperVWEL ? wrapperPath14 : nonWrapperVersionPath;
}
else {
    $print("*** VWorks 13.x detected");
    VWELToUse = useWrapperVWEL ? wrapperPath13 : nonWrapperVersionPath;
};
if (f.Exists(VWELToUse)) {
    open(VWELToUse);
    $print("*** Using VWorksExtLib.js at:\n" + VWELToUse);
    rootPath = getVWorksExtLibRoot() + "Tests/";
    codelist = f.readFolder(rootPath,"*.js").filter(function (fn){return fn!=="master.js"}).join(";");
}
else {
    codelist = "*** VWorksExtLib.js not found!";
    $print("*** VWorksExtLib.js not found at:\n" + VWELToUse);
}

function $print (s) {formOutput2 += (s===undefined?"":s) + "\n"};
function clearScreen () {formOutput = ""; formOutput2 = "";};
function showExecCode (fn) {
    clearScreen();
    var f = new File()
    f.filename = rootPath + fn;
    formOutput = f.readFile();
    open(f.filename);
};
function installVWELWrapper() {
    var libFile = new File();
    libFile.filename = nonWrapperVersionPath;
    var iconFile = new File();
    iconFile.filename = nonWrapperVersionPath.dirname() + "VWorksExtLib.bmp";
    if (isVWorks14()) {
        // TBD
    }
    else {
        libFile.copyFile(wrapperPath13, true);
        iconFile.copyFile(wrapperPath13.dirname()+"Icons/"+iconFile.filename.basename(), true);
        $print("VWorksExtLib.js wrapper installed for VWorks 13.x");
    }
}
