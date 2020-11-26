AIUtil.SetContext Device("Device")
Device("Device").App("FinX").Launch DoNotInstall, RestartApp

fromAccount=Datatable.Value("fromAccount", "Global")
toPayee=Datatable.Value("toPayee", "Global")  ' only "water" or "electricity" options are working 
amount=Datatable.Value("Amount", "Global")
memo=Datatable.Value("Memo", "Global")
'######################################################
'###Login
'######################################################
'AIUtil("input", "Username").TypeSecure Datatable.Value("userName", "Global")
AIUtil("input", "Password").TypeSecure Datatable.value("Password","Global")
AIUtil("button", "Login").Click
AIUtil.FindTextBlock("Navigation").CheckExists true

'######################################################
'###Check current Balance in Home
'######################################################
AIUtil.FindTextBlock("Home").Click
AIUtil.FindTextBlock("Last Transactions See all transactions").CheckExists true
Set oAnchor = AIUtil.FindTextBlock("Your Balance", micFromLeft, 1)
currentBalance= AIUtil.FindText(micAnyText, micWithAnchorAbove, oAnchor).GetText
beforeBalance=getBalance(currentBalance)
print "beforeBalance = " &beforeBalance
Device("Device").Back 'back to home

'######################################################
'###Bill Payment
'######################################################
AIUtil.FindTextBlock("Bill Payment").CheckExists true
AIUtil.FindTextBlock("Bill Payment").Click
AIUtil.FindTextBlock("Select Payee").CheckExists true
AIUtil.FindText(fromAccount).Click
'AIUtil.RunSettings.AutoScroll.Enable "right", 1
AIUtil.FindText(toPayee).Click
'AIUtil.RunSettings.AutoScroll.Enable "down", 2
AIUtil.FindTextBlock("Amount").Click
call setText(amount) 
print "Payment amount =  "&amount
AIUtil.FindTextBlock("Memo").Click
call setText(memo) 
AIUtil("button", "Make Payment").Click

AIUtil.FindTextBlock("Confirm Bill Payment").CheckExists true
AIUtil.FindText(fromAccount, micFromTop, 2).CheckExists true
AIUtil.FindText(toPayee).CheckExists true
AIUtil("button", "Make Payment", micFromTop, 1).Click
AIUtil.FindTextBlock("S Your Bill has been paid").CheckExists true
AIUtil.FindTextBlock("OK").Click
Device("Device").Back  'back to home
AIUtil.FindTextBlock("Navigation").CheckExists true

'#######################################################
'###Check current balance after bill payment
'#######################################################
AIUtil.FindTextBlock("Home").Click
AIUtil.FindTextBlock("Last Transactions See all transactions").CheckExists true
Set oAnchor = AIUtil.FindTextBlock("Your Balance", micFromLeft, 1)
currentBalance= AIUtil.FindText(micAnyText, micWithAnchorAbove, oAnchor).GetText
afterBalance=getBalance(currentBalance)
print "afterBalance = "&afterBalance

If int(afterBalance)=int(beforeBalance)-int(amount) Then
	Reporter.ReportEvent micPass, "Balance Check", "Current Balance after payment is correct"
	print beforeBalance&" - "&amount&" = "&afterBalance
Else
	Reporter.ReportEvent micFail, "Balance Check", "Current Balance after payment is not correct"
End If
Device("Device").Back 'back to home

'#########################################################
'###Logout
'#########################################################
AIUtil("button", "Logout" + vbLf + "Log out of" + vbLf + "Advantage").Click



Sub setText(textValue)
Dim mySendKeys
Set mySendKeys = CreateObject("WScript.shell")
mySendKeys.SendKeys(textValue)
End Sub




Function getBalance(byRef value)
	

	a = Split(value)
	         b = ubound(a)
	         
	         For i = 0 to b
		         'print "The value of array in " & i & " is :"  & a(i)
			         If i=1 Then
			         	getBalance = a(i)
			         	'print getBalance
			         End If
	         Next

End Function









'check exist'change to AIUtil.finedtext for all CheckExists

'AIUtill.FindText("Confirm").CheckExists true 
'AIUtill.FindTextBlock("account - 543875").CheckExists true
'AIUtill.FindTextBlock("To 201 - water").CheckExists true

'Function mySendKeys (text)
'Set mySendKeys = CreateObject("WScript.shell")
'mySendKeys.SendKeys (text)
'End  Function


'AIUtill.FindText("paid").CheckExists true
'AIUtil.FindTextBlock("Your Bill has been paid").Click
'AIUtil.FindTextBlock("Transaction Id :3168").Click
'AIUtil.FindTextBlock("New Balance : USD 612.94").Click
'AIUtill.FindText("hecking").CheckExists true
