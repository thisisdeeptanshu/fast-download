Flask will be required<br>
as will yt-dlp which can be gotten from here: https://github.com/yt-dlp/yt-dlp#installation<br>
Under the INSTALLATION heading there is a RELEASE FILES subheading which has a Recommended subheading<br>
From there download "yt-dlp" and place it in the gui folder<br><br>
For the firefox extension go to about:debugging, on the left there is a "This Firefox" section. Once there, there is a button which reads "Load Temporary Add-on..." clicking on it will allow you to select a file, select the manifest.json file in the extensions/firefox folder. Now when you're on youtube, you can use the extension to download the current vid you're watching or all the vids open in different tabs.<br><br>
Also, with python's flask installed, in the gui folder, either run main_python or main_python3. This will allow the firefox extensions to work. The downloaded files will be present in the gui/downloads folder which will create itself if it doesn't exist.
