class AddColumnIsProjectToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :is_project, :boolean, default: false
  end
end
