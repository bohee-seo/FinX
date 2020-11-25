Dim mySendKeys
Set mySendKeys = CreateObject("WScript.shell")


AIUtil.SetContext Device("Device")
Device("Device").App("FinX").Launch DoNotInstall, RestartApp

'AIUtil("input", "Username").Type "jojo"
AIUtil("input", "Password").Type "Adv@ntage123"
AIUtil("button", "Login").Click
AIUtil.FindTextBlock("Home").Click
wait 5
Set oAnchor = AIUtil.FindTextBlock("Your Balance", micFromLeft, 1)
beforeBalance= AIUtil.FindText(micAnyText, micWithAnchorAbove, oAnchor).GetText
print "beforebalance = " & beforeBalance

Device("Device").Back 'back to home

AIUtil.FindTextBlock("Bill Payment").Click
AIUtil.FindTextBlock("checking Account: 543875").Click
AIUtil.FindText("water").Click
AIUtil.FindTextBlock("Amount").Click

mySendKeys.SendKeys("5") 

AIUtil.FindTextBlock("Memo").Click

mySendKeys.SendKeys("Power Payment") 

AIUtil("button", "Make Payment").Click

wait 5

AIUtil("button", "Make Payment", micFromTop, 1).Click

AIUtil.FindTextBlock("OK").Click

Device("Device").Back  'back to home


AIUtil.FindTextBlock("Home").Click

wait 5
Set oAnchor = AIUtil.FindTextBlock("Created on", micFromLeft, 1)
afterBalance= AIUtil.FindText(micAnyText, micWithAnchorBelow, oAnchor).GetText
print "afterBalance = " & afterBalance

Device("Device").Back 'back to home

AIUtil("button", "Logout" + vbLf + "Log out of" + vbLf + "Advantage").Click














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
