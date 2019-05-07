class UserMailer < ApplicationMailer
  def share_wishlist_email(user, sender, wishlist)
    @mailUser = user
    @sender = sender
    @sharedwishlist = wishlist
    mail(to: @mailUser.email, subject: "You are invited to #{@sender.username}'s awesome wishlist")
  end
end
