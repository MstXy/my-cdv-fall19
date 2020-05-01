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

import json

jsonFile = open("frequencyDictFile.json", encoding="utf-8")
freqDict = json.load(jsonFile)
jsonFile.close()
print("json loaded")

print(len(freqDict["✅"]))
