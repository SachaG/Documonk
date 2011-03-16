class Document < ActiveRecord::Base
    attr_accessible :title, :content, :stats_code, :public

    belongs_to :user
    has_many :notes
   
    validates :title, :presence => true
    validates :content, :presence => true
    validates :user_id, :presence => true
end
