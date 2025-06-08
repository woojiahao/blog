from abc import get_cache_token
import os
import pathlib
from datetime import datetime

POSTS_PATH = pathlib.Path("posts")

while True:
    choice = input(
        "Enter the post type:\n1. Article\n2. Recommendation\n3. Note\n4. Short\nChoice: "
    )
    if choice.isnumeric() and int(choice) in range(1, 5):
        break
    else:
        print("Invalid choice.")


print()


def get_post_type(post_choice: str) -> str:
    match post_choice:
        case "1":
            return "blog"
        case "2":
            return "recommendations"
        case "3":
            return "notes"
        case "4":
            return "shorts"
        case _:
            raise ValueError("Unknown post choice")


def get_recommendation_category(recommendation_choice: str) -> str:
    match recommendation_choice:
        case "1":
            return "article"
        case "2":
            return "video"
        case "3":
            return "blog"
        case "4":
            return "book"
        case "5":
            return "collection"
        case "6":
            return "podcast"
        case "7":
            return "other"
        case _:
            raise ValueError("Unknown recommendation choice")


while True:
    slug = input("Slug of this post: ")
    if os.path.isfile(POSTS_PATH / get_post_type(choice) / slug):
        print("Slug has already been chosen, choose something else")
    else:
        break

path = POSTS_PATH / get_post_type(choice) / f"{slug}.md"

if choice == "1":
    title = input("Title of this article: ")
    date = datetime.now()
    with open(path, "w+") as file:
        file.writelines(
            [
                "---\n",
                f'title: "{title}"\n',
                f"date: {date.year}-{str(date.month).rjust(2, '0')}-{str(date.day).rjust(2, '0')}\n",
                "draft: true\n",
                "pinned: false\n",
                "---\n",
            ]
        )
elif choice == "2":
    title = input("Title of this recommendation: ")
    url = input("URL of this recommendation: ")
    category = input(
        "Enter category of this recommendation:\n1. Article\n2. Video\n3. Blog\n4. Book\n5. Collection\n6. Podcast\n7. Other\nChoice: "
    )
    with open(path, "w+") as file:
        file.writelines(
            [
                "---\n",
                f'title: "{title}"\n',
                f"url: {url}\n",
                f"category: {get_recommendation_category(category)}\n",
                "draft: false\n",
                "pinned: false\n",
                "---\n",
            ]
        )
elif choice == "3":
    title = input("Title of this note: ")
    url = input("URL of this note: ")
    description = input("Description for this note: ")
    with open(path, "w+") as file:
        file.writelines(
            [
                "---\n",
                f'title: "{title}"\n',
                f'description: "{description}"\n',
                f"url: {url}\n",
                "draft: false\n",
                "pinned: false\n",
                "---\n",
            ]
        )
elif choice == "4":
    title = input("Title of this short: ")
    recommendation = input(
        "Recommendation this short is linked to (leave blank if none): "
    )
    date = datetime.now()
    with open(path, "w+") as file:
        file.writelines(
            [
                "---\n",
                f'title: "{title}"\n',
                ""
                if recommendation.strip() == ""
                else f"recommendation: {recommendation}\n",
                f"date: {date.year}-{str(date.month).rjust(2, '0')}-{str(date.day).rjust(2, '0')}\n",
                "draft: false\n",
                "pinned: false\n",
                "---\n",
            ]
        )
