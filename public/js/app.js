;(function ($, window) {

var $votes = $('#votes')
    $form = $('#form-karma');

$form.on('submit', function (e) {
  e.preventDefault();

  $form
    .find('button')
    .text('Thanks!');

  $.ajax({
    type: 'POST',
    url: '/karmas',
    dataType: 'json',
    data: $form.serialize(),
    success: function (data) {
      // fake vote count raise - until we have websocket support
      var count = +$votes.text();
      count = count + 1;
      $votes.text(count);
    }
  });
});

// Logo
var $logo = $('#logo');
$logo.on('hover', function () {
  $logo.toggleClass('show-back');
});

})(jQuery, window);
