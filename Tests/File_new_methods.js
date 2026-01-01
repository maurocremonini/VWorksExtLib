// new methods for the File() constructor
    myFile = new File();
    testPath = rootPath+"Test123\\"; // backslash used intentionally
    ensureFolderExists(testPath); // helper function present in the library
// store the name in myFile.filename converting to forward slashes
    myFile.setFilename(testPath + "testfile.txt", true); $print(myFile.filename+"\n");
// Store content in myFile.filename (always overwrites).File content is automatically stored in myFile.content 
    myFile.writeFile("Greetings from VWorksExtLib!"); $print(myFile.content + "\n");
// Store content in myFile.filename (always appending).File content is automatically stored in myFile.content
    myFile.appendFile("\n...and hallo from VWorks, too!"); $print(myFile.content + "\n");
// overwrite file
    myFile.writeFile("And now the file has been overwritten."); $print(myFile.content + "\n");
// copy to another file in the same folder
    myFile.copyFile(myFile.filename.dirname()+"/testfile2.txt", true)
// list files in the folder
    fileList = myFile.readFolder(myFile.filename.dirname(), "*.txt"); $print(fileList + "\n");
// delete testfile2.txt
    myFile.deleteFile(myFile.filename.dirname()+"/testfile2.txt")
// list files in the folder again
    fileList = myFile.readFolder(myFile.filename.dirname(), "*.txt"); $print(fileList +"\n");
