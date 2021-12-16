var dislikeElement

for (const element of document.querySelectorAll("#text")) {
    if (element.textContent.includes("Dislike")) {
        dislikeElement = element
    }
}

async function main(id, element) {
    // Fetches data from API.

    try {
        let secrets = await fetch(chrome.runtime.getURL('/secrets.json')).then(Response => {return Response.json()});
        let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=' + id + '&key=' + secrets["API"]
        const data = await fetch(url).then(Response => {return Response.json()});

        let statistics = data['items'][0]['statistics'];
        let dislikeCount = statistics['dislikeCount'];

        dislikeElement.innerHTML = dislikeCount
        console.log(statistics);
    } catch(e) {console.log(e)}
}

// Current page link
var href = window.location.href

// Covers the main situations that a link can be found in the page (Hopefully).
var videoID = href.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")
                .replace("youtube.com/", "")
                .replace("youtu.be/", "")
                .replace("/watch?v=", "")
                .replace("watch?v=", "");

main(videoID);   



// "content_scripts": [
//     {
//         "matches": ["*://*.youtube.com/*"],
//         "run_at": "document_end",
//         "css": ["main.css"],
//         "js": ["script.js"]
//     }
// ],