//APlayer
const aplayer = document.querySelector("#aplayer");
if(aplayer){
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);

    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);


    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            lrcType: 1,
            lrc: `
                [00:02.00] Loi bai hat giay thu 2
                [00:04.00] Loi bai hat giay thu 4
                [00:06.00] Loi bai hat giay thu 6
            `
        }],
        autoplay: true 
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");
    
    ap.on('play', ()=>{
        avatar.style.animationPlayState = "running";
    });

    ap.on('pause',()=>{
        avatar.style.animationPlayState = "paused";
    });

    ap.on('ended',()=>{
        const link = `/songs/listen/${dataSong._id}`;

        const option = {
            method: PATCH 
        }

        fetch(link, option)
            .then(res=>res.json())
            .then(data =>{
                const elementListenSpan = document.querySelector(".singer-detail .inner-listen span");
                elementListenSpan.innerHTML = `${data.listen} luot nghe`;
            })
    });
}
//End APlayer

//Button Like
const buttonLike = document.querySelector("[button-like]");
if(buttonLike){
    buttonLike.addEventListener("click", ()=>{
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");

        const typeLike = isActive ? "dislike" : "like";
        
        
        const link = `/songs/like/${typeLike}/${idSong}`;

        const option = {
            method:"PATCH"
        }

        fetch(link, option)
            .then(res=>res.json())
            .then(data =>{
                if(data.code == 200){
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like} thích`;
    
                    buttonLike.classList.toggle("active");
                }
            })
    });
}
//End Button Like

//Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite){
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", ()=>{
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const isActive = buttonFavorite.classList.contains("active");
    
            const typeFavorite = isActive ? "unfavorite" : "favorite";
            
            
            const link = `/songs/favorite/${typeFavorite}/${idSong}`;
    
            const option = {
                method:"PATCH"
            }
    
            fetch(link, option)
                .then(res=>res.json())
                .then(data =>{
                    if(data.code == 200){
                        buttonFavorite.classList.toggle("active");
                    }
                })
        });
    });
}
//End Button Like

//Search suggest
const boxSearch = document.querySelector(".box-search");
if(boxSearch){
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector(".inner-suggest");

    input.addEventListener("keyup", () =>{
        const keyword = input.value;

        const link = `/search/suggest?keyword=${keyword}`;

        fetch(link)
            .then(res=>res.json())
            .then(data =>{
                const songs = data.songs;
                if(songs.length > 0){
                    boxSuggest.classList.add("show");

                    const htmls = songs.map(song => {
                        return `
                            <a class="inner-item" href="/songs/detail/${song.slug}">
                                <div class="inner-image"><img src="${song.avatar}"/></div>
                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>
                                    <div class="inner-singer"><i class="fa-solid fa-microphone-lines></i> ${song.infoSinger.fullName}
                                </div>
                            </a>
                        `;
                    });

                    const boxList = document.querySelector(".inner-list");
                    boxList.innerHTML = htmls.join(""); 
                }
                else{
                    boxSuggest.classList.remove("show");
                }
            })
    });
}
//End Search suggest