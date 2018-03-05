class RenameCategorizations < ActiveRecord::Migration[5.0]
  def change
    rename_table :categorizations, :post_categories
    rename_table :posts_tags, :post_tags
  end
end
