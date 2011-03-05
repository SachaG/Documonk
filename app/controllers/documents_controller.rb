class DocumentsController < ApplicationController
  before_filter :authenticate_user!, :except => [:show, :index]
  
  def index
    @document = Document.all
  end
  
  def show
    @document = Document.find(params[:id])
  end

  def new
    @title = "Create new document"
    @document = Document.new
  end
  
  def create
    # @document = Document.new(params[:document])
    @document = current_user.documents.build(params[:document])
    if @document.save
        flash[:success] = "Document created successfully!"
        redirect_to @document 
    else
      @title = "Create new document"
      render 'new'
    end
  end
  
  def edit
    @document = Document.find(params[:id])
    @title = "Edit document"
    authorize! :update, @document
  end
  
  def update
    @document = Document.find(params[:id])
    if @document.update_attributes(params[:document])
      flash[:success] = "Document updated."
      redirect_to @document
    else
      @title = "Edit document"
      render 'edit'
    end
  end 
  
  def destroy
    Document.find(params[:id]).destroy
    flash[:success] = "Document destroyed."
    redirect_to documents_path
  end
end
