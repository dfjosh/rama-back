class RemoveSlug < ActiveRecord::Migration[5.0]
  def change
    remove_column :categories, :slug
    remove_column :tags, :slug
  end
end
