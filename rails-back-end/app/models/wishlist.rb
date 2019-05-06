class Wishlist < ApplicationRecord
  # has_and_belongs_to_many :users
  # has_many :users, :through => :user_wishlists
  has_many :products, dependent: :destroy
  has_many :user_wishlists, dependent: :destroy
  accepts_nested_attributes_for :user_wishlists, :products
end
