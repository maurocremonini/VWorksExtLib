    myFile = new File();
    testPath = rootPath+"Test123\\"; // backslash used intentionally
    ensureFolderExists(testPath); // helper function present in the library
    myFile.filename = testPath + "testfile.txt"; 
    filename2 = myFile.filename.dirname()+"/testfile2.txt";
    myFile.writeFile("Hello from VWorksExtLib!"); 
    $print("File content is: " + myFile.content + "\n");
    // copy to another file in the same folder
    myFile.copyFile(filename2, true)
    $print("After copying to another file in the same folder: ");
    myFile.readFolder(filename2.dirname()).forEach(function(f){$print("File in folder: " + f)});
    $print()
    // copy to the same file creating a backup in the same folder
    myFile.copyFile(filename2, true)
    $print("After copying to the same file with backup: ");
    myFile.readFolder(filename2.dirname()).forEach(function(f){$print("File in folder: " + f)});
    $print()
    // copy to the same file without overwriting
    myFile.copyFile(filename2, false)
    $print("After copying to the same file without overwriting: ");
    myFile.readFolder(filename2.dirname()).forEach(function(f){$print("File in folder: " + f)});

    