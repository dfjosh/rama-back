class Post < ApplicationRecord
  has_many :post_categories
  has_many :categories, through: :post_categories
  has_many :tags
  has_many :tags, through: :post_tags
  has_many :comments
end
