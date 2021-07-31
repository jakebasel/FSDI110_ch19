from flask import Flask, abort, request, render_template
from data import data
import json
from flask_cors import CORS
from config import db, parse_json

app = Flask(__name__)
CORS(app)

# dictionary
me = {
    "name" : "Jake",
    "last" : "Basel",
    "email" : "jake.basel@gmail.com",
}

# list
products = data

@app.route("/")
@app.route("/home")
def index():
    return "Hello from Flask"

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/about/name")
def name():
    return me["name"]

@app.route("/about/fullname")
def full_name():
    return me["name"] + " " +me["last"]


@app.route("/api/catalog")
def get_catalog():
    cursor = db.products.find({})
    catalog = [item for item in cursor]

    return parse_json(catalog)


@app.route("/api/catalog", methods=['POST'])
def save_product():
    prod = request.get_json()
    db.products.insert(prod)
    return parse_json(prod)


@app.route("/api/catalog/<category>")
def get_product_by_category(category):
    data = db.products.find({"category": category})
    results = [item for item in data]
    return parse_json(results)

@app.route("/api/discountCode/<code>")
def validate_discount(code):
    data = db.couponCodes.find({"code":code})
    for code in data:
        return parse_json(code)
    return parse_json({"error":True,"reason":"Invalid Code"})
    
@app.route("/api/catalog/id/<id>")
def get_product_by_id(id):
    for prod in products:
        if(prod["_id"] == id):
            return json.dumps(prod)
    abort(404)

@app.route("/api/catalog/cheapest")
def get_cheapest_product():
    cheapest_product = products[0]
    for prod in products:
        if prod["price"] < cheapest_product["price"]:
            cheapest_product = prod
    return json.dumps(cheapest_product)


@app.route("/api/categories")
def get_categories():
    data = db.products.find({})
    unique_categories = []
    for prod in data:
        cat = prod["category"]
        if cat not in unique_categories:
            unique_categories.append(cat)
    return parse_json(unique_categories)

@app.route("/api/test")
def test_data_manipulation():
    test_data = db.test.find({})    
    print(test_data)

    return parse_json(test_data[0])

@app.route("/test/populatecodes")
def test_populate_codes():
    db.couponCodes.insert({"code":"qwerty","discount":10})
    db.couponCodes.insert({"code":"ploop","discount":7})
    db.couponCodes.insert({"code":"cheaper","discount":5})
    db.couponCodes.insert({"code":"abab1212","discount":95})

    return "Codes registered"

#if __name__ == '__main__':
#    app.run(debug=True)
