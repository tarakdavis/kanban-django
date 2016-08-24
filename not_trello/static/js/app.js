<script>
var $done = $('#done')

$.ajax({
  url: '/api/board'
}).done(function(response){
  if (response.count > 0) {
    response.results.forEach(function(result) {
      // make a table row
      var $tr = $('<tr>')

      var $name = $('<td>').text(result.name).appendTo($tr)

      $('<td>').text(result.categories).appendTo($tr)

      $name.click(function() {
        var boardName = $name.text()

        $name.empty()

        var $form = $('<form>').appendTo($name)

        var $input = $('<input type="text">').val(boardName)

        $input.click(function() {
          return false;
        })

        $input.appendTo($form)

        $form.submit(function() {
          var boardName = $input.val()

          $.ajax({
            method: 'PUT',
            url: '/api/board/' + result.id + '/',
            data: {
              name: boardName,
              categories: result.categories
            }
          })

          $name.empty();
          $name.text(boardName)

          return false;
        })
      })

      $tr.appendTo($board_n)
    })
  }
})
</script>
