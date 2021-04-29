# Nexss Programmer 2.x Template
# Example from reddit user https://www.reddit.com/user/Blacksmoke16/
require "json"

nexssStdout = JSON.parse STDIN

nexssStdout.as_h["helloFromCrystal"] = JSON::Any.new Crystal::VERSION

puts nexssStdout.to_json