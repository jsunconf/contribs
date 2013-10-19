;(function ($, window) {

var $voteForYourTalk = $('#vote-for-link'),
    $thanksVoted = $('#thanks-voted'),
    $votes = $('#votes');

$voteForYourTalk.on('click', function (e) {
  e && e.preventDefault();
  var $this = $(this),
      id = $this.data('id'),
      type = $this.data('type'),
      data = {};

  data[type + '_id'] = id;

  $this.fadeOut(function () {
    $this.remove();
    $thanksVoted.toggleClass('hidden');
  });

  $.ajax({
    type: 'POST',
    url: '/karmas',
    dataType: 'json',
    data: data,
    success: function (data) {
      // fake vote count raise - until we have websocket support
      var count = +$votes.text();
      count = count + 1;
      $votes.text(count);
    },
    error: function () {

    }
  });
});

})(jQuery, window);
