# Nexss Programmer 2.x Template
# Example from reddit user https://www.reddit.com/user/Blacksmoke16/
require "json"

nexssStdout = JSON.parse STDIN

nexssStdout.as_h["test"] = JSON::Any.new "test"

puts nexssStdout.to_json