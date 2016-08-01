namespace :parse_xml do
  desc '$ rails parse_xml:import["/the/path"]'
  task :import, [:export_file] => :environment do |t, args|
    require 'nokogiri'
    file =  args.export_file                    # or args[:export_file]
    doc = Nokogiri::XML(File.open(file))        # { |config| config.noent }
    doc.css("item").each do |item|
      post = Post.create!(
        title: item.css("title").text,
        created_at: item.css("pubDate").text,
        updated_at: item.css("pubDate").text,
        author: "dfjosh",
        body: item.css("content|encoded").text
      )
    end
  end
end
