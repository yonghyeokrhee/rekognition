function OcrController ($scope, config) {
      // Load config
  var cfg = config.prod;
  var bucketName = cfg.upload_bucket_name;
  var face_collection = cfg.face_collection;
  var table = cfg.ddb_table;
  // Define AWS Resources
  var region = cfg.region;
  var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: cfg.identity_pool_id,
  });

  AWS.config.update({
    region: region,
    credentials: creds
  });

  var rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });
  var docClient = new AWS.DynamoDB.DocumentClient();

  var identityId = AWS.config.credentials.identityId;

  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName }
  });


  $scope.front = true;
  //document.getElementById('flip-button').onclick = function() { front = !front; };


  // scope Variable

  $scope.bucket_images = null;

  $scope.faces_collection = null;
  $scope.isSearching = false;
  $scope.isTrackingEmotion = false;
  $scope.faces_emotion = null;
  $scope.name = null;
  $scope.metadata = null;
  var mytimeout, emotionTracker;
  var context, dataUrl, blobData;
  var interval = 1000;
  var interval_emotion = 1000;
    
    
    $scope.initCamera = function () {
        $scope.front = ! $scope.front;
        var constraints = { video: { facingMode: {exact:($scope.front ? "user" : "environment")} } }; 
        // Get access to the camera!
        console.log(constraints);
        video = document.querySelector('video');
        canvas = document.querySelector("canvas");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

          navigator.mediaDevices.getUserMedia({ video: constraints }).then
            (function (stream) {
              if ("srcObject" in video) {
                video.srcObject = stream;
              } else {
                // Avoid using this in new browsers, as it is going away.
                video.src = window.URL.createObjectURL(stream);
              }
              video.onloadedmetadata = function (e) {
                video.play();
              };

            })
            .catch(function (err) {
              console.log('Currently cannot access to your web cam.');
              //toastr.error('Currently cannot access to your web cam.');
            });
        }
      }
    angular.element(window.document.body).ready(function () {
        $scope.initCamera();
        refreshGallery();
    });
}
    
angular.module('ocr-controller', []).controller('OcrController', OcrController);
