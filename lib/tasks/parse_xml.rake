require 'nokogiri'

namespace :parse_xml do
  desc '$ rails parse_xml:import["/the/path"]'

  task :import, [:export_file] => :environment do |t, args|
    file = args.export_file                     # or args[:export_file]
    doc = Nokogiri::XML(File.open(file))        # { |config| config.noent }
    doc.css("item").each do |item|
      post = Post.create!(
        title:      item.css("title").text,
        created_at: item.css("pubDate").text,
        updated_at: item.css("pubDate").text,
        author:     "dfjosh",
        body:       item.css("content|encoded").text
      )
    end
  end

  task :taxonomy, [:export_file] => :environment do |t, args|
    doc = Nokogiri::XML(File.open(args.export_file))
    doc.css("category").each do |node|
      if node["domain"] == "category"
        unless Category.exists?(text: node.text)
          category = Category.new(text: node.text, slug: node["nicename"]) # removed slug in favor of using parameterize!!
          category.save!
          # puts "#{category.slug} != #{category.text.parameterize}" if category.slug != category.text.parameterize
        end
      elsif node["domain"] == "post_tag"
        unless Tag.exists?(text: node.text)
          tag = Tag.new(text: node.text, slug: node["nicename"]) # removed slug in favor of using parameterize!!
          tag.save!
          # puts "#{tag.slug} != #{tag.text.parameterize}" if tag.slug != tag.text.parameterize
        end
      end
    end
  end

  task :link_posts_with_taxonomy, [:export_file] => :environment do |t, args|
    doc = Nokogiri::XML(File.open(args.export_file))
    doc.css("item").each do |item|
      categories = []
      tags = []
      item.css("category").each do |category|
        if category["domain"] == "category"
          categories << Category.find_by_text(category.text)
        elsif category["domain"] == "post_tag"
          tags << Tag.find_by_text(category.text)
        end
      end
      post = Post.where(title: item.at_css("title").text).first
      puts "-----#{post.title}"
      post.categories = categories
      puts post.categories.inspect
      post.tags = tags
      puts post.tags.inspect
    end
  end

  task :comments, [:export_file] => :environment do |t, args|
    doc = Nokogiri::XML(File.open(args.export_file))
    doc.css("item").each do |item|
      title = item.at_css("title").text
      puts title
      item.css("wp|comment").each do |comment|
        Comment.create!(
          post_id:    Post.where(title: title).first.id, # shouldn't I not have to call .id?
          author:     comment.at_css("wp|comment_author").text,
          email:      comment.at_css("wp|comment_author_email").text,
          content:    comment.at_css("wp|comment_content").text,
          approved:   comment.at_css("wp|comment_approved").text.to_i,
          parent:     comment.at_css("wp|comment_parent").text.to_i,
          created_at: comment.at_css("wp|comment_date_gmt").text,
          updated_at: comment.at_css("wp|comment_date_gmt").text
        )
      end
    end
  end

end
