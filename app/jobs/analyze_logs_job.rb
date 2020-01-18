class AnalyzeLogsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
  end
  
  # /Users/josh/projects/rama/other/lazy-rama-logs/
  def self.process_logs(log_dir, limit)
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
  
  def self.subscriber_stats(log_dir, limit)
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
  
  def self.print_subscriber_stats(log_dir, limit)
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
end
