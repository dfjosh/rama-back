class AddColumnTypeToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :type, :string, index: true
    add_column :posts, :podcast_id, :integer, index: true
    add_column :posts, :duration, :integer
    add_column :posts, :explicit, :boolean
  end
end
