from flask import Flask, render_template
import json
import pandas as pd

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/geojson")
def geojson():
    
    with open("static/data/local_sections_county.geojson") as geojson_data:
        geojson_json = json.load(geojson_data)

    return geojson_json

@app.route("/events_data")
def events_data():

    with open("static/data/regional_events.json") as events_data:
        events_json = json.load(events_data)
        events_json = pd.DataFrame(events_json) # rename this
        events_json = events_json.to_json(orient='records')  # rename this

        # events_json
    
    return events_json

if __name__ == "__main__":
    app.run(debug=True)