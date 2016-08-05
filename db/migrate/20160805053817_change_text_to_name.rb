class ChangeTextToName < ActiveRecord::Migration[5.0]
  def change
    rename_column :tags, :text, "name"
    rename_column :categories, :text, "name"
  end
end
