(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const getSwimCommand = function() {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (response) => {
        console.log("AJAX SWIM SUCCESS: ", response);
        SwimTeam.move(response);
      },
      error: (response) => {
        console.error("AJAX SWIM ERROR: ", response);
      }
    })
  }

  // setInterval(getSwimCommand, 500);
  getSwimCommand();

  // const getImageBackground = function() {
  //   $.ajax({
  //     type: "GET",
  //     url: serverUrl + "/background.jpg"
  //     contentType: "image/jpeg",
  //     success: (response) => {
  //       console.log("AJAX IMAGE SUCCESS: ", response);
  //     },
  //     error :  (response) => {
  //       console.error("AJAX IMAGE ERROR: ", response)
  //     }
  //   })
  // }


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();
