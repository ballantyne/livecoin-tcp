#code taken from https://www.livecoin.net/api/examples#ruby for test purposes.

require "net/http"
require "uri"
require 'openssl'
require "base64"
require "rubygems"
require "json"
 
uri = URI::parse("https://api.livecoin.net/exchange/buylimit")
api_key = "gJx7Wa7qXkPtmTAaK3ADCtr6m5rCYYMy"
secret_key = "8eLps29wsXszNyEhOl9w8dxsOsM2lTzg"
 
data = {
'currencyPair'=> 'BTC/USD',
'price'=>'100',
'quantity'=>'0.01'
}
 
sorted_data = data.sort_by { |key, value| key }
# puts sorted_data.inspect;

sha256 = OpenSSL::Digest::SHA256.new
signature = OpenSSL::HMAC.hexdigest(sha256, secret_key, URI.encode_www_form(sorted_data)).upcase
# puts URI.encode_www_form(sorted_data).inspect;

puts signature
