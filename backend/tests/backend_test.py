import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://e7960fdb-573a-4f9c-96a5-8a1ddd49900b.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# Movies
def test_movies(client):
    r = client.get(f"{BASE_URL}/api/movies")
    assert r.status_code == 200
    j = r.json()
    assert "newReleases" in j and "popularClassics" in j
    assert len(j["newReleases"]) > 0
    assert len(j["popularClassics"]) > 0
    m = j["newReleases"][0]
    for f in ("id", "title", "year", "genre", "category"):
        assert f in m
    assert "_id" not in m


# Restaurants
@pytest.mark.parametrize("c", ["Italian", "Mexican", "Asian", "American", "Seafood", "Steakhouse"])
def test_restaurants(client, c):
    r = client.get(f"{BASE_URL}/api/restaurants", params={"cuisine_type": c})
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) > 0, f"No restaurants for {c}"
    for x in data:
        assert "_id" not in x
        assert x["price_range"] in ("budget", "upscale")


def test_restaurants_missing_param(client):
    r = client.get(f"{BASE_URL}/api/restaurants")
    assert r.status_code == 422


# Email
def test_send_email(client):
    payload = {"email": "TEST_user@example.com", "date": "Monday at 7:00 PM",
               "title": "Dinner at Olive Garden", "location": "Olive Garden"}
    r = client.post(f"{BASE_URL}/api/send-date-email", json=payload)
    assert r.status_code == 200
    j = r.json()
    assert j.get("success") is True
    assert "id" in j


def test_send_email_missing(client):
    r = client.post(f"{BASE_URL}/api/send-date-email", json={"email": "", "title": ""})
    assert r.status_code in (400, 422)


def test_send_email_invalid_format(client):
    r = client.post(f"{BASE_URL}/api/send-date-email",
                    json={"email": "not-an-email", "title": "Test", "date": "Mon", "location": "X"})
    assert r.status_code == 422


def test_send_email_missing_title(client):
    r = client.post(f"{BASE_URL}/api/send-date-email",
                    json={"email": "TEST_a@example.com", "date": "Mon"})
    assert r.status_code in (400, 422)


# Date Options sub-pages
@pytest.mark.parametrize("type_id,expected_title", [
    ("picnic", "Picnic in the Park"),
    ("hiking", "Nature Hike"),
    ("cooking", "Cook Together"),
    ("museum", "Museum or Gallery"),
    ("cocktails", "Cocktails & Drinks"),
    ("stargazing", "Stargazing"),
])
def test_date_options(client, type_id, expected_title):
    r = client.get(f"{BASE_URL}/api/date-options/{type_id}")
    assert r.status_code == 200
    j = r.json()
    assert j["title"] == expected_title
    assert isinstance(j.get("subtitle"), str) and len(j["subtitle"]) > 0
    assert isinstance(j.get("groups"), list) and len(j["groups"]) >= 2
    for g in j["groups"]:
        assert "label" in g and "key" in g
        assert isinstance(g["items"], list) and len(g["items"]) > 0
        for it in g["items"]:
            for f in ("id", "label", "emoji", "desc"):
                assert f in it and it[f]


def test_date_options_picnic_specifics(client):
    r = client.get(f"{BASE_URL}/api/date-options/picnic")
    assert r.status_code == 200
    j = r.json()
    keys = [g["key"] for g in j["groups"]]
    assert "spot" in keys and "basket" in keys


def test_date_options_unknown(client):
    r = client.get(f"{BASE_URL}/api/date-options/invalid")
    assert r.status_code == 404
