import sys
import pandas as pd
from pymongo import MongoClient
import json

def get_recommendations(user_id):
    client = MongoClient('mongodb+srv://root:root@cluster0.d2wlybb.mongodb.net/dominos')
    db = client['pizzaDB']
    interactions = db['interactions'].find()
    df = pd.DataFrame(list(interactions))
    # Example recommendation logic
    recommendations = [101, 102]  # Example recommended pizza IDs
    return recommendations

if __name__ == "__main__":
    user_id = int(sys.argv[1])
    recommendations = get_recommendations(user_id)
    print(json.dumps(recommendations))
