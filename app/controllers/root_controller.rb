class RootController < ActionController::API
  def index
    revision = $redis.get("rama-front:index:current")
    render html: $redis.get("rama-front:index:#{revision}").html_safe
  end
end
