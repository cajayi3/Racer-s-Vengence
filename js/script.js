console.log("Hello Matrix")
const clientId = 'f6d77df9dd6a4d04bd94f0691a985ac6'
const clientsecret = '9766738056ed48759a6708c9776b8dda'
let token


//'https://accounts.spotify.com/api/token'

async function getToken(){
    const res = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        body: "grant_type=client_credentials",
        headers: {
            Authorization : `Basic ${btoa(clientId+':'+clientsecret)}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
    if(res.ok){
        const data =await res.json()
        console.log(data.access_token)
        return (data.access_token)
    }
}
getToken()


getSongApiCall('Ooh La La', 'Faces')

async function getSongApiCall(track,artist){
    const res = await fetch(`https://api.spotify.com/v1/search?q=$
    ${track},${artist}&type=track,artist`,{
        method:"Get",
        headers:{
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const data= await res.json()
        return (data.tracks.items[0].preview_url)
    }
}

getSongApiCall('Fame', 'David Bowe')

const imgs = document.getElementsByTagName('img')
for(const images of imgs){
  images.addEventListener('click', async  ()=>{
    const [track, artist] = images.alt.split(' - ')
    const songUrl = await getSongApiCall(track,artist)
    if(song){
        stopSong()
    }
    playSong(songUrl)
  })
}
let song;

function playSong(url){
    song = new Audio(url)
    song.volume = .5
    song.play()
}

function stopSong() {
  song.pause()
}

const button = document.querySelector('#stp-btn')
button.addEventListener('click', ()=>stopSong())