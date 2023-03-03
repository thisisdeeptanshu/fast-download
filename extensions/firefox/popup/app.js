/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {
      if (e.target.name === "all") {
        // console.debug(tabs);

        let querying = browser.tabs.query({
          "url": ["*://www.youtube.com/watch?*"]
        });
        querying.then((yt_tabs) => {
          let urls = "";
          yt_tabs.forEach((tab, i) => {
            urls += `url-${i}=${tab["url"]}&title-${i}=${tab["title"]}&`
          })
          urls += `size=${yt_tabs.length}`
          complete_url = "http://127.0.0.1:5000/?" + urls;

          // console.debug(tabs[0].url);
          // tabs[0].url = "https://www.youtube.com";
          browser.tabs.update({
            "url": complete_url
          })
        })
      } else if (e.target.name === "current") {
        // alert(tabs[0].url);
        if (tabs[0].url.includes("youtube.com")) {
          urls = "";
          urls += `url-0=${tabs[0].url}&title-0=${tabs[0].title}&`
          urls += `size=1`;
          complete_url = "http://127.0.0.1:5000/?" + urls;
          browser.tabs.update({
            "url": complete_url
          })
        } else {
          alert("open a youtube video first lol");
        }
      }
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(beastify)
      .catch(reportError);
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/content_script.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
