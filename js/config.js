angular.module('config', [])
  .constant('config',
  {
    prod: {
      region: 'ap-northeast-2',
      upload_bucket_name: 'rekognition-hosting-s3upload-1u48jsat6u0mp',
      identity_pool_id: 'ap-northeast-2:0ee8fe75-da10-47ac-b9b8-12ab3a8c2055',
      face_collection: 'rekognition-demo-go',
      ddb_table: 'rekognition-demo-go'

    }
  }
  )
  ;

