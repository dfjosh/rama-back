class Post < ApplicationRecord
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user
  has_one :episode

  has_many :post_categories, dependent: :destroy
  has_many :categories, through: :post_categories
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
  
  module States
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    ARCHIVED = "ARCHIVED"
  end
  
  def self.where_state(states: [])
    self.where(state: states)
  end
  
  def self.where_has_tag_name(tag_names: [])
    self.joins(:tags)
        .where(tags: {name: tag_names})
  end
end
