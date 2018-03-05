class ImportBlogComments < ActiveRecord::Migration[5.0]
  def up
    Rake::Task["parse_xml:comments"].invoke
  end

  def down
  end
end