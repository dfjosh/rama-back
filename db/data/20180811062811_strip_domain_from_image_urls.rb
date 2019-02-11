class StripDomainFromImageUrls < ActiveRecord::Migration[5.2]
  def up
    Post.transaction do
      Post.all.each do |post|
        match = /http:\/\/www.distantfuturejosh.com\/wordpress\/wp-content/
        replacement = "&cdnURL&"
        post.body.gsub!(/#{match}/, replacement)
        puts post.title
        post.save!
      end
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end