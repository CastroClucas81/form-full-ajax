jQuery(function ($) {
  function loadData () {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/posts',
      beforeSend: function () {
        $('.list').append("<p class='loading'> Carregando... </p>")
      },
      success: function (data) {
        $('.loading').remove()
        for (let i in data) {
          newRowList(data[i].id, data[i].title, data[i].author)
        }
      },
      error: function (data) {
        console.log('An error occurred.')
        $('.list').append(`<p>Não há dados</p>`)
      }
    })
  }

  loadData()

  function newRowList (id, title, author) {
    $('.list').append(
      `<div class="dataList" data-id="${id}">
              <h3 class="count"></h3>
              <h3>${title}</h3>
              <p>${author}</p>
              <button type="button" class="delete">Deletar</button>
        </div>`
    )
  }

  $('#form').submit(function (e) {
    var frm = $(this)
    e.preventDefault()

    $.ajax({
      type: frm.attr('method'),
      url: frm.attr('action'),
      data: frm.serialize(),
      success: function (data) {
        console.log('Submission was successful.')
        console.log(data)

        newRowList(data.id, data.title, data.author)
      },
      error: function (data) {
        console.log('An error occurred.')
        console.log(data)
      }
    })
  })

  $(document).on('click', '.delete', function () {
    var target = $(this).closest('[data-id]')
    var deleteButton = $(this)
    var id = target.data().id

    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/posts/${id}`,
      dataType: 'json',
      success: function (data) {
        console.log(data)
        deleteButton.parent().remove()
      },
      error: function (data) {
        alert('ocorreu um erro')
      }
    })
  })
})
