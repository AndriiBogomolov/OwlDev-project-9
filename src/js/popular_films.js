

const URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=177f83f5259c7f846e561f4715bd03a4';

async function fetchPopular() { 
    return await fetch(URL).then(responce => { 
        if (!responce.ok) { 
            throw new Error(responce.statusText); 
        } return responce.json()
    }  ).then(data => { console.log(data) })
}

fetchPopular();
