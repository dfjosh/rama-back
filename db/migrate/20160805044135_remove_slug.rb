class RemoveSlug < ActiveRecord::Migration[5.0]
  def change
    remove_column :categories, :slug, :string
    remove_column :tags, :slug, :string
  end
end
