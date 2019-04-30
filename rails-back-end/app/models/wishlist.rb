class Wishlist < ApplicationRecord
  has_many :user_wishlists
  has_many :products
end
