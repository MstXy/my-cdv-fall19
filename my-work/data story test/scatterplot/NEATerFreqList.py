import json, random, math

random.seed(0)

jsonFile = open("frequencyListFile.json", encoding="utf-8")
freqList = json.load(jsonFile)
jsonFile.close()
print("json loaded")


NEATfreqList = []
for pair in freqList:
    print('.')
    length = math.floor(math.sqrt(len(pair["frequency"])))
    # newFrq = []
    # for frq in pair["frequency"]:
    #     if frq > 5:
    #         newFrq.append(frq)
    random.shuffle(pair["frequency"])
    pair["frequency"] = pair["frequency"][:length]
    # length = math.floor((len(newFrq)//2) * 1.45)
    # random.shuffle(newFrq)
    # pair["frequency"] = newFrq[:length]

print('finishing...')
outputFile = open('NEATERfrequencyListFile.json', 'w', encoding='utf-8')
data = json.dumps(freqList)
outputFile.write(data)
outputFile.close()
