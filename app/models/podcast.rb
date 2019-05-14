class Podcast < ApplicationRecord
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user
  has_many :episodes, class_name: Posts::Episode.to_s
  
  def explicit_str
    explicit == true ? "yes" : "no"
  end
  
  def create_rss_feed!
    file_path = File.join('tmp', feed)
    File.open(file_path, 'w') do |f|
      f << <<-HEREDOC
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>#{title}</title>
    <link>#{website}</link>
    <language>en-us</language>
    <copyright>&#169; #{Time.now.year} #{author.pen_name}</copyright>
    <itunes:author>#{author.pen_name}</itunes:author>
    <description>#{description}</description>
    <itunes:type>#{listing_type}</itunes:type>
    <itunes:owner>
      <itunes:name>#{author.pen_name}</itunes:name>
      <itunes:email>#{author.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="#{URI.join(Rails.configuration.cdn_url, image)}"/>
    <itunes:category text="#{CGI::escapeHTML(category)}">
      <itunes:category text="#{CGI::escapeHTML(subcategory)}"/>
    </itunes:category>
    <itunes:explicit>#{explicit}</itunes:explicit>
      HEREDOC
      
      episodes.where(state: Post::PUBLISHED).order(created_at: :desc).each do |episode|
        f << <<-HEREDOC
    <item>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:title>#{episode.title}</itunes:title>
      <description>
        <content:encoded>
          <![CDATA[#{episode.body}]]>
        </content:encoded>
      </description>
      <enclosure 
        length="#{episode.enclosure.size}" 
        type="#{episode.enclosure.mime_type}" 
        url="#{URI.join(Rails.configuration.cdn_url, episode.enclosure.url)}"
      />
      <guid>#{episode.slug}</guid>
      <pubDate>#{episode.created_at.rfc2822}</pubDate>
      <itunes:duration>#{episode.duration}</itunes:duration>
      <itunes:explicit>#{episode.explicit}</itunes:explicit>
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
