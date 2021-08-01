const stories = $('.stories');
const navItems = $('.nav-item')

async function loadTopStories() {
    const rawData = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const data = await rawData.json(); // this is array of top stories
    // data.unshift(28026638)
    console.log(data)
    for (let i = 0; i< 20; i++){
        const headline = await fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)
        const storyData = await headline.json()
        
        const newElement = $(`
        <li class="card">
        <div class="card-body">
            <a class="story-link" href="${storyData.url}">
                <h4 class="card-title">${storyData.title}</h4>
            </a>
            <p>
                Submitted by: ${storyData.by}
            </P>
            <a href="#"><img class="sub-icon" src="asset/svg/comment.svg" alt="icon"></a>${storyData.kids.length}
            <img class="sub-icon" src="asset/svg/like.svg" alt="icon">${storyData.score}
            </div>
        </li>
            `)
        stories.append(newElement)
    }
    
}

loadTopStories() // first thing when loading page