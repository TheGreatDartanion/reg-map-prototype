from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def home():
    
    print('in home template')

    return render_template('index.html')

@app.route("/geojson")
def geojson():

    print('opening geojson')
    with open("static/data/local_sections_county.geojson") as geojson_data:
        print('convertng geojson')
        geojson_json = json.load(geojson_data)
    
    print('returning geojson')
    return geojson_json

if __name__ == "__main__":
    app.run()