# Example from reddit user https://www.reddit.com/user/Blacksmoke16/
require "json"

json = JSON.parse STDIN

json.as_h["test"] = JSON::Any.new "test"

puts json.to_json