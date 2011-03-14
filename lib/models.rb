# example model file
class Company
  include DataMapper::Resource

  property :id,           Serial
  property :name,         String
  property :created_at,   DateTime
  property :updated_at,   DateTime
  
  has n, :applications

  validates_presence_of :name
  validates_uniqueness_of :name
end

class Application
  include DataMapper::Resource

  property :id,           Serial
  property :name,         String
  property :version,      String
  property :created_at,   DateTime
  property :updated_at,   DateTime
  
  belongs_to :company
  has n, :licenses

  validates_presence_of :name
  validates_presence_of :version
end

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
