class AddColumnPublishedAtToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :published_at, :datetime, default: nil
    remove_column :episodes, :pub_date, :datetime
    remove_column :episodes, :state, :string
  end
end
