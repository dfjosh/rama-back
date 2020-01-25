class AnalyzeLogsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
  end
  
  # /Users/josh/projects/rama/other/lazy-rama-logs/
  def self.process_logs(log_dir, limit = nil)
    cache = ActiveSupport::Cache::FileStore.new(Rails.configuration.cache_store[1])
    cache.fetch("#{log_dir},#{limit}") do
      log_file_names = Dir.entries(log_dir) - [".", ".."]
      log_file_names = log_file_names.first(limit.to_i) if limit
      puts "Total log files to be analyzed: #{log_file_names.size}"

      logs = []
      log_file_names.each do |log_file_name|
        log_file_path = File.join(log_dir, log_file_name)
        log_content = File.read(log_file_path)
        log_lines = log_content.split("\n")
        log_lines.each do |log_line|
          log = Log.new(log_line)
          logs << log
        end
      end

      puts "Total log lines analyzed: #{logs.size}"
      logs.sort! { |a, b|  b.datetime <=> a.datetime }
    end
  end
  
  def self.subscriber_stats(log_dir, limit = nil)
    subscriber_logs = process_logs(log_dir, limit).select { |log| log.key == "science-fiction-shorts/science-fiction-shorts.xml" }
    # subscriber_logs.delete_if { |log| log.remote_ip == "73.223.42.160" } # me

    # {"142.153.53.10"=>{:cnt=>127, :earliest=>Sun, 09 Jun 2019 04:22:50 +0000, :latest=>Wed, 01 Jan 2020 13:38:40 +0000}, ...}
    unique_subscribers = {}
    subscriber_logs.each do |log|
      unique_subscribers[log.remote_ip] ||= {}
      
      unique_subscribers[log.remote_ip][:cnt] ||= 0
      unique_subscribers[log.remote_ip][:cnt] += 1
      
      unique_subscribers[log.remote_ip][:earliest] ||= log.datetime
      unique_subscribers[log.remote_ip][:earliest] = log.datetime if unique_subscribers[log.remote_ip][:earliest] > log.datetime

      unique_subscribers[log.remote_ip][:latest] ||= log.datetime
      unique_subscribers[log.remote_ip][:latest] = log.datetime if unique_subscribers[log.remote_ip][:earliest] < log.datetime
    end
    unique_subscribers.delete_if { |ip, hsh| hsh[:cnt] < 10 }
    unique_subscribers = unique_subscribers.to_a.sort! { |a, b| b[1][:cnt] <=> a[1][:cnt] }
    unique_subscribers.to_h
  end
  
  def self.print_subscriber_stats(log_dir, limit = nil)
    subscriber_stats = subscriber_stats(log_dir, limit)
    subscriber_stats.each do |ip, hsh|
      str = ""
      str += "#{ip}: #{hsh[:cnt].to_s.rjust(20 - ip.size)} "
      str += "#{hsh[:earliest].strftime("%m/%d/%Y")} - #{hsh[:latest].strftime("%m/%d/%Y")} "
      str += "(#{(hsh[:latest] - hsh[:earliest]).to_i} days)"
      puts str
    end
    nil
  end
  
  def self.resource_stats(log_dir, limit = nil)
    resource_logs = process_logs(log_dir, limit)

    # {"/somefile.jpg"=>{"total"=>127, "by_month"=>{"2020-01"=>3, ...}}}
    stats = {}
    resource_logs.each do |log|
      stats[log.key] ||= {}
      
      stats[log.key]["total"] ||= 0
      stats[log.key]["total"] += 1
      
      stats[log.key]["by_month"] ||= {}
      
      date_key = log.datetime.strftime("%Y-%m")
      stats[log.key]["by_month"][date_key] ||= 0
      stats[log.key]["by_month"][date_key] += 1
    end
    stats.delete_if { |rsrc, hsh| rsrc.nil? || hsh["total"] < 10 }
    stats = stats.to_a.sort! { |a, b| b[1]["total"] <=> a[1]["total"] }
    stats.to_h
  end
  
  def self.print_resource_stats(log_dir, limit = nil)
    resource_stats = resource_stats(log_dir, limit)
    resource_stats.each do |rsrc, hsh|
      puts "#{hsh["total"].to_s.ljust(7)}#{rsrc}"

      # add dates that have no data
      test_date = DateTime.strptime(hsh["by_month"].to_a.last[0], "%Y-%m")
      present = DateTime.now.beginning_of_month
      while test_date <= present
        key = test_date.strftime("%Y-%m")
        hsh["by_month"][key] = 0 unless hsh["by_month"][key]
        test_date = test_date + 1.month
      end
      # TODO the problem is, I'm an idiot and I should have made this an array that contains objects because in truth, order does matter. Currently any dates I add to the hash get inserted at the end and therefore are printed out of order.
      
      hsh["by_month"].each do |date, cnt|
        print "#{date} |#{'#' * cnt}"
        puts "\n"
      end
    end
    nil
  end
  
  # def self.chart_resource_stats(log_dir, limit = nil)
  #   resource_stats = resource_stats(log_dir, limit)
  #   data = File.new(File.expand_path("~/projects/rama/other/reporting/data.js"), "w+")
  #   data << "var data = "
  #   data << resource_stats.to_json
  #   data << ";"
  #   data.close
  # end
end
