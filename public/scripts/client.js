const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    const tweetsContainer = $('section.tweet-container'); 
    tweetsContainer.prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
  let $tweet = `
    <article class="tweet">
      <header>
        <div class="user-name-avatar">
          <span>
            <img src="${tweet.user.avatars}"> 
          </span>
          <span>${tweet.user.name}</span>
        </div>
        <span class="user-handle">${tweet.user.handle}</span>
      </header>

      <p>${tweet.content.text}</p>

      <footer>
        <span>${tweet.created_at}</span>
        <div>
          <button type="submit">A</button>
          <button type="submit">B</button>
          <button type="submit">C</button>
        </div>
      </footer>
    </article>
  `;

  return $tweet;
}

$("form").submit(function(event) {
  const tweetContent = $(this).children('textarea').serialize();
  $.ajax('/tweets', {method: 'POST', data: tweetContent});
  event.preventDefault();
});

renderTweets(tweetData);
