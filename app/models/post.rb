class Post < ApplicationRecord
  has_many :categorizations
  has_many :categories, through: :categorizations
  has_and_belongs_to_many :tags
end
