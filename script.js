jQuery(function ($) {
  $('#form').validate({
    rules: {
      title: {
        required: true,
        minlength: 3
      },
      author: {
        required: true
      }
    },
    messages: {
      title: {
        required: 'Por favor, informe seu nome',
        minlength: 'O nome deve ter pelo menos 3 caracteres'
      },
      author: {
        required: 'É necessário informar um email'
      },
    }
  })

  var dots = 0
  function type () {
    if (dots < 3) {
      $('#dots').append('.')
      dots++
    } else {
      $('#dots').html('')
      dots = 0
    }
  }

  function loadData () {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/posts',
      beforeSend: function () {
        $('.list').append(
          "<p class='loading'>Carregando<span id='dots'></span></p>"
        )
        setInterval(type, 200)
      },
      success: function (data) {
        $('.loading').remove()
        for (let i in data) {
          newRowList(data[i].id, data[i].title, data[i].author)
        }
      },
      error: function (data) {
        console.log('An error occurred.')
        $('.loading').remove()
        $('.list').append(`<p class="undefined">Não há dados</p>`)
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
