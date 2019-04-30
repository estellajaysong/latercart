class User < ApplicationRecord
  has_secure_password validations: false
  has_and_belongs_to_many :wishlists
  # has_many :wishlists, :through => :user_wishlists
  has_many :user_wishlists
  accepts_nested_attributes_for :user_wishlists

  def to_token_payload
    {
      sub: id,
      name: username
    }
  end

  # def self.from_token_payload payload
  #   # Returns a valid user, `nil` or raise
  #     self.find payload["sub"]
  # end
  
end
