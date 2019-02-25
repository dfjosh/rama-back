class Api::CommentsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    comments = Comment.all
    render json: CommentSerializer.new(comments).serialized_json
  end
  
  def show
    comment = Comment.find(params[:id])
    render json: CommentSerializer.new(comment).serialized_json
  end
  
  def create
    comment = Comment.create!(comment_params)
    if comment
      render json: CommentSerializer.new(comment).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    comment = Comment.find(params[:id])
    if comment.update_attributes!(comment_params)
      render json: CommentSerializer.new(comment).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    comment = Comment.find(params[:id])
    comment.destroy!
  end
  
  private
  
  def comment_params
    params.require(:data).require(:attributes).permit(:post_id, :author, :email, :content, :approved, :parent, :created_at, :updated_at)
  end
end
