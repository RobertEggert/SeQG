import os
import json
import time
# all priv users
PRIV_USERS = "./memory/private-users"

ONE_MONTH_SECONDS = 60 * 60 * 24 * 30 # sec * min * hour * day

now = time.time()

deleted_files = []

for filename in os.listdir(PRIV_USERS):
    if not filename.endswith(".json"):
        continue

    file_path = os.path.join(PRIV_USERS, filename)

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        created_time = data.get("time") # get the time variable from json

        if created_time is None:
            print(f"Error with file:  {filename}: no 'time' field")
            continue

        created_time = created_time / 1000

        if now - created_time > ONE_MONTH_SECONDS:
            os.remove(file_path)
            deleted_files.append(filename)

    except Exception as e:
        print(f"Error {e}, with file: {filename}")

print(f"Deleted {len(deleted_files)} files: {deleted_files}")
