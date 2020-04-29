import json, random

random.seed(0)

jsonFile = open("frequencyListFile.json", encoding="utf-8")
freqList = json.load(jsonFile)
jsonFile.close()
print("json loaded")


NEATfreqList = []
for pair in freqList:
    print('.')
    length = len(pair["frequency"])//10
    print(length)
    random.shuffle(pair["frequency"])
    pair["frequency"] = pair["frequency"][:length]


print('finishing...')
outputFile = open('NEATfrequencyListFile.json', 'w', encoding='utf-8')
data = json.dumps(freqList)
outputFile.write(data)
outputFile.close()
