# import json
#
# jsonFile = open("frequencyListFile.json", encoding="utf-8")
# freqList = json.load(jsonFile)
# jsonFile.close()
# print("json loaded")
#
# summ = 0
# for pair in freqList:
#     summ += len(pair["frequency"])
#
# print(summ)
#
# import json
#
# jsonFile = open("frequencyListFile.json", encoding="utf-8")
# freqList = json.load(jsonFile)
# jsonFile.close()
# print("json loaded")
#
# largest = 0
# for pair in freqList:
#     for i in pair["frequency"]:
#         if i > largest:
#             largest = i
# print(largest)

# import json
#
# jsonFile = open("frequencyDictFile.json", encoding="utf-8")
# freqDict = json.load(jsonFile)
# jsonFile.close()
# print("json loaded")
#
# print(len(freqDict["✅"]))

import random,json
random.seed(0)

file = open("emoji_df.csv", encoding='utf-8')
linelst = file.readlines()
emojiLst = []

for line in linelst:
    emojiLst.append(line.split(',')[0])

random.shuffle(emojiLst)
data = json.dumps(emojiLst)
nf = open("randEmojiList.json", "w", encoding="utf-8")
nf.write(data)
nf.close()
