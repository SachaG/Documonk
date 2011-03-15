module ContentHelper
  def resource_name
    :user
  end
 
  def resource
    @resource ||= User.new
  end
 
  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
  
=begin
  def devise_error_messages!
      @devise_error_messages! ||= Devise.error_messages
  end
=end
end