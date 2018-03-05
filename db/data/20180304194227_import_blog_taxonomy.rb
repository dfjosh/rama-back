class ImportBlogTaxonomy < ActiveRecord::Migration[5.0]
  def up
    Rake::Task["parse_xml:taxonomy"].invoke
    Rake::Task["parse_xml:link_posts_with_taxonomy"].invoke
  end

  def down
  end
end