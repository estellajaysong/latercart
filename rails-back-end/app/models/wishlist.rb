class Wishlist < ApplicationRecord
  has_and_belongs_to_many :users
  # has_many :users, :through => :user_wishlists
  has_many :user_wishlists
  accepts_nested_attributes_for :user_wishlists
end
