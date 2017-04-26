<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1486466904349" ID="ID_462218128" MODIFIED="1486466927941" TEXT="Polaad-SalesTracker Rev-0.1">
<node CREATED="1486466904349" MODIFIED="1486466904349" POSITION="right" TEXT="High Level Flow">
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Master Data"/>
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Quota &amp; Rate Band Declaration"/>
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Booking Of Orders"/>
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Scheduling of Orders"/>
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Loading &amp; Delivery Of Orders"/>
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Market Trends"/>
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Freight Status &amp; Update"/>
</node>
<node CREATED="1486466904349" FOLDED="true" ID="ID_839003906" MODIFIED="1486466910858" POSITION="right" TEXT="Detailed Activities">
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Booking">
<node CREATED="1486466904349" MODIFIED="1486466904349" TEXT="Every day directors will declare the C&amp;F wise Quota &amp; Rate."/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Once this announcement is done then email/sms/notifications should be given to respective concerns"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Booking within Quota Limit">
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Next Activity will be Booking of Orders which can be done by">
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="C&amp;F"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Loading Person"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Marketing Team"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Directors"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Pls refer order booking screen from PDF for more details"/>
</node>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Some order will have special requirements">
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="System should have screen to get the special requirements.Refer Page No 30 For sample screen layout"/>
</node>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Once the order is submit, it will have Status = New"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="User should be able to view his list of Booking with Status">
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="If any order is having Special Requirement then it should be identified seperately."/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Similarly Such requirements should get authorized from Directors"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="If order is not confirmed then one can be able to">
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Confirm"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Modify"/>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Delete"/>
</node>
</node>
</node>
<node CREATED="1486466904350" MODIFIED="1486466904350" TEXT="Booking beyond Quota Limit">
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="In some cases C&amp;F will request for more no of qtys i.e. beyond his quota limit alloted to him"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="However in such scenarios these requests needs to divert to Directors Or Marketing Team For approval by notifying him"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Here directors can be able to edit the request. He can change">
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Qty"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Rate"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Delivery Period"/>
</node>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Once this change is done and approved by directors then notification should be generate to C&amp;F"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Now C&amp;F has to accept the changes done by Directors or Marketing Team"/>
</node>
</node>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Scheduling">
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Based on Booking Confirmations C&amp;F Agents Or Loading Persons can schedule the Order">
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="User will select Dealer ,Qty,Vehicle , No Of Deliveries"/>
</node>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="This will create datewise Scheduling List which will be having Status = New"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Now loading person will be able to view scheduling list">
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Here one should able to">
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Approve"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Hold"/>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Reject"/>
</node>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Once the status is changed for the Booking schedule,notification should be given to the respective C&amp;F"/>
</node>
</node>
<node CREATED="1486466904351" MODIFIED="1486466904351" TEXT="Delivery">
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="In this activity,the loading person will be able to view all confirmed schedules"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="From these confirmed schedules he can give final update with status">
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Not Confirm with reason"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Waiting with reason"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Confirm with Time Of Loading"/>
</node>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="On final status notifications can be given to C&amp;F,transporter"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Similarly one can have a view of today confirmed orders for delivery"/>
</node>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Stock Update">
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="System should have a screen to update the day-wise stock">
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Which can be maintained by">
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Location"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Compartment"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Size"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Specification"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Qty"/>
</node>
</node>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="By default it will populate yesterdays stock which can be editable"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="This stock get affected when actual delivery of the products is done"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="However system should have an mechanism by which it would able to">
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Show Available Stock"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Show Total Booked Stock"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Total Rejected Stock"/>
<node CREATED="1486466904352" MODIFIED="1486466904352" TEXT="Total Loading Stock"/>
</node>
</node>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Market Trends">
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="This is the information given by C&amp;F Or Marketing Field Persons"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="This is crucial information which provides ongoing rate band by different competitors"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="System will have a screen in which C&amp;F Agent will book timely information"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Things to capture">
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Brand"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Price"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Date &amp; Time"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Dealer Info"/>
</node>
</node>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Freight Status &amp; Update">
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="This is again crucial information gathered from C&amp;F Agents or Marketing Field Persons"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="It will give update on Freight amount by">
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Location"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Taluka"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="District"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Transpoter"/>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Vehicle"/>
</node>
</node>
<node CREATED="1486466904353" MODIFIED="1486466904353" TEXT="Assistant Functionalities">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Alongwith core functions, system should have additional functions like">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Dashboard">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="On Sucessfully login by user he will Dashboard as a default screen"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="From where he can navigate to various functions of the system"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Also view Pending notifications raised against him"/>
</node>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="User Management">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="It will standard User management function. It will have">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="User Creation / Registration"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Activation/Deactivation"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Timebased Login"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Password functions">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="ThumbPrint or Voice recognition"/>
</node>
</node>
</node>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Role &amp; Permission management">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="This module will define various Roles, System Elements and Access To Role Or Uer For such elements"/>
</node>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Notifications on important events">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="On certain important events/happennings system will generate the notification to the concerns for activity"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Events can be via">
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Notification Alert"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="Email"/>
<node CREATED="1486466904354" MODIFIED="1486466904354" TEXT="SMS"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="WhatsApp"/>
</node>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="For e.g. When C&amp;F Agent Confirms the Order then Notification to Loading Person for Approval should be sent"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Standard Market trend notifications to Director"/>
</node>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Masters Definition">
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Here standard Masters can be defined"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="System should have capability to define new Masters while doing transaction as well as from Masters Options"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Following Masters can be created">
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="User"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Role"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="C&amp;F"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Dealers">
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="End User? "/>
</node>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Transporters"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Material Master"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Customer"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Competitors"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Stock Yard Master"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Product Specification Master"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Units Location Master"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Terms of Payment Master"/>
</node>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Matrix for Activity v/s Alert "/>
</node>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Pleasant Graphical User Interface">
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="This project will be focused on devices like">
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Mobile First"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="iPad and Tablets"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Laptop/Desktop i.e. Standard Devices"/>
</node>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="It should be more responsive in nature">
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Click Once Naviation"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Filtered &amp; Summarized Information at a glance"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Google search and Autofill"/>
<node CREATED="1486466904355" MODIFIED="1486466904355" TEXT="Talkative User Input Controls And Tooltip Support"/>
<node CREATED="1486466904356" MODIFIED="1486466904356" TEXT="Provision for Wearable Interface"/>
<node CREATED="1486466904356" MODIFIED="1486466904356" TEXT="Voice interactive - Future"/>
<node CREATED="1486466904356" MODIFIED="1486466904356" TEXT="Provision to Link with To Do lists"/>
</node>
</node>
</node>
</node>
</node>
</node>
</map>
