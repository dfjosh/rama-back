class ChangeCodeToPreSometimes < ActiveRecord::Migration[5.2]
  def up
    # Post.transaction do
    #   # Post.where("body like '%<code>%'").each do |post|
    #   Post.find([
    #     78,
    #     81,
    #     # 89,
    #     # 90,
    #     92,
    #     94,
    #     # 98, # not sure about this one
    #     99,
    #     104
    #   ]).each do |post|
    #     puts post.id
    #     puts post.body
    #     new_body = post.body.gsub("<code>", "<pre>").gsub("</code>", "</pre>")
    #     post.body = new_body
    #     post.save!
    #     puts "++++++"
    #     puts post.body
    #     puts "---------------------------------------"
    #   end
    #   # raise "Nawp!"
    # end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end