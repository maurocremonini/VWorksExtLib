    myFile = new File();
    testPath = rootPath+"Test123\\"; // backslash used intentionally
    ensureFolderExists(testPath); // helper function present in the library
    myFile.filename = testPath + "testfile.txt"; 
    filename2 = myFile.filename.dirname()+"/testfile2.txt";
    filenameOL1 = "[olssvr]:vworks projects/vworks/general/testfileOL1.txt";
    filenameOL2 = filenameOL1.dirname() + "/testfileOL2.txt";

    myFile.writeFile("Hello from VWEL on VWorks OpenLab!"); 
    $print("File content is: " + myFile.content + "\n");
    // copy from HDD to OLSS folder 
    myFile.copyFile(filenameOL1, true);
    // copy from OLSS to OLSS
    myFile.filename = filenameOL1;
    myFile.copyFile(filenameOL2, true);
    // copy to the same file overwriting with backup
    myFile.copyFile(filenameOL2, true);
    // copy from OLSS to HDD 
    myFile.copyFile(filename2, true)
    // copy from OLSS to HDD overwriting with backup
    myFile.copyFile(filename2, true)
    