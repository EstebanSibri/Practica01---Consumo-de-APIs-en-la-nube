const privateKey='8d88320353b19db0d15ba82b462f50f2ab36be33',
    publictKey='7d290822628a5909bd26d1c57fbf7610', 
    content = document.getElementById('content'),
    search = document.getElementById('search');

const getConnection = () => {
    const ts=Date.now(),
        hash = MD5(ts + privateKey + publictKey),
        URL=`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publictKey}&hash=${hash}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
        });
    });
};
 
const drawHero = e => {
    const image=`${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero= `
    <div class="hero ed-item l-1-3">
        <h3 class="name" >${e.name}</h3>
        <div class="hero-img">
            <img class="thumbnail" src="${image}">
            <p class="description">${e.description}</p>
        </div>

    </div>
    
    `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

const searchHero = name => {
    const ts=Date.now(),
    hash = MD5(ts + privateKey + publictKey),
    hero = encodeURIComponent(name),
    URL=`http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publictKey}&hash=${hash}`;
    fetch(URL)
    .then(response=> response.json())
    .then(response=>{
        response.data.results.forEach(e =>{
            drawHero(e);
        });
    })
    .catch(e =>console.log(e));
};

search.addEventListener('keyup',e=>{
    if (e.keyCode === 13){
        content.innerHTML = "";
        searchHero(e.target.value.trim());
    }
});

getConnection();