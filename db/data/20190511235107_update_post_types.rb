class UpdatePostTypes < ActiveRecord::Migration[5.2]
  def up
    self.transaction do
      Post.all.each do |post|
        post.type = "Posts::Article"
        post.save!
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end