from bs4 import BeautifulSoup
import requests
import json


def scrap_detail():
    response = requests.get("https://www.timeout.com/film/best-movies-of-all-time").text
    soup = BeautifulSoup(response, "html.parser")
    titles = soup.find_all(class_="_h3_cuogz_1")
    movies_detail = []

    counter = 1
    for i in range(100):
        temp_list = titles[i].text.split()
        title = " ".join(temp_list[1:-1])
        formatted_title = (
            "-".join(title.lower().split(' '))
            .replace("’", "")
            .replace(",", "")
            .replace(".", "")
            .replace(":", "")
        )
        if formatted_title == 'm':
            formatted_title = 'm-3'
        if formatted_title == 'blade-runner':
            formatted_title = 'blade-runner-1'
        if formatted_title == 'the-godfather':
            formatted_title = 'the-godfather-1972'
        if formatted_title == 'seven-samurai':
            formatted_title = 'seven-samurai-1'

        dynamic_url = f"https://www.timeout.com/movies/{formatted_title}"
        detail_dict = {
            'id': counter,
            'title': title,
        }
        try:
            detail_response = requests.get(dynamic_url).text
            detail_soup = BeautifulSoup(detail_response, "html.parser")
            timeout_says = detail_soup.find(class_="_content_17d4d_1").text
            author = detail_soup.find(class_="_authorList_3vg0f_51").text
            time = detail_soup.time.text
            container = detail_soup.find(class_="_container_sygug_1")

            detail_dict['timeout_says'] = timeout_says
            detail_dict['author'] = author
            detail_dict['time'] = time

            for child in container.children:
                section_title = child.h3.text
                section_detail = child.ul
                detail_dict['section_title'] = section_title
                for grand_child in section_detail.children:
                    disected_grandChild = grand_child.get_text("|")
                    temp_list2 = disected_grandChild.split(':|')
                    if temp_list2[0] == 'Cast':
                        temp_list2[1] = temp_list2[1].split('|')
                    detail_dict[temp_list2[0]] = temp_list2[1]

        except AttributeError:
            detail_dict['timeout_says'] = None

        counter += 1
        movies_detail.append(detail_dict)

    jsonify = json.dumps(movies_detail, indent=4)
    with open(f"details.json", "w") as file:
        file.write(jsonify)

    return movies_detail


# scrap_detail()
