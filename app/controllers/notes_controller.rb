class NotesController < InheritedResources::Base
  belongs_to :document
  
  def create
    @note = parent.notes.build(params[:note])
    @note.user = current_user
    create!
  end

end