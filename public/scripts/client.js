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
  const datetime = moment(tweet.created_at).fromNow();

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
          <button type="submit">🚩</button>
          <button type="submit">🔁</button>
          <button type="submit">👍</button>
        </div>
      </footer>
    </article>
  `;

  return $tweet;
}

$("form").submit(function(event) {
  event.preventDefault();
  const inputTextArea = $(this).children('textarea');
  const errorNode = $(this).siblings('p');
  errorNode.hide('fast');
  const tweetContent = inputTextArea.val();

  // Show error banner if tweet is invalid
  if (tweetContent.length == 0) {
    errorNode.text('Error: Cannot submit empty tweet');
    errorNode.slideDown('slow');
    return;
  } else if (tweetContent.length > 140) {
    errorNode.text('Error: Cannot submit tweet over the 140 character limit');
    errorNode.slideDown('slow');
    return;
  }

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
  const charCounter = inputTextArea.siblings('div').children('output.counter');
  charCounter.val(140);
});

loadTweets();
