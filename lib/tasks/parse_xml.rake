require 'nokogiri'

EXPORT_FILE = Rails.root.join("lib", "data", "distantfuturejosh.wordpress.2016-07-31-2.xml") # use '-2'. The first one has IMGs as posts for some reason.

namespace :parse_xml do
  desc '$ rails parse_xml:import["/the/path"]'

  task import: :environment do |t, args|
    doc = Nokogiri::XML(File.open(EXPORT_FILE))        # { |config| config.noent }
    doc.css("item").each do |item|
      if item.css("wp|status").text != "draft"
        post = Post.create!(
          title:      item.css("title").text,
          created_at: item.css("pubDate").text,
          updated_at: item.css("pubDate").text,
          author:     "dfjosh",
          slug:       item.css("wp|post_name").text,
          body:       item.css("content|encoded").text
        )
      end
    end
  end

  task taxonomy: :environment do |t, args|
    doc = Nokogiri::XML(File.open(EXPORT_FILE))
    doc.css("category").each do |node|
      if node["domain"] == "category"
        unless Category.exists?(name: node.text)
          category = Category.new(name: node.text) # removed slug in favor of using parameterize!!
          category.save!
          # puts "#{category.slug} != #{category.text.parameterize}" if category.slug != category.text.parameterize
        end
      elsif node["domain"] == "post_tag"
        unless Tag.exists?(name: node.text)
          tag = Tag.new(name: node.text) # removed slug in favor of using parameterize!!
          tag.save!
          # puts "#{tag.slug} != #{tag.text.parameterize}" if tag.slug != tag.text.parameterize
        end
      end
    end
  end

  task link_posts_with_taxonomy: :environment do |t, args|
    doc = Nokogiri::XML(File.open(EXPORT_FILE))
    doc.css("item").each do |item|
      if item.css("wp|status").text != "draft"
        categories = []
        tags = []
        item.css("category").each do |category|
          if category["domain"] == "category"
            categories << Category.find_by_name(category.text)
          elsif category["domain"] == "post_tag"
            tags << Tag.find_by_name(category.text)
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
  end

  task comments: :environment do |t, args|
    doc = Nokogiri::XML(File.open(EXPORT_FILE))
    doc.css("item").each do |item|
      if item.css("wp|status").text != "draft"
        title = item.at_css("title").text
        puts title
        item.css("wp|comment").each do |comment|
          Comment.create!(
            post:       Post.where(title: title).first, # shouldn't I not have to call .id?
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

end
