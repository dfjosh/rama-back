class BackfillIdsToUserIdColumn < ActiveRecord::Migration[5.2]
  def up
    me = User.find(1)    
    Post.all.each do |post|
      post.user = me
      post.save!
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end