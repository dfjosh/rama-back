class Api::GoodreadsReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :book_url, :author, :published, :rating, :body, :completed, :link
end
