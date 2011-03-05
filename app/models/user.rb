class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  
  has_many :documents, :dependent => :destroy
 
  has_and_belongs_to_many :roles

  def role?(role)
    #see http://stackoverflow.com/questions/3994033/ruby-operator-a-k-a-the-double-bang
      return !!self.roles.find_by_name(role.to_s)
  end
  
  def role!()
      return self.roles[0].name
  end
    
end
