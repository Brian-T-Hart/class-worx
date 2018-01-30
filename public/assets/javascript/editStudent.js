    var secure_url;

    document.getElementById("upload_widget_opener").addEventListener("click", function () {
        cloudinary.openUploadWidget({
            cloud_name: 'dfonttj4w',
            upload_preset: 'firv62ul',
            sources: ['local', 'url', 'image_search', 'facebook', 'instagram', 'dropbox', 'google_photos'],
            google_api_key: 'AIzaSyDRRirpUnekYH1rsUex4tYovcQCWrEeQIM'
        },
            function (error, result) {
                if (error) {
                    console.log('error ', error)
                }
                else {
                    console.log('result[0].secure_url ', result[0].secure_url);
                    secure_url = result[0].secure_url;
                    document.getElementById("studentImage").setAttribute("src", secure_url);
                    document.getElementById("inputStudentImage").setAttribute("value", secure_url);
                }
            })
    }, false);