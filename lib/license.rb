class License
  include DataMapper::Resource

  property :id,         Serial
  property :text_full,  Text
  property :text_75,    Text
  property :text_50,    Text
  property :text_25,    Text
  property :created_at, DateTime
  property :updated_at, DateTime
  
  belongs_to :application

  validates_presence_of :text_full
end