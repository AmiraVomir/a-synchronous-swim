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



  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      complete: (data) => {
        // reload the page
        window.location = window.location.href;
        console.log('Data from Complete message: ', data);
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

    ajaxFileUplaod(file);
  });

})();
