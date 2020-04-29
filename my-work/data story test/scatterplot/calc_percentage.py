import json

jsonFile = open("frequencyListFile.json", encoding="utf-8")
freqList = json.load(jsonFile)
jsonFile.close()
print("json loaded")

summ = 0
for pair in freqList:
    summ += len(pair["frequency"])

print(summ)
