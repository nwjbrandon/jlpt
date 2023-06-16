import json
import time

import requests
from bs4 import BeautifulSoup

urls = [
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/2/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/3/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/4/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/5/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/6/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/7/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/2/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/3/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/4/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/5/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/6/",
]

vocabs = []

for url in urls:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    trows = soup.find_all('tr', {"class":"jl-row"})
    for row in trows:
        # print(row.prettify())
        cols = row.find_all("td")
        kanji = cols[1].text.strip()
        hiragana = cols[2].find("p").text.strip()
        meaning = cols[4].text.strip()
        print(kanji, hiragana, meaning)
        vocabs.append({
            "kanji": kanji,
            "hiragana": hiragana if hiragana != "" else kanji,
            "meaning": meaning,
        })
    time.sleep(1)

with open("vocab.json", "w", encoding='utf8') as f:
    json.dump(vocabs, f, indent=2, ensure_ascii=False)
