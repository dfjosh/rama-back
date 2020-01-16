namespace :analyze_logs do
  desc 'analyze s3 (apache) logs'

  # $ bin/rails "analyze_logs:subscribers[/Users/josh/projects/rama/other/lazy-rama-logs/,10]"
  task :subscribers, [:log_dir, :limit] => :environment do |t, args|
    log_file_names = Dir.entries(args.log_dir) - [".", ".."]
    log_file_names = log_file_names.first(args.limit.to_i) if args.limit
    puts "Total log files to be analyzed: #{log_file_names.size}"

    logs = []
    log_file_names.each do |log_file_name|
      log_file_path = File.join(args.log_dir, log_file_name)
      log_content = File.read(log_file_path)
      log_lines = log_content.split("\n")
      log_lines.each do |log_line|
        log = Log.new(log_line)
        logs << log
        # puts "#{log.datetime}: #{log.request_uri}" if log.request_uri.include?("/lazy-rama/science-fiction-shorts/episodes/")
        # log.desc
        # puts "#{log.datetime} | #{log.remote_ip} | #{log.requester} | #{log.request_method} | #{log.key} | #{log.referer} | #{log.user_agent}"
      end
    end

    puts "Total log lines analyzed: #{logs.size}"
    logs.sort! { |a, b|  b.datetime <=> a.datetime }

    # logs.delete_if { |log| log.remote_ip == "73.223.42.160" } # me
    # puts "Logs lines left: #{logs.size}"

    subscriber_logs = logs.select { |log| log.key == "science-fiction-shorts/science-fiction-shorts.xml" }

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
    unique_subscribers.to_h.each { |ip, hsh| puts "#{ip}: #{hsh[:cnt].to_s.rjust(20 - ip.size)} #{hsh[:earliest].strftime("%m/%d/%Y")} - #{hsh[:latest].strftime("%m/%d/%Y")} (#{(hsh[:latest] - hsh[:earliest]).to_i} days)" }

    # logs.each { |log| log.desc }

  end
end