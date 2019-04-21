class Post < ApplicationRecord
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user

  has_many :post_categories, dependent: :destroy
  has_many :categories, through: :post_categories
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
  
  DRAFT = "DRAFT"
  PUBLISHED = "PUBLISHED"
  ARCHIVED = "ARCHIVED"
  
  # If I even have more than one (active) podcast, I should create subclasses of Post
  module Podcast
    TITLE = "All I Read is Sci-Fi"
    LINK = "https://distantfuturejosh.com" # TODO maybe make a section in the website dedicated to the podcast
    AUTHOR = "J. Arthur Wetenkamp"
    EMAIL = "<TODO>@gmail.com" # Apple does not publish this. Only used for administrative communication
    DESCRIPTION = "I read sci-fi so you don't have to."
    TYPE = "serial" # `episodic` (default) if order does not matter, `serial` if intended to be consumed sequentially
    IMAGE
  end
  
  def self.generate_podcast_feed
    file_path = Rails.root.join('public', 'distantfuturejosh.xml')
    File.open(file_path, 'w') do |f|
      f << <<-HEREDOC
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>#{Podcast::TITLE}</title>
    <link>#{Podcast::LINK}</link>
    <language>en-us</language>
    <copyright>&#169; #{Time.now.year} #{Podcast::AUTHOR}</copyright>
    <itunes:author>#{Podcast::AUTHOR}</itunes:author>
    <description>#{Podcast::DESCRIPTION}</description>
    <itunes:type>#{Podcast::TYPE}</itunes:type>
    <itunes:owner>
      <itunes:name>#{Podcast::AUTHOR}</itunes:name>
      <itunes:email>#{Podcast::EMAIL}</itunes:email>
    </itunes:owner>
    <itunes:image href="#{URI.join(Rails.configuration.cdn_url, 'the_path_to_image.png')}"/>
    <itunes:category text="To &amp; Do">
      <itunes:category text="Literature"/>
    </itunes:category>
    <itunes:explicit>no</itunes:explicit>
      HEREDOC
      
      Post.where(state: Post::PUBLISHED).each do |post|
        f << <<-HEREDOC
    <item>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:title>#{post.title}</itunes:title>
      <description>
        <content:encoded>
          <![CDATA[#{post.slug}]]>
        </content:encoded>
      </description>
      <enclosure 
        length="498537" 
        type="audio/mpeg" 
        url="#{URI.join(Rails.configuration.cdn_url, 'the_path_to_acc')}"
      />
      <guid>#{URI.join(Rails.configuration.cdn_url, 'the_path_to_post?')}</guid>
      <pubDate>#{post.created_at}</pubDate>
      <itunes:duration>1079</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
    </item>
        HEREDOC
      end
      
      f << <<-HEREDOC
  </channel>
</rss>
      HEREDOC
    end
  end
end
