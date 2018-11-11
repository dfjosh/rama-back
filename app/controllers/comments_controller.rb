class CommentsController < ApplicationController
  def index
    comments = Comment.all
    render json: CommentSerializer.new(comments).serialized_json
  end
end
