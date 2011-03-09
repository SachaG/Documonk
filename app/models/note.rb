class Note < ActiveRecord::Base
    attr_accessible :content, :position, :note_type, :user_id, :document_id
    belongs_to :document
    belongs_to :user

end
