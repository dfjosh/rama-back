class EpisodeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :guid, :summary, :number, :episode_type, :pub_date, :duration, :explicit, :image, :state,
    :podcast_id, :post_id, :user_id, :created_at, :updated_at
end
