console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs;
let currfolder;

function secondsToMinutesSecond(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid Input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;

}
async function getSongs(folder) {
    currfolder = folder;
    let response = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let html = await response.text();

    let div = document.createElement("div")
    div.innerHTML = html;
    let as = div.getElementsByTagName("a")

    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        let songUrl = element.href;
        console.log(songUrl);
        if (songUrl.endsWith(".mp3.preview")) {
            // Remove .preview from the URL to play the actual song
            let modifiedUrl = songUrl.replace('.preview', '');
            songs.push(modifiedUrl.split(`/${folder}/`)[1]);
        }
    }

 

    let songUL = document.querySelector(".songlist ul")
    if (!songUL) {
        console.error('The song list UL element was not found.');
        return;
    }
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML += `<li> 
                                <img class="invert" src="music.svg" alt="">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Vivek</div>
                                </div>
                                <div class="playnow">
                                    <span>Play</span>
                                    <img class="invert" src="play.svg" width="35">
                                </div> 
                            </li>`;
    }

    // Attach an event listener to each song
    Array.from(songUL.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim().replaceAll(" ", "%20"));
        })
    })
    return songs;
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/mxplayer/" + track);
    currentSong.src = `/${currfolder}/` + track
    if (pause) {
        currentSong.play()
        play.src = "pause.svg"
    }


    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ");
    document.querySelector(".songtime").innerHTML = "00.00 / 00.00"
}

async function displayAlbums() {
    console.log("displaying albums")
    let response = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let html = await response.text();

    let div = document.createElement("div")
    div.innerHTML = html;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index]; 
        if (e.href.includes("/mxplayer") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
            let a = await fetch(`/mxplayer/${folder}/info.json`)
            let response = await a.json(); 
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
            <div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            console.log("Fetching Songs")
            songs = await getSongs(`mxplayer/${item.currentTarget.dataset.folder}`)  
            playMusic(songs[0])

        })
    })
}
async function main() {
    await getSongs("mxplayer/ncs");
    playMusic(songs[0], true)

    //Display all the album as playlist

    //Attach on event listener to play. next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "play.svg";
        }
    })

    // listen for timeplate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSecond(currentSong.currentTime)}:${secondsToMinutesSecond(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%"
    })


    previous.addEventListener("click", () => {
        console.log("previous clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index > 0) {
            playMusic(songs[index - 1], true);
        } else {
            console.log("Already at the first song");
        }
    });

    next.addEventListener("click", () => {
        console.log("next clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1], true);
        } else {
            console.log("Already at the last song");
        }
    });

    //Add an event to volume
    document.querySelector(".range input").addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100;
    });

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            const songs = await getSongs(`mxplayer/${item.currentTarget.dataset.folder}`);
            // You can add more code here to handle the songs, for example, updating the UI
        });
    });

}


main()
