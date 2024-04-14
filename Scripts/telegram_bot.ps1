Param (
	$Token = "your_token_HERE",  
	$ChatID =  "your_chat_ID_HERE",
	[Parameter(Position=0, ValueFromRemainingArguments=$true)] $MessageText = "Nothing to say..."
)

$url = "https://api.telegram.org/bot$Token/sendMessage?chat_id=$ChatID&text=$MessageText"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-RestMethod -Uri $url -Method Post 