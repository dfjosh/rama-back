class ImportBlogPosts < ActiveRecord::Migration[5.0]
  def up
    Rake::Task["parse_xml:import"].invoke # Yikes, passing a file path arg to this was not working. Just ended up including it in the rake task itself
  end

  def down
  end
end