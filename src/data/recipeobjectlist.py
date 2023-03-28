import json

def pullData(txtfile):
	#incoming text file is grabbed
	with open(txtfile) as incomingfile:
		incomingdata = incomingfile.readlines()
    
    #open the database file
	with open('db.json') as datafile:
		jsondata = datafile.read()
    
    #store database in data variable. 
	data = json.loads(jsondata)

	count=1
	
	#print(data['recipes'].keys())
	datafile = open("datascheme.txt","a")

	for key in data['recipes'].keys():
		
		dataobj=data['recipes'][key]
		print(count)
		datastring='await DataStore.save(\n\tnew Recipes({{\n\t\t"name": "{}",\n\t\t"image": "{}",\n\t\t"category": {},\n\t\t"ingredients": {},\n\t\t"instructions": `{}`\n\t}})\n);'.format(dataobj['name'],dataobj['image'],dataobj['categories'],dataobj['ingredients'],dataobj['instructions'])
		datafile.write(datastring+'\n')
		print(datastring)
		count+=1
	
	datafile.close()
	
pullData('db.json')