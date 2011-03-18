require 'rubygems'
require 'bundler/setup'
require 'sinatra'

require File.join(File.dirname(__FILE__), 'environment')

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

error do
  e = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

helpers do
  # add your helpers here
end

# Visual Routes

get '/' do
  @companies = Company.all
  haml :index
end

get '/company/:id' do
  @company = Company.get(params[:id])
  if request.xhr? then
    JSON.generate [{:name => @company.name, :id => @company.id}]
  else
    haml :company
  end
end

get '/application/:id' do
  @application = Application.get(params[:id])
  haml :application
end

get '/admin' do
  @companies = Company.all
  haml :admin
end

# Data Routes

# API (assumes JSON responses)

get '/api/company/:id' do
  data = Company.get(params[:id])
  content_type :json
  data.to_json
end

get '/api/company/:id/applications' do
  data = Company.get(params[:id])
  content_type :json
  data.applications.to_json
end

get '/api/application/:id' do
  data = Application.get(params[:id])
  content_type :json
  data.to_json
end

get '/api/application/:id/versions' do
  data = Application.get(params[:id])
  content_type :json
  data.versions.to_json
end

get '/api/companies' do
  data = Company.all
  content_type :json
  data.to_json
end

# Create a new license
post '/api/license' do
  @license = Company.find(params[:company_id]).first.applications.find(params[:application_id]).first.licenses.create({:text_full => params[:text_full]})
  content_type :json
  if @license.save then
    JSON.generate [{:status => "okay", :id => @license.id}]
  else
    JSON.generate [{:status => "error"}]
  end
end

# Create a new application
post '/api/application' do
  @application = Company.find(params[:company_id]).first.applications.create({:name => params[:name], :version => params[:version]})
  content_type :json
  if @application.save then
    JSON.generate [{:status => "okay", :name => @application.name, :application_id => @application.id}]
  else
    JSON.generate [{:status => "error"}]
  end
end

# Create a new company
post '/api/company' do
  @company = Company.create({:name => params[:name]})
  content_type :json
  if @company.save then
    JSON.generate [{:status => "okay", :name => @company.name, :company_id => @company.id}]
  else
    JSON.generate [{:status => "error"}]
  end
end

get '/api/application/:id' do
  data = Application.get(params[:id])
  content_type :json
  JSON.generate [{:id => data.id, :name => data.name, :version => data.version}]
end

get '/api/license/:id' do
  data = License.get(params[:id])
  content_type :json
  JSON.generate [{:id => data.id, :text_value => data.text_full}]
end
