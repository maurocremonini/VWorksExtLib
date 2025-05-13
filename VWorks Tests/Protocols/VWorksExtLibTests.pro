<?xml version='1.0' encoding='ASCII' ?>
<Velocity11 file='Protocol_Data' md5sum='ff830eec5e7054efc5bd839de6ab3787' version='2.0' >
	<File_Info AllowSimultaneousRun='1' AutoExportGanttChart='0' AutoLoadRacks='When the main protocol starts' AutoUnloadRacks='0' AutomaticallyLoadFormFile='1' Barcodes_Directory='' ClearInventory='0' DeleteHitpickFiles='1' Description='' Device_File='C:\VWorks Workspace\VWorksExtLib\VWorks Tests\Devices\platepad.dev' Display_User_Task_Descriptions='1' DynamicAssignPlateStorageLoad='0' FinishScript='' Form_File='' HandlePlatesInInstance='1' ImportInventory='0' InventoryFile='' Notes='' PipettePlatesInInstanceOrder='0' Protocol_Alias='' StartScript='' Use_Global_JS_Context='0' />
	<Processes >
		<Main_Processes >
			<Process >
				<Minimized >0</Minimized>
				<Task Name='BuiltIn::JavaScript' >
					<Enable_Backup >0</Enable_Backup>
					<Task_Disabled >0</Task_Disabled>
					<Task_Skipped >0</Task_Skipped>
					<Has_Breakpoint >0</Has_Breakpoint>
					<Advanced_Settings >
						<Setting Name='Estimated time' Value='5.0' />
					</Advanced_Settings>
					<TaskScript Name='TaskScript' Value='open(&quot;C:/VWorks Workspace/VWorksExtLib/VWOrksExtLib.js&quot;);
text = &quot;&quot;;' />
					<Parameters >
						<Parameter Category='Task Description' Name='Task number' Value='1' />
						<Parameter Category='Task Description' Name='Task description' Value='load library' />
						<Parameter Category='Task Description' Name='Use default task description' Value='0' />
					</Parameters>
				</Task>
				<Task Name='BuiltIn::JavaScript' >
					<Enable_Backup >0</Enable_Backup>
					<Task_Disabled >0</Task_Disabled>
					<Task_Skipped >0</Task_Skipped>
					<Has_Breakpoint >0</Has_Breakpoint>
					<Advanced_Settings >
						<Setting Name='Estimated time' Value='5.0' />
					</Advanced_Settings>
					<TaskScript Name='TaskScript' Value='print(&quot;Is this VWorks 14 --&gt; &quot; + isVWorks14());
print(&quot;Is [1,2,3] an array --&gt; &quot; + isArray([1,2,3]));

print(&quot;Is [[1,false],[3,{}]] a wellselection array --&gt; &quot; + isWSArray([[1,false],[3,{}]]));
print(&quot;Is [[1,2],[3,4]] a wellselection array --&gt; &quot; + isWSArray([[1,2],[3,4]]));
print(&quot;The array above can be written as --&gt; &quot; +  WSArray2String([[1,2],[3,4]])); // also check the Array map method 

print(&quot;After running this a folder HELLO_FROM_VWEXTLIB will be added to c:/vworks workspace (please check)&quot;);
ensureFolderExists (&quot;C:/vworks workspace/HELLO_FROM_VWEXTLIB&quot;);

task.pause();





  ' />
					<Parameters >
						<Parameter Category='Task Description' Name='Task number' Value='2' />
						<Parameter Category='Task Description' Name='Task description' Value='General functions' />
						<Parameter Category='Task Description' Name='Use default task description' Value='0' />
					</Parameters>
				</Task>
				<Task Name='BuiltIn::JavaScript' >
					<Enable_Backup >0</Enable_Backup>
					<Task_Disabled >0</Task_Disabled>
					<Task_Skipped >0</Task_Skipped>
					<Has_Breakpoint >0</Has_Breakpoint>
					<Advanced_Settings >
						<Setting Name='Estimated time' Value='5.0' />
					</Advanced_Settings>
					<TaskScript Name='TaskScript' Value='winePrice = {champagne: 500, chianti: 50, tavernello: 2, souvignon: 35}
print(&quot;An object called &apos;winePrice&apos; has just been created&quot;)
print(&quot;The object&apos;s keys are: &quot; + Object.keys(winePrice))
print(&quot;The object&apos;s values are: &quot; + Object.values(winePrice))
print(&quot;The object&apos;s entries are: &quot; + Object.entries(winePrice).map(function(el) {return &quot;[&quot;+el+&quot;]&quot;}))


task.pause();' />
					<Parameters >
						<Parameter Category='Task Description' Name='Task number' Value='3' />
						<Parameter Category='Task Description' Name='Task description' Value='funtions for arrays' />
						<Parameter Category='Task Description' Name='Use default task description' Value='0' />
					</Parameters>
				</Task>
				<Task Name='BuiltIn::JavaScript' >
					<Enable_Backup >0</Enable_Backup>
					<Task_Disabled >0</Task_Disabled>
					<Task_Skipped >0</Task_Skipped>
					<Has_Breakpoint >0</Has_Breakpoint>
					<Advanced_Settings >
						<Setting Name='Estimated time' Value='5.0' />
					</Advanced_Settings>
					<TaskScript Name='TaskScript' Value='//given this array find the first index of &quot;a&quot;
arr = [1,2,&quot;a&quot;,4,5,&quot;a&quot;,8,9];
print(&quot;\nArray is now [1,2,\&quot;a\&quot;,4,5,\&quot;a\&quot;,8,9]&quot;)
print(&quot;Index of a --&gt; &quot; + arr.indexOf(&quot;a&quot;))
print(&quot;Index of a starting from -4 --&gt; &quot; + arr.indexOf(&quot;a&quot;, -4))
print(&quot;Index of a starting from 4 --&gt; &quot; + arr.indexOf(&quot;a&quot;, 4))
print(&quot;Index of a starting from 6 --&gt; &quot; + arr.indexOf(&quot;a&quot;, 6))
print(&quot;Last index of a starting from -4 --&gt; &quot; + arr.lastIndexOf(&quot;a&quot;, -4))
print(&quot;Last index of a starting from 1 --&gt; &quot; + arr.lastIndexOf(&quot;a&quot;, 1))

arr2 = [{key:4},{key: 7},{key:10},{key:&quot;abc&quot;},{key:&quot;xyz&quot;},{key:&quot;abc&quot;}];
print(&quot;\nArray is now [{key:4},{key: 7},{key:10},{key:\&quot;abc\&quot;},{key:\&quot;xyz\&quot;},{key:\&quot;abc\&quot;}]&quot;)
print(&quot;The element with key &apos;abc&apos; is at index --&gt; &quot; + arr2.findIndex(function(el){return el.key === &quot;abc&quot;}));
print(&quot;The element with key &apos;yyy&apos; is at index --&gt; &quot; + arr2.findIndex(function(el){return el.key === &quot;yyy&quot;}));
print(&quot;The last element with key &apos;abc&apos; is at index --&gt; &quot; + arr2.findLastIndex(function(el){return el.key === &quot;abc&quot;}));
print(&quot;The last element with key &apos;xxx&apos; is at index --&gt; &quot; + arr2.findLastIndex(function(el){return el.key === &quot;xxx&quot;}));

arr3 = [72,101,108,108,111,32,86,87,111,114,107,101,114,115,33];
print(&quot;\nArray is now [72,101,108,108,111,32,86,87,111,114,107,101,114,115,33]&quot;)
print(&quot;Mapping ascii to text --&gt; &quot; + arr3.map(function (el) {return String.fromCharCode(el)}))
print(&quot;Adding 1000 to all numbers&quot; + arr3.map(function (el) {return 1000+el}))

arr4 = [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]
print(&quot;\nArray is now [\&quot;a\&quot;,\&quot;b\&quot;,\&quot;c\&quot;]&quot;)
print(&quot;Adding a trailing hash to each element --&gt; &quot; + arr4.forEach(function (el) {return el+&quot;#&quot;}))
print(&quot;Now the array is &quot; + arr4);
 
arr5 = [3,,4,,,,,,,6,,,,,10];
print(&quot;\nArray is now:  [3,,4,,,,,,,6,,,,,10]&quot;)
print(&quot;Removing &apos;holes&apos; from array with filter: &quot; + arr5.filter(function(el) {return !!el}));


arr6 = [{fuit:&quot;orange&quot;, color: &quot;orange&quot;},{fruit: &quot;apple&quot;, color: &quot;red&quot;}, 
           {fruit:&quot;lemon&quot;, color: &quot;yellow&quot;}, {fruit: &quot;grapes&quot;, color: &quot;green&quot;}]

print(&quot;\nArray is now [{fuit:\&quot;orange\&quot;, color: \&quot;orange\&quot;},{fruit: \&quot;apple\&quot;, color: \&quot;red\&quot;},{fruit:\&quot;lemon\&quot;, color: \&quot;yellow\&quot;}, {fruit: \&quot;grapes\&quot;, color: \&quot;green\&quot;}]&quot;)
print(&quot;Will use find to extract the object whose key is \&quot;lemon\&quot;&quot;)
obj = arr6.find(function(el){return (el.fruit === &quot;lemon&quot;)})
print(&quot;Found object &quot; + Object.entries(obj).map( function (el){ return &quot;obj.&quot;+el[0]+&quot;:&quot;+el[1]}).join(&quot; | &quot; ) )

arr7 = [1,1,1,1,1];
print(&quot;\nArray is now [1,1,1,1,1]&quot;)
print(&quot;Are all elements equal to 1? --&gt; &quot; + arr7.every(function(el) {return el===1}))
print(&quot;Are some of the elements equal to &apos;hello&apos;? --&gt; &quot; + arr7.some(function (el) {return el===&quot;hello&quot;}))

arr8 = [1,&quot;hello&quot;,1,1,1];
print(&quot;\nArray is now [1,&apos;hello&apos;,1,1,1]&quot;)
print(&quot;Are all elements equal to 1? --&gt; &quot; + arr8.every(function(el) {return el===1}))
print(&quot;Are some of the elements equal to &apos;hello&apos;? --&gt; &quot; + arr8.some(function (el) {return el===&quot;hello&quot;}))

arr9 = [1,5,4,8,9,10]
print(&quot;\nArray is now [1,5,4,8,9,10]&quot;)
print(&quot;The sum of the elements is &quot; + arr9.reduce(function(acc,el) {return acc+el},0))
print(&quot;Starting from an empty array let&apos;s create well addresses --&gt; &quot; + arr9.reduce(function(acc,el){acc.push(&quot;A&quot;+el);return acc},[]))

arr10 = new Array(10);
print(&quot;\nArray is now empty, length 10&quot;)
print(&quot;Flling the array with &apos;X&apos; from element 3 to 9 &quot; + arr10.fill(&quot;X&quot;,3,9))
print(&quot;Flling the array with &apos;O&apos; from element 0 to 4 &quot; + arr10.fill(&quot;O&quot;,0,4))
print(&quot;Flling the array with &apos;B&apos; from element -5 &quot; + arr10.fill(&quot;B&quot;,-5))

arr11 = [1,2,3,4,5]
print(&quot;\nArray is now [1,2,3,4,5]&quot;)
print(&quot;The element at position -3 is &quot; + arr11.at(-3))
print(&quot;The element at position -1 is &quot; + arr11.at(-1))
print(&quot;The element at position 4 is &quot; + arr11.at(4))

arr12 = [1,2,3,4,5,6,7,8]
print(&quot;\nArray is now [1,2,3,4,5,6,7,8]&quot;)
print(&quot;Randomizing the elements &quot; + arr12.shuffle())
print(&quot;Randomizing the elements &quot; + arr12.shuffle())
print(&quot;Randomizing the elements &quot; + arr12.shuffle())
print(&quot;Randomizing the elements &quot; + arr12.shuffle())



task.pause();

' />
					<Parameters >
						<Parameter Category='Task Description' Name='Task number' Value='4' />
						<Parameter Category='Task Description' Name='Task description' Value='Polyfills for Arrays' />
						<Parameter Category='Task Description' Name='Use default task description' Value='0' />
					</Parameters>
				</Task>
				<Task Name='BuiltIn::JavaScript' >
					<Enable_Backup >0</Enable_Backup>
					<Task_Disabled >0</Task_Disabled>
					<Task_Skipped >0</Task_Skipped>
					<Has_Breakpoint >0</Has_Breakpoint>
					<Advanced_Settings >
						<Setting Name='Estimated time' Value='5.0' />
					</Advanced_Settings>
					<TaskScript Name='TaskScript' Value='print(&quot;pad&quot;.repeat(10))
print(&quot;hello&quot;.padStart(16,&quot;pad&quot;))
print(&quot;hello&quot;.padEnd(16,&quot;pad&quot;))
print(&quot;12&quot;.zeropad(4))

print(&quot;B3&quot;.getWellselection(96))' />
					<Parameters >
						<Parameter Category='Task Description' Name='Task number' Value='5' />
						<Parameter Category='Task Description' Name='Task description' Value='JavaScript' />
						<Parameter Category='Task Description' Name='Use default task description' Value='1' />
					</Parameters>
				</Task>
				<Task Name='BuiltIn::User Message' >
					<Enable_Backup >0</Enable_Backup>
					<Task_Disabled >0</Task_Disabled>
					<Task_Skipped >0</Task_Skipped>
					<Has_Breakpoint >0</Has_Breakpoint>
					<Advanced_Settings >
						<Setting Name='Estimated time' Value='5.0' />
					</Advanced_Settings>
					<TaskScript Name='TaskScript' Value='if (!text) {
   print(&quot;Bad text, please retry&quot;);
   task.repeat();
}
else if (text === &quot;EXIT&quot;) {
   task.skip();
}
else if (text.indexOf(&quot;BEEP&quot;)&gt;-1) {
   text = text.replace(/^\s+/,&quot;&quot;).replace(/\s+/g,&quot; &quot;);
   pars = text.split(&quot; &quot;);
   beep(pars[1] ,pars[2]);
   text=&quot;&quot;;
   task.repeat();
}
else {
   speak (text, 1, 100);
   text = &quot;&quot;;
   task.repeat();
}
 ' />
					<Parameters >
						<Parameter Category='' Name='Title' Value='Beep and speak' />
						<Parameter Category='' Name='Body' Value='Input somthing. 

If you input the string BEEP XXX YYY (with XXX being a frequency and YYY a time in ms) a beep will be played, 
otherwise a female voice will be reading your text. 

Input EXIT (all caps) for continuing the protocol. 
' />
						<Parameter Category='' Name='Only show the first time' Value='' />
						<Parameter Category='' Name='Display dialog box' Value='1' />
						<Parameter Category='' Name='Pause process' Value='1' />
						<Parameter Category='' Name='Email' Value='0' />
						<Parameter Category='' Name='Twitter message' Value='0' />
						<Parameter Category='Scripting variable data entry' Name='User data entry into variable' Value='1' />
						<Parameter Category='Scripting variable data entry' Name='Variable name' Value='text' />
						<Parameter Category='Task Description' Name='Task number' Value='6' />
						<Parameter Category='Task Description' Name='Task description' Value='User Message' />
						<Parameter Category='Task Description' Name='Use default task description' Value='1' />
					</Parameters>
				</Task>
				<Plate_Parameters >
					<Parameter Name='Plate name' Value='JS Tests' />
					<Parameter Name='Plate type' Value='' />
					<Parameter Name='Simultaneous plates' Value='1' />
					<Parameter Name='Plates have lids' Value='0' />
					<Parameter Name='Plates enter the system sealed' Value='0' />
					<Parameter Name='Use single instance of plate' Value='0' />
					<Parameter Name='Automatically update labware' Value='0' />
					<Parameter Name='Enable timed release' Value='0' />
					<Parameter Name='Release time' Value='30' />
					<Parameter Name='Auto managed counterweight' Value='0' />
					<Parameter Name='Barcode filename' Value='No Selection' />
					<Parameter Name='Has header' Value='' />
					<Parameter Name='Barcode or header South' Value='No Selection' />
					<Parameter Name='Barcode or header West' Value='No Selection' />
					<Parameter Name='Barcode or header North' Value='No Selection' />
					<Parameter Name='Barcode or header East' Value='No Selection' />
				</Plate_Parameters>
				<Quarantine_After_Process >0</Quarantine_After_Process>
			</Process>
		</Main_Processes>
	</Processes>
</Velocity11>