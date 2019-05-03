class UserWishlist < ApplicationRecord
  belongs_to :user 
  belongs_to :wishlist
  validates_uniqueness_of   :wishlist_id, scope: :user_id
end
