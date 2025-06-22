import os
from supabase import create_client, Client
from routes.services.supabase_client import get_supabase
from flask import Blueprint, request, jsonify

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)
