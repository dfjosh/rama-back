class GoodreadsApi < ApplicationRecord
  def self.get_reviews
    me = 56955322
    options = "&shelf=read&page=1&per_page=5"
    url = "https://www.goodreads.com/review/list/#{me}.xml?key=#{ENV['GOODREADS_KEY']}&v=2#{options}"
    resp = HTTP.get(url)
    xml_obj = Nokogiri::XML(resp)
    hash = Hash.from_xml(xml_obj.to_xml)
    reviews = []
    hash["GoodreadsResponse"]["reviews"]["review"].each do |review|
      r = {}
      r[:id] = review["id"].to_i
      r[:title] = review["book"]["title"]
      r[:image_url] = review["book"]["image_url"]
      r[:book_url] = review["book"]["link"]
      r[:author] = review["book"]["authors"]["author"]["name"]
      r[:published] = review["book"]["published"]
      r[:rating] = review["rating"].to_i
      r[:body] = review["body"]
      r[:completed] = review["read_at"]
      r[:link] = review["link"]
      reviews << r
    end
    reviews
  end
end
