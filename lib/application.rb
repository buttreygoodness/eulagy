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