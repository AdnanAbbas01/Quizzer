const form = document.querySelector('.user-info');

if(localStorage.getItem('params')){
    location.href = 'index.html'
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    let url = 'amount=10';
    console.log(data)
    if(!data.user_name){
      window.location.reload();
    }
    if(data.trivia_category !== 'any' && data.trivia_category){
        url += "&category=" + data.trivia_category
    }
    if(data.trivia_difficulty !== 'any' && data.trivia_difficulty){
        url += "&difficulty=" + data.trivia_difficulty
    }
    if(data.trivia_type !== 'any' && data.trivia_type){
        url += "&type=" + data.trivia_type
    }
    localStorage.clear();
    localStorage.setItem('params', JSON.stringify(url));
    localStorage.setItem('user', JSON.stringify(data.user_name));
    location.href = 'index.html';
})