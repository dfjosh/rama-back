class CreatePostsAndCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :posts_categories, id: false do |t|
      t.belongs_to :post, index: true
      t.belongs_to :category, index: true
    end
  end
end
