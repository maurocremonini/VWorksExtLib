<?xml version='1.0' encoding='ASCII' ?>
<Velocity11 file='Protocol_Data' md5sum='b50b540803ec310d25a44848feb962b5' version='2.0' >
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
' />
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
print(&quot;The array above can be written as --&gt; &quot; +  WSArray2String([[1,2],[3,4]]));

print(&quot;After running this a folder HELLO_FROM_VWEXTLIB will be added to c:/vworks workspace (please check)&quot;);
ensureFolderExists (&quot;C:/vworks workspace/HELLO_FROM_VWEXTLIB&quot;);


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
print(&quot;The element with key equal to abc is at index --&gt; &quot; + arr2.findIndex(function(el){return el.key === &quot;abc&quot;}));
print(&quot;The element with key equal to yyy is at index --&gt; &quot; + arr2.findIndex(function(el){return el.key === &quot;yyy&quot;}));
print(&quot;The last element with key equal to abc is at index --&gt; &quot; + arr2.findLastIndex(function(el){return el.key === &quot;abc&quot;}));
print(&quot;The last element with key equal to xxx is at index --&gt; &quot; + arr2.findLastIndex(function(el){return el.key === &quot;xxx&quot;}));

arr3 = [72,101,108,108,111,32,86,87,111,114,107,101,114,115,33];
print(&quot;\Array is now [72,101,108,108,111,32,86,87,111,114,107,101,114,115,33]&quot;)
print(&quot;Mapping ascii to text --&gt; &quot; + arr3.map(function (el) {return String.fromCharCode(el)}))
print(&quot;Adding 1000 to all numbers&quot; + arr3.map(function (el) {return 1000+el}))

arr4 = [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]
print(&quot;\nArray is now [\&quot;a\&quot;,\&quot;b\&quot;,\&quot;c\&quot;]&quot;)
print(&quot;Adding a trailing hash to each element --&gt; &quot; + arr4.forEach(function (el) {return el+&quot;#&quot;}))
print(&quot;Now the array is &quot; + arr4);
 



' />
					<Parameters >
						<Parameter Category='Task Description' Name='Task number' Value='3' />
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
						<Parameter Category='Task Description' Name='Task number' Value='4' />
						<Parameter Category='Task Description' Name='Task description' Value='JavaScript' />
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