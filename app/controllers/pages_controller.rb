class PagesController < ApplicationController
  def home
   # @user=current_user
  @document = Document.all
  end


  
  def contact
  end

end
