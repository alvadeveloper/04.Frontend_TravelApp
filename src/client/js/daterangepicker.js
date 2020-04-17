// date picker function

export const date = $(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
  	let start1 = start.format('YYYY-MM-DD');
  	let end1 = end.format('YYYY-MM-DD')
    Client.sendData('/dates', {start1, end1});
  });
});