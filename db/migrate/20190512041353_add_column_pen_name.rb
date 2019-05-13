class AddColumnPenName < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :pen_name, :string
  end
end
