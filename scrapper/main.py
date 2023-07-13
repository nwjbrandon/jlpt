import json
import time

import requests
from bs4 import BeautifulSoup

urls_n5 = [
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/2/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/3/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/4/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/5/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/6/",
    "https://jlptsensei.com/jlpt-n5-vocabulary-list/page/7/",
]

urls_n4 = [
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/2/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/3/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/4/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/5/",
    "https://jlptsensei.com/jlpt-n4-vocabulary-list/page/6/",
]

urls_n3 = [
    "https://jlptsensei.com/jlpt-n3-vocabulary-list/",
    "https://jlptsensei.com/jlpt-n3-vocabulary-list/page/2/",
]

urls_n2 = [
    "https://jlptsensei.com/jlpt-n2-vocabulary-list/",
]

urls_n1 = [
    "https://jlptsensei.com/jlpt-n2-vocabulary-list/",
]


def add_jlpt_lvl(urls, level):
    return [(url, level) for url in urls]


urls = (
    add_jlpt_lvl(urls_n5, "N5")
    + add_jlpt_lvl(urls_n4, "N4")
    + add_jlpt_lvl(urls_n3, "N3")
    + add_jlpt_lvl(urls_n2, "N2")
    + add_jlpt_lvl(urls_n1, "N1")
)


vocabs = []


def extract_sentences(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    sentences = []
    trows = soup.find_all("div", {"class": "example-cont py-5"})
    for row in trows:
        # print(row.prettify())
        example_main = row.find_all("div", {"class": "example-main"})[0].text.strip()
        example_ja = row.find_all("div", {"class": "example_ja"})[0].text.strip()
        example_romaji = row.find_all("div", {"class": "example_romaji"})[
            0
        ].text.strip()
        example_en = row.find_all("div", {"class": "example_en"})[0].text.strip()
        example_sentence = {
            "main": example_main,
            "ja": example_ja,
            "romaji": example_romaji,
            "en": example_en,
        }
        sentences.append(example_sentence)
    return sentences


for url, level in urls:
    time.sleep(1)
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    trows = soup.find_all("tr", {"class": "jl-row"})
    for row in trows:
        # print(row.prettify())
        links = row.find_all("a", {"class": "jl-link jp"}, href=True)
        time.sleep(1)
        sentences = extract_sentences(links[0]["href"])

        cols = row.find_all("td")
        kanji = cols[1].text.strip()
        hiragana = cols[2].find("p").text.strip()
        type_ = cols[3].text.strip()
        meaning = cols[4].text.strip()
        print(
            "level: ",
            level,
            " kangi: ",
            kanji,
            " hiragana:",
            hiragana,
            " type: ",
            type_,
            " meaning: ",
            meaning,
        )
        vocab = {
            "level": level,
            "kanji": kanji,
            "hiragana": hiragana if hiragana != "" else kanji,
            "type": type_,
            "meaning": meaning,
            "examples": sentences,
        }
        print(vocab)
        print()
        vocabs.append(vocab)


with open("vocab.json", "w", encoding="utf8") as f:
    json.dump(vocabs, f, indent=2, ensure_ascii=False)
