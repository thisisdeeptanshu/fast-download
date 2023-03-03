from flask import Flask, render_template, request, redirect
import os

app = Flask(__name__)

def download(urls):
	command = 'python3 yt-dlp -o downloads/videos/"%(title)s-%(id)s.%(ext)s" '
	for url in urls:
		new_command = command + f"\"{url}\""
		os.system(new_command)

def downloadmp3(urls):
	command = 'python3 yt-dlp --extract-audio --audio-format mp3 -o downloads/audios/"%(title)s-%(id)s.%(ext)s" '
	for url in urls:
		new_command = command + f"\"{url}\""
		os.system(new_command)

@app.route("/", methods=["GET", "POST"])
def home():
	if request.method == "POST":
		if "download" not in request.form and "download-mp3" not in request.form:
			key = None
			for i in request.form: key = int(i)

			full_url = ""
			args = request.args
			for i in range(0, int(args["size"])):
				if i != key:
					if i < key: _i = i
					else: _i = i - 1
					full_url += "url-" + str(_i) + "=" + args["url-" + str(i)] + "&"
					full_url += "title-" + str(_i) + "=" + args["title-" + str(i)] + "&"
			full_url += "size=" + str(int(args["size"]) - 1)

			return redirect("http://127.0.0.1:5000/?" + full_url)
		else:
			urls = []
			titles = []
			args = request.args
			for i in range(0, int(args["size"])):
				urls.append(args["url-" + str(i)])
			if (len(urls)):
				if "download-mp3" in request.form:
					downloadmp3(urls)
				else:
					download(urls)
				return "<h1>Completed Download :)</h1>"
			else:
				return "<h1>Bro what do you even expect me to do here?</h1>"

	else:
		if not request.args:
			return "<h1>AHHHHHHHHHHHHHHHHHHHHHHH</h1>"
		else:
			urls = []
			titles = []
			args = request.args
			for i in range(0, int(args["size"])):
				urls.append(args["url-" + str(i)])
				titles.append(args["title-" + str(i)])
			return render_template("download_confirmation.html", urls=urls, titles=titles, size=int(args["size"]))

if __name__ == "__main__":
    app.run(debug=True)