class Log
  attr_accessor :string, :array, :bucket_owner, :bucket, :time, :remote_ip, :requester, :request_id, :operation, :key,
                :request_uri, :http_status, :error_code, :bytes_sent, :object_size, :total_time, :turn_around_time,
                :referer, :user_agent, :version_id, :host_id, :signature_version, :cipher_suite, :authentication_type,
                :host_header, :tls_version
  
  def initialize(string)
    @string = string
    @array = to_array(@string)
    to_attrs(@array)
  end
  
  def to_array(string)
    elements = []
    string = @string
    while string.present?
      if string[0] == %|"|
        index = string[1..-1].index(%|" |) + 1 # since open & close quotes are same char, make sure not to consider the first
      elsif string[0] == %|[|
        index = string.index("]")
      else
        index = (string.index(" ") || 0) - 1
      end
      elements << string[0..index]
      break if index < 0
      string = string[(index+2)..-1]
    end
    elements
  end
  
  def to_attrs(array)
    self.bucket_owner = array[0]
    self.bucket = array[1]
    self.time = array[2]
    self.remote_ip = array[3]
    self.requester = array[4] == "-" ? nil : array[4]
    self.request_id = array[5]
    self.operation = array[6]
    self.key = array[7] == "-" ? nil : array[7]
    self.request_uri = array[8]
    self.http_status = array[9]
    self.error_code = array[10] == "-" ? nil : array[10]
    self.bytes_sent = array[11] == "-" ? 0 : array[11]
    self.object_size = array[12] == "-" ? 0 : array[12]
    self.total_time = array[13]
    self.turn_around_time = array[14] == "-" ? nil : array[14]
    self.referer = array[15] == %Q|"-"| ? nil : array[15]
    self.user_agent = array[16]
    self.version_id = array[17] == "-" ? nil : array[17]
    self.host_id = array[18]
    self.signature_version = array[19] == "-" ? nil : array[19]
    self.cipher_suite = array[20] == "-" ? nil : array[20]
    self.authentication_type = array[21] == "-" ? nil : array[21]
    self.host_header = array[22]
    self.tls_version = array[23] == "-" ? nil : array[23]
  end
  
  def describe
    self.instance_variables.each do |iv|
      puts "#{iv}: #{self.instance_variable_get(iv)}"
    end
  end
  
  def desc
    puts "#{datetime} | #{remote_ip} | #{request_method} | #{key} | #{bytes_sent}/#{object_size} | #{referer}"
  end
  
  def datetime
    DateTime.strptime(self.time, "[%d/%b/%Y:%H:%M:%S %z]")
  end
  
  def request_method
    request_uri[1...-1].split(" ")[0]
  end
  
  def request_resource
    request_uri[1...-1].split(" ")[1]
  end
  
  def request_protocol
    request_uri[1...-1].split(" ")[2]
  end
end
