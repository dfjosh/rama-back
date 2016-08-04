class Post < ApplicationRecord
  has_many :posts_categories
  has_many :categories, through: :posts_categories
  has_and_belongs_to_many :tags
end
