class Role < ActiveRecord::Base
  has_and_belongs_to_many :users
  
  #already in user.rb!
  #def role?(role)
 #   return !!self.roles.find_by_name(role.to_s.camelize)
 # end

end