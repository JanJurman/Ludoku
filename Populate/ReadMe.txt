Skripta za polnjenje baze s testnimi podatki.

Uporaba:

node populate.js

zaenkrat moreš zaključit s control + C









/// če se hočeš z mongotom špilat///

mongo
use Ludoku
show collections  								//si pač zbereš enega
db.achievements.find()							//achievements je izbran collection
db.achievements.pretty()	

db.achievements.drop()

db.users.find( {"lastName" : "Novak"}).pretty()  //primer querryja