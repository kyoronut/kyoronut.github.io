$(function() {
  //  register
  $('body').on('click', 'button[data-btn-type=ajax]', function(e) {
    console.log('click btn');
    //  preparation
    var send_data;
    send_data = {
      //  input from text box
      user_type : $('input').val()
    };
    console.log(send_data);
    //  use webapi
    $.ajax({
      type: "get"
      url: 'https://api.uniswap.info/pair/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
      dataType: "json",
      data: send_data
    })
    .done((data) => {
      console.log(data);
      document.write(data.price_last);
    
    })
      .fail((data) => {
      console.log(data.responceText);
    })
      .always((data) => {
      console.log(data);
    });
      
  });
    //  focus
  
  $('input').focus();

  
  return false;
  
});
