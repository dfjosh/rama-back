class UpdateFeatureLinkUrls < ActiveRecord::Migration[5.2]
  def up
    Post.transaction do
      Post.where.not(feature_link: nil).each do |post|
        new_link = post.feature_link.sub("http://distantfuturejosh.com", "")
        post.feature_link = new_link
        post.save!
      end
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end