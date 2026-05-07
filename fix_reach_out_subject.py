import json

path = r'i18n/locales/da.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

data['reachOut']['subject'] = 'Emne'
data['reachOut']['subjectPlaceholder'] = 'Hvad handler din henvendelse om?'

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('done')
