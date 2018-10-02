class RemoveAllExplicitImgWidthAndHeights < ActiveRecord::Migration[5.2]
  def up
    Post.transaction do
      Post.all.each do |post|
        puts post.title
        regex = /\s(width|height)(="\d+")/
        matches = post.body.scan(regex)
        if matches.present?
          puts "  #{matches}"
          post.body.gsub!(regex, "")
          post.save!
        end
      end
      # raise "Nawp!"
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end