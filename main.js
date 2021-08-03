const stories = $('.stories');
const navItems = $('.nav-item');
const navLinks = $('.nav-link');
const list = $('ul li')
const allCards = $('.stories')
const loading = $('.loader');
const commentLink = $('.comment-link');
const likeLink = $('.like-link');
const mobile = $('.mobile');
const backButton = $('.back-btn');
const key = $('.key')
const back = $('.back')
const next = $('.next')
const pageDisplay = $('.page-display')

let currentPage = 1
let val1 = 1
let val2 = 5
async function loadStories(val, a, b) {
    const rawData = await fetch(`https://hacker-news.firebaseio.com/v0/${val}.json?print=pretty`)
    const data = await rawData.json(); // this is array of top stories
    // data.unshift(28026638)
    for (let i = a-1; i< b; i++){
        const headline = await fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)
        const storyData = await headline.json()
        let comment = 0
        if(storyData.kids == undefined){
            comment = 0
        }
        else{
            comment = storyData.kids.length
        }

        // deatails as cards for each individual topic
        // score is givena  class for modification
        // comment will get a score if it applicable
        const newElement = $(`
        <li class="card story" id="${data[i]}">
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
                <a href="#" id="${data[i]}" class="comment-link"><img class="comment-icon" src="asset/svg/comment.svg" alt="icon"></a>${comment}
                <a href="#" class="like-link"><img class="like-icon" src="asset/svg/like.svg" alt="icon"><span class='no-link'>${storyData.score}</span></a>
            </div>
        </li>
            `)
        stories.append(newElement)
        // console.log($('ol li'.text()), data[i])
        
    }
    loading.addClass('hidden')
    stories.removeClass('hidden')
    
}

async function loadComments(tag){
    const rawData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${tag}.json?print=pretty`)
    const data = await rawData.json();
    const comments = data.kids
    // console.log(comments)
    loading.removeClass('hidden')
    for( let i = 0; i < comments.length; i++){
        const commentElement = await fetch(`https://hacker-news.firebaseio.com/v0/item/${comments[i]}.json?print=pretty`)
        const refined = await commentElement.json();
        const newElement = $(`
            <div class="comment">
                <p>${refined.text}</p>
                <a href="#" class="like-link"><img class="like-icon" src="asset/svg/like.svg" alt="icon">0</a>
            </div>
        `)
        $('.comment-section').append(newElement)
        // console.log(refined.text)
    }
    loading.addClass('hidden')
}

let currentTopic ="topstories"
 // first thing when loading page
loadStories('topstories', 1, 5)

pageDisplay.text(currentPage)

let commentView = false
// This will handel like icon and increase or decrease score
// this will also display comments
$('.main-contents').on('click', 'a', function(){
    // console.log($(this).attr('class'), 'here1')
    if($(this).attr('class') == 'like-link'){
        const item = $(this).children()
        let score = Number($(this).text())
        if(item.attr('src') !== 'asset/svg/like-green.svg'){
            // item.attr('src', 'asset/svg/like-green.svg')
            // console.log(item.next().attr('class'))
            $(this).html(`<img class="like-icon" src="asset/svg/like-green.svg" alt="icon"><span class='no-link'>${score+1}</span>`)
        }
        else{
            $(this).html(`<img class="like-icon" src="asset/svg/like.svg" alt="icon"><span class='no-link'>${score-1}</span>`)
        }
    }
    else if($(this).attr('class') == 'comment-link'){
        if(commentView == true){
            $('ol').children().remove()
            $('.comment-section').children().remove()
            commentView = false
            loadStories(currentTopic)
        }
        else{
            // console.log($(this).attr('id'))
            $(`ol li[id!= '${$(this).attr('id')}']`).remove()
            commentView = true
            loadComments($(this).attr('id'))
        }
        
    }
    // $('.like-icon').attr('src')
})


// handeling click highlight for nothe desktop and mobile
list.on('click', 'a', function(){
    $('ol').children().remove()
    loading.removeClass('hidden')
    stories.addClass('hidden')
    // list.toggleClass('active')
    list.each(function(){
        $(this).removeClass('active')
        console.log($(this).parent().attr('class'))
    })
    $(this).parent().addClass('active')
    console.log($(this).parent().attr('class'), 'after')
    // $('.m-nav-link').toggleClass('active')
    console.log($(this).attr('id'))
    currentTopic = $(this).attr('id')
    val1= 1
    val2 = 5
    currentPage = 1
    pageDisplay.text(currentPage)
    loadStories($(this).attr('id'), 1 ,5)
})

mobile.on('click', 'a', function(){
    $('ol li').remove()
    loading.removeClass('hidden')
    stories.addClass('hidden')
    // $('.m-nav-link').each(function(){
    //     // console.log($(this).attr('class'))
    // })
    // console.log($(this), 'selectr')
    $('.m-nav-link').toggleClass('active')
    loadStories($(this).attr('id'))
    currentTopic = $(this).attr('id')
    loadStories($(this).attr('id'),1 , 5)
    // $('.like-icon').addClass('.filter-green')
})

next.on('click', function(){
    if(val1<95){
        console.log('next')
        $('ol').children().remove()
        val1+=5
        val2+=5
        currentPage++
        loading.removeClass('hidden')
        stories.addClass('hidden')
        pageDisplay.text(currentPage)
        loadStories(currentTopic, val1, val2)
    }
    
})
back.on('click', function(){
    if(val1>1){
        console.log('back')
        $('ol').children().remove()
        val1-=5
        val2-=5
        currentPage--
        loading.removeClass('hidden')
        stories.addClass('hidden')
        pageDisplay.text(currentPage)
        loadStories(currentTopic, val1, val2)
    }
    
})


backButton.on('click', function(){
    history.back()
})

