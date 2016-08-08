class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer "post_id"
      t.string "author"
      t.string "email"
      t.text "content"
      t.integer "approved"
      t.integer "parent"
      t.timestamps
    end
  end
end
