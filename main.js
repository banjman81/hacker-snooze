const stories = $('.stories');
const navItems = $('.nav-item');
const list = $('ul li')
const allCards = $('.stories')
const loading = $('.loader');
const commentLink = $('.comment-link');
const likeLink = $('.like-link');
const mobile = $('.mobile');
const backButton = $('.back-btn');

async function loadTopStories(val) {
    const rawData = await fetch(`https://hacker-news.firebaseio.com/v0/${val}.json?print=pretty`)
    const data = await rawData.json(); // this is array of top stories
    // data.unshift(28026638)
    for (let i = 0; i< 5; i++){
        const headline = await fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)
        const storyData = await headline.json()
        let comment = 0
        if(storyData.kids == undefined){
            comment = 0
        }
        else{
            comment = storyData.kids.length
        }
        const newElement = $(`
        <li class="card">
            <div class="card-body">
                <a class="story-link" href="${storyData.url}">
                    <h4 class="card-title">${storyData.title}</h4>
                </a>
                <p>
                    Submitted by: ${storyData.by}
                </P>
                <p>
                    Type: ${storyData.type}
                </P>
                <a href="#" class="comment-link"><img class="comment-icon" src="asset/svg/comment.svg" alt="icon"></a>${comment}
                <a href="#" class="like-link"><img class="like-icon" src="asset/svg/like.svg" alt="icon"></a>${storyData.score}
            </div>
        </li>
            `)
        stories.append(newElement)
    }
    loading.addClass('hidden')
    stories.removeClass('hidden')
}


 // first thing when loading page
loadTopStories('topstories')



$('.card').on('click', function(){
    console.log('here')
    // $('.like-icon').addClass('.filter-green')
})

list.on('click', 'a', function(){
    $('ol li').remove()
    loading.removeClass('hidden')
    stories.addClass('hidden')
    list.toggleClass('active')
    loadTopStories($(this).attr('id'))
    // $('.like-icon').addClass('.filter-green')
})

mobile.on('click', 'a', function(){
    $('ol li').remove()
    loading.removeClass('hidden')
    stories.addClass('hidden')
    $('.m-nav-link').toggleClass('active')
    loadTopStories($(this).attr('id'))
    // $('.like-icon').addClass('.filter-green')
})

backButton.on('click', function(){
    history.back()
})

