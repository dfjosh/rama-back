class MarkProjectPostsIsProject < ActiveRecord::Migration[5.2]
  PROJECT_POSTS = [110, 109, 108, 107, 106, 105, 103, 102, 101, 100, 80, 20]
  
  def up
    Post.find(PROJECT_POSTS).each do |post|
      post.is_project = true
      puts post.title
      post.save!
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end