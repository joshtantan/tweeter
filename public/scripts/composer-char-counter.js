$(document).ready(function() {
  console.log('DOC loaded & ready');
});

$('#tweet-text').on('input', function() {
  const charsRemaining = 140 - $(this).val().length;
  const charCounter = $(this).parent().children('div').children('output.counter');
  charCounter.html(charsRemaining);

  if (charsRemaining < 0) {
    charCounter.css('color', '#FF0000');
  } else {
    charCounter.css('color', '#545149');
  }
});