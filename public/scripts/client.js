const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (res) {
    renderTweets(res);
  });
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    const tweetsContainer = $('section.tweet-container'); 
    tweetsContainer.prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
  let datetime = new Date(tweet.created_at);
  datetime = datetime.toUTCString();

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
        <span>${datetime}</span>
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
  event.preventDefault();
  const inputTextArea = $(this).children('textarea');
  const tweetContent = inputTextArea.val();

  if (tweetContent.length == 0) {
    alert('Error: Cannot submit empty tweet');
  } else if (tweetContent.length > 140) {
    alert('Error: Cannot submit tweet over the 140 character limit');
  } else {
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const safeText = escape(tweetContent);
    $.ajax('/tweets', {method: 'POST', data: {text: safeText}})
    .then(function(tweet) {
      renderTweets([tweet]);
    })
    .catch(err => {
      alert(`Error: ${err.responseJSON.error}`);
    });

    inputTextArea.val('');
  }
});

loadTweets();
