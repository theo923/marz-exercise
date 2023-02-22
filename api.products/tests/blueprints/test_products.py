from pytest import fixture
from app import PRODUCTS_URL
from api.blueprints.products import products_blueprint
from api.models import Product
import json


@fixture()
def test_client(test_app):
    test_app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)
    return test_app.test_client()


@fixture()
def init_db():
    active_product = Product(
        ProductName="Test1",
        ProductPhotoURL="/test1",
        ProductStatus="Active"
    )
    active_product.save()
    in_active_product = Product(
        ProductName="Test2",
        ProductPhotoURL="/test2",
        ProductStatus="InActive"
    )
    in_active_product.save()

    products = [
        Product(**{
            "ProductID": active_product.ProductID,
            "ProductName": active_product.ProductName,
            "ProductPhotoURL": active_product.ProductPhotoURL,
            "ProductStatus": "Active",
        }),
        Product(**{
            "ProductID": in_active_product.ProductID,
            "ProductName": in_active_product.ProductName,
            "ProductPhotoURL": in_active_product.ProductPhotoURL,
            "ProductStatus": "InActive",
        }),
    ]
    for product in products:
        product.save()
    return products, [active_product, in_active_product]


def test_all_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/all")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 2
    product_statuses = {}
    for product in data:
        status = product.get("ProductStatus")
        if status in product_statuses.keys():
            product_statuses[status] += 1
        else:
            product_statuses[status] = 1
    assert len(product_statuses.keys()) == 2
    assert product_statuses.get("Active") == 1
    assert product_statuses.get("InActive") == 1


def test_post_update_product_status_empty_json(test_client):
    response = test_client.post(f"{PRODUCTS_URL}/update_status", json={})
    assert response.status_code == 400
    deserialized_response = json.loads(response.data)
    message = deserialized_response.get('message')
    assert message == 'No product data provided!'


def test_post_update_order_status_validation_error(test_client):
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={"test": "test"},
    )
    assert response.status_code == 422


def test_post_update_product_status_database_error(test_client, init_db):
    [products, [active_product, _]] = init_db
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={
            "ProductID": products[0].ProductID,
            "ProductStatus": "TEST1"
        },
    )
    assert response.status_code == 500


def test_create_product(test_client):
    new_product = {
        'ProductID': 1,
        'ProductName': 'New Product',
        'ProductPhotoURL': 'http://example.com/new.jpg',
        'ProductStatus': 'Active'
    }

    response = test_client.post(
        f"{PRODUCTS_URL}/add_product", data=json.dumps(new_product), content_type='application/json')

    assert response.status_code == 200
    assert response.json == {
        'ProductID': 1,
        'ProductName': 'New Product',
        'ProductPhotoURL': 'http://example.com/new.jpg',
        'ProductStatus': 'Active'
    }


def test_create_product_invalid_data(test_client):
    invalid_product = {
        'ProductID': 'invalid',
        'ProductName': 'New Product',
        'ProductPhotoURL': 'http://example.com/new.jpg',
        'ProductStatus': 'InActive'
    }

    response = test_client.post(
        f"{PRODUCTS_URL}/add_product", data=json.dumps(invalid_product), content_type='application/json')

    assert response.status_code == 400
    assert len(response.json['ProductID']) == 1
    assert 'ProductID' in response.json
    assert response.json['ProductID'][0] == 'Not a valid integer.'
