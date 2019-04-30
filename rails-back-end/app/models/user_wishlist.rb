class UserWishlist < ApplicationRecord
  belongs_to :user 
  belongs_to :wishlsit 
end
