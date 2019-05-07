class UserMailer < ApplicationMailer
  def share_wishlist_email(user, sender, wishlist, name, url)
    @mailUser = user
    @sender = sender
    @sharedwishlist = wishlist
    @wishlistName = name
    @wishlistURL = url
    mail(to: @mailUser.email, subject: "You are invited to #{@sender.username}'s #{@wishlistName} wishlist")
  end
end
