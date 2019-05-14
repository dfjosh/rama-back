class S3Api
  REGION = "us-west-1"
  BUCKET = "lazy-rama" # TODO maybe make a new bucket for dev and move this to config/env files
  
  def self.upload_file!(source, target)
    s3 = Aws::S3::Resource.new(region: REGION)
    obj = s3.bucket(BUCKET).object(target)
    obj.upload_file(source)
  end
end