from flask import Flask, jsonify, request

app = Flask(__name__)

# Define your plants data (assuming it's a list of dictionaries)
plants = [
    {
        "id": 1,
        "name": "Aloe",
        "image": "./images/aloe.jpg",
        "price": 11.50,
        "is_in_stock": True
    },
    # Other plants...
]

# Update Route - PATCH /plants/:id
@app.route('/plants/<int:plant_id>', methods=['PATCH'])
def update_plant(plant_id):
    plant = next((p for p in plants if p['id'] == plant_id), None)
    if not plant:
        return jsonify({'error': 'Plant not found'}), 404

    data = request.get_json()
    plant['is_in_stock'] = data['is_in_stock']
    return jsonify(plant)

# Destroy Route - DELETE /plants/:id
@app.route('/plants/<int:plant_id>', methods=['DELETE'])
def delete_plant(plant_id):
    global plants
    plants = [p for p in plants if p['id'] != plant_id]
    return '', 204

if __name__ == '__main__':
    app.run()
