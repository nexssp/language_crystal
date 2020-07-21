# Example from reddit user https://www.reddit.com/user/Blacksmoke16/
require "json"

json = JSON.parse STDIN

json.as_h["helloFromCrystal"] = JSON::Any.new Crystal::VERSION

puts json.to_json