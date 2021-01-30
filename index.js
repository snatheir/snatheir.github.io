let state;

function seek(index){
    player.getIframe().style.display = "flex"
    done = false;
    if(player){
        player.seekTo(timePoints[index], true);
    }
    state = index;
    console.log(timeLapses[state]);
}


let timePoints = [0, 4, 8, 16, 20, 24, 30]
let timeLapses = [4000, 4000, 8000, 4000, 4000, 6000, 25000]


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: 'VUY-rizctHA',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
      console.log(timeLapses[state]);
    setTimeout(stopVideo, timeLapses[state]);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
  player.getIframe().style.display = "none"
}